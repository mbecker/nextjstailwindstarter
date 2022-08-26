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
  useRef,
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
  activititesTotalItems: number;
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
  activititesTotalItems: 0
});

export interface MessageInterface {
  message?: string;
  type?: "SUCCESS" | "ERROR" | "INFO";
}

type QueryParams = {
  sort: string;
  filter: string;
};

export const PocketBaseProvider = ({ children }: React.PropsWithChildren) => {
  // Initialize PocketBase client with session props

  const { data: session } = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [activities, setActivities] = useState<Activities>([]);
  const [activitiesHasMore, setActivitiesHasMore] = useState<boolean>(true);
  // const [activitesPage, setActivitesPage] = useState<number>(0);
  const [activitesLoading, setActivitesLoading] = useState<boolean>(false);

  const [activititesTotalItems, setActivititesTotalItems] = useState<number>(0);

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

      if (
        activities.length === activititesTotalItems &&
        activititesTotalItems !== 0
      ) {
        console.info(
          "All activities are already requested from the db: activities.length=",
          activities.length
        );
        setActivitiesHasMore(false);
        enqueueSnackbar("All items requested");
        return;
      }

      let queryParams: QueryParams = {
        sort: "-start_date",
        filter: "",
      };
      if (typeof date !== "undefined") {
        // Create a Date-object to set the offset manually
        const ndate = new Date(date);
        var utc = new Date(ndate.getTime() + ndate.getTimezoneOffset() * 60000);
        date = `${utc.toISOString()}`.replace("T", " ").replace("Z", "");
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
        setActivitesLoading(true);
        const result = await client.Records.getList(
          "activities",
          1,
          100,
          queryParams
        );
        console.log("=== PocketBaseProvider: result=", result);
        // Set the new activities
        setNewActivities(result["items"], showToast, beforeAfter);

        // It's the initial request without any filter (like smaller than dpecific date)
        // The result.totalItems has the total numer of ALL items
        if (queryParams.filter.length === 0 && typeof date === "undefined") {
          setActivititesTotalItems(result.totalItems);
        }

        // The reuest is 'force' (Strava was requested before): The page.items may be 0 (or any number) because no new Strava activities are uploaded
        // if (typeof beforeAfter !== "undefined" && beforeAfter === BEFORE) {
        //   console.log(
        //     "setActivitiesHasMore: ",
        //     result.items.length !== 0 && result.items.length === 20
        //   );
        //   setActivitiesHasMore(
        //     result.items.length !== 0 && result.items.length === 20
        //   );
        // }
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
    [activities, enqueueSnackbar]
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
          "=== PocketBaseProvider: Request items data=",
          data
        );
        setNewActivities(data, true, beforeAfter);
        // setActivities(unionBy(activities, (data as unknown as Activities), "id"));
        // await activitiesFetch(date, true, beforeAfter);
        // setMessage({
        //   message: "Succes requesting items",
        //   type: "SUCCESS",
        // });
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
      }
      setActivitesLoading(false);
    },
    [activitiesFetch, enqueueSnackbar]
  );

  const setNewActivities = useCallback(
    (
      items: any[],
      showToast?: undefined | boolean,
      beforeAfter?: BEFORE | AFTER
    ) => {
      let newActivites: Activities = [];
      items.forEach((a) => {
        if (typeof a["activity"] !== "undefined") {
          let ac: Activity = a["activity"] as Activity;
          newActivites.push(ac);
        } else if (typeof a["start_date"] !== "undefined") {
          newActivites.push(a as Activity);
        }
      });
      const newItems = orderBy(
        unionBy(activities, newActivites, "id"),
        "id",
        "desc"
      );
      const newItemsLength = activities.length - newItems.length;
      if (typeof showToast === "undefined" || showToast === true) {
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
      // All activites are requested from the DB
      if (newItems.length === activititesTotalItems) {
        setActivitiesHasMore(false);
      } else {
        setActivitiesHasMore(true);
      }
      // We requested force from strava because all items were already requested from DB; new items may be more than than the inital request items length of the DB
      if(newItems.length > activititesTotalItems) {
        setActivititesTotalItems(newItems.length);
      }
    },
    [activities, activititesTotalItems, enqueueSnackbar]
  );

  useEffect(() => {
    if (session === null || typeof session === "undefined") {
      // console.log("=== PocketBaseProvider: AuthStore.clear");
      client.AuthStore.clear();
      return;
    }
    if (client.AuthStore.token.length > 0) return;
    // console.log(
    //   "=== PocketBaseProvider: AuthStore.save session.profile=",
    //   session.profile
    // );

    client.AuthStore.save(
      session.profile.authdata.token,
      session.profile.authdata.user
    );

    activitiesFetch(undefined, false);

    // client.realtime.subscribe("activities", function (a) {
    //   console.log(a);
    // });

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
        activititesTotalItems: activititesTotalItems,
      }}
    >
      <>{children}</>
    </PocketBaseContext.Provider>
  );
};
