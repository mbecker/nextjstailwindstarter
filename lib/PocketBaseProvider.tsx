import { orderBy, unionBy } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import PocketBase, { Admin, LocalAuthStore, User } from "pocketbase";

class AppAuthStore extends LocalAuthStore {
  /**
   * @inheritdoc
   */
  save(token: string, model: User | Admin | {}): void {
    super.save(token, model);
  }

  /**
   * @inheritdoc
   */
  clear() {
    super.clear();
  }
}

const client = new PocketBase(
  process.env.NEXT_PUBLIC_POCKETBASE_URL,
  "en-US",
  new AppAuthStore("pb_auth")
);

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Activities, Activity } from "../common/Strava";
import Banner from "../components/Banner";

export type AFTER = "after";
export type BEFORE = "before";
export const AFTER: AFTER = "after";
export const BEFORE: BEFORE = "before";

export interface PocketBaseContext {
  pocketBaseClient: PocketBase;
  // setMessage: Dispatch<SetStateAction<MessageInterface>>;
  activities: Activities;
  // activitesTotal: number;
  // activitesPage: number;
  activitiesFetch: (
    date?: string,
    showToast?: boolean,
    beforeAfter?: BEFORE | AFTER,
    id?: string | number
  ) => Promise<void>;
  activitiesFetchForce: (
    date?: string,
    beforeAfter?: BEFORE | AFTER
  ) => Promise<void>;
  activitesLoading: boolean;
  activitiesHasMore: boolean;
}

export const PocketBaseContext = createContext<PocketBaseContext>({
  pocketBaseClient: client,
  // setMessage: () => {},
  activities: [],
  // activitesTotal: 0,
  // activitesPage: 0,
  activitiesFetch: async () => {},
  activitiesFetchForce: async () => {},
  activitesLoading: false,
  activitiesHasMore: true,
});

export interface MessageInterface {
  message?: string;
  type?: "SUCCESS" | "ERROR" | "INFO";
}

export const PocketBaseProvider = ({ children }: React.PropsWithChildren) => {
  // Initialize PocketBase client with session props

  const { data: session } = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [activities, setActivities] = useState<Activities>([]);
  const [activitiesHasMore, setActivitiesHasMore] = useState<boolean>(true);
  // const [activitesPage, setActivitesPage] = useState<number>(0);
  const [activitesLoading, setActivitesLoading] = useState<boolean>(false);

  const activitiesFetch = useCallback(
    async (
      date?: string,
      showToast?: boolean,
      beforeAfter?: BEFORE | AFTER,
      id?: string | number | undefined
    ) => {
      console.log(
        "=== PocketBaseProvider - activitiesFetch: ",
        date,
        showToast,
        beforeAfter,
        id
      );
      let queryParams: any = {
        sort: "-start_date",
        filter: "",
      };
      if (typeof date !== "undefined") {
        date = date.replace("T", " ").replace("Z", "");
        // beforeAfter(BEFORE) is default
        queryParams = { ...queryParams, filter: `start_date < "${date}"` };
        if (beforeAfter === AFTER) {
          queryParams = {
            ...queryParams,
            filter: `start_date > "${date}"`,
          };
        }
        console.log(
          "=== PocketBaseProvider: Request items with date: ",
          queryParams.filter
        );
      }

      if (typeof id !== "undefined") {
        queryParams = {
          ...queryParams,
          filter: `${
            queryParams.filter.length > 0 ? `AND ` : `activityid ~ ${id}`
          }`,
        };
      }

      console.log("QueryParams: ", queryParams);

      try {
        setActivitesLoading(false);
        const result = await client.Records.getList(
          "activities",
          1,
          20,
          queryParams
        );
        console.log(
          "=== PocketBaseProvider: Request items length=",
          result.totalItems
        );

        // setActivitesTotal(result.totalItems);
        let newActivites: Activities = [];
        result["items"].forEach((a) => {
          if (typeof a["activity"] !== "undefined") {
            let ac: Activity = a["activity"] as Activity;
            newActivites.push(ac);
          }
        });
        console.log(
          "=== PocketBaseProvider: Request activities length=",
          newActivites.length
        );
        const newItems = orderBy(
          unionBy(activities, newActivites, "id"),
          "id",
          "desc"
        );
        const newItemsLength = activities.length - newItems.length;
        if (typeof showToast === "undefined" || showToast === true) {
          // setMessage({
          //   message:
          //     newItemsLength === 0
          //       ? typeof beforeAfter !== "undefined" && beforeAfter === "after"
          //         ? `No new items from Strava`
          //         : `No items`
          //       : `Requested ${
          //           -newItemsLength > 0 ? -newItemsLength : newItemsLength
          //         } items`,
          //   type: newItemsLength === 0 ? "ERROR" : "SUCCESS",
          // });
          enqueueSnackbar(
            newItemsLength === 0
              ? typeof beforeAfter !== "undefined" && beforeAfter === "after"
                ? `No new items from Strava`
                : `No items`
              : `Requested ${
                  -newItemsLength > 0 ? -newItemsLength : newItemsLength
                } items`
          );
        }
        setActivities(newItems);
        console.log("=== PocketBaseProvider: result.items=", result);

        // The reuest is 'force' (Strava was requested before): The page.items may be 0 (or any number) because no new Strava activities are uploaded
        if (typeof beforeAfter !== "undefined" && beforeAfter === BEFORE) {
          console.log(
            "setActivitiesHasMore: ",
            result.items.length !== 0 && result.items.length === 20
          );
          setActivitiesHasMore(
            result.items.length !== 0 && result.items.length === 20
          );
        }
      } catch (err: any) {
        console.error(
          "=== PocketBaseProvider: Error requesting items err=",
          err
        );
        if (typeof err["status"] !== "undefined") {
          if (err.status === 401) {
            signOut();
            enqueueSnackbar("Authorization Error. Please sign in again (401)");
          }
        }
      }
      setActivitesLoading(false);
    },
    [activities]
  );

  const activitiesFetchForce = useCallback(
    async (date?: string, beforeAfter?: BEFORE | AFTER) => {
      setActivitesLoading(true);
      // setMessage({
      //   message: "Requesting items",
      //   type: "INFO",
      // });
      enqueueSnackbar("Requesting Strava activities");
      let reqConfig: any = { method: "post" };
      if (typeof date !== "undefined" && typeof beforeAfter !== "undefined") {
        const dt = Math.floor(new Date(date).getTime() / 1000);

        console.log("Request date at :", dt, beforeAfter);
        if (beforeAfter === "after") {
          reqConfig = {
            ...reqConfig,
            params: {
              after: dt,
            },
          };
        } else {
          reqConfig = {
            ...reqConfig,
            params: {
              before: dt,
            },
          };
        }
      }
      console.log(
        "Activities Fecth Force reqConfig: ",
        JSON.stringify(reqConfig, undefined, 2)
      );
      try {
        const data = await client.send("/api/strava/activities", reqConfig);
        console.log(
          "=== PocketBaseProvider: Request items length=",
          data.length
        );
        // setActivities(unionBy(activities, (data as unknown as Activities), "id"));
        await activitiesFetch(date, true, beforeAfter);
        // setMessage({
        //   message: "Succes requesting items",
        //   type: "SUCCESS",
        // });
        setActivitesLoading(false);
      } catch (err: any) {
        console.warn(JSON.stringify(err, undefined, 2));
        if (typeof err["status"] !== "undefined") {
          if (err.status === 401) {
            signOut();
            enqueueSnackbar("Authorization Error. Please sign in again (401)");
          } else if (err.status === 404) {
            enqueueSnackbar(`API not found (404)`);
          } else {
            enqueueSnackbar(`API Error: ${err.data.code}`);
          }
        } else {
          enqueueSnackbar("Requesting Strava activities - " + err);
        }
        setActivitesLoading(false);
      }
    },
    [activitiesFetch, enqueueSnackbar]
  );

  useEffect(() => {
    if (session === null || typeof session === "undefined") {
      console.log("=== PocketBaseProvider: AuthStore.clear");
      client.AuthStore.clear();
      return;
    }
    if (client.AuthStore.token.length > 0) return;
    console.log(
      "=== PocketBaseProvider: AuthStore.save token=",
      session.profile.authdata.token
    );
    console.log(
      "=== PocketBaseProvider: AuthStore.save user=",
      session.profile.authdata.user
    );
    client.AuthStore.save(
      session.profile.authdata.token,
      session.profile.authdata.user
    );

    activitiesFetch(undefined, false);

    return () => {
      client.AuthStore.clear();
    };
  }, [session]);

  return (
    <PocketBaseContext.Provider
      value={{
        pocketBaseClient: client,
        // setMessage: setMessage,
        activities: activities,
        // activitesTotal: activitesTotal,
        // activitesPage: activitesPage,
        activitiesFetch: activitiesFetch,
        activitiesFetchForce: activitiesFetchForce,
        activitesLoading: activitesLoading,
        activitiesHasMore: activitiesHasMore,
      }}
    >
      <>{children}</>
    </PocketBaseContext.Provider>
  );
};
