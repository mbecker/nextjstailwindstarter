import { find } from "lodash";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { Activity } from "../../../common/Strava";
import { PocketBaseContext } from "../../../lib/PocketBaseProvider";
import {
  normalizeDate,
  normalizeDistance,
  normalizeMovingTime,
} from "../../../lib/utils";

const pageColor = { border: "border-sky-500", before: "before:bg-sky-500" };

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { activities, activitiesFetch } = useContext(PocketBaseContext);

  const [activity, setActivity] = useState<Activity | null>(null);

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // if(mounted) return;

    console.log("=== Map-index - id: ", id);

    if (typeof id !== "undefined" && id !== null) {
      const idi = parseInt(id as string);
      const fActivity = find(activities, (o) => idi === o.id);
      console.log(fActivity);
      if (typeof fActivity !== "undefined") {
        setActivity(fActivity as Activity);
      } else {
        // Activity (with ID) is not in list of global activities
        if (mounted) return;
        activitiesFetch(undefined, false, undefined, idi);
      }
      setMounted(true);
    }
    return () => {};
  }, [id, activities]);

  const Fabric = dynamic(
    () => import("./../../../components/strava/fabric"), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  );

  return (
    <div
      className={`p-4 overflow-hidden shadow ring-1 ring-slate-200 ring-opacity-5 md:rounded-sm bg-white border-t-2 border-solid ${pageColor.border}`}
    >
      <div className="sm:flex sm:items-start">
        {activity !== null && (
          <div className="sm:flex-auto">
            <h1
              className={`text-2xl font-semibold italic before:block before:absolute before:-inset-1 before:-skew-y-3  relative inline-block ${pageColor.before}`}
            >
              <span className="relative text-white">{activity.name}</span>
            </h1>
            <div className="mt-4 text-sm text-slate-600">
              <span>{normalizeDate(activity.start_date)}</span>
              <span className="ml-2">
                {normalizeMovingTime(activity.moving_time)}
              </span>
              <span className="ml-2">
                {normalizeDistance(activity.distance)}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 flex flex-col items-center justify-center">
        {activity !== null && (
          <>
          <Fabric activity={activity} />
            {/* <Image
              src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/strava/map/${activity.id}?width=800&height=600`}
              width={800}
              height={600}
              alt={activity.name}
            /> */}
            
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
