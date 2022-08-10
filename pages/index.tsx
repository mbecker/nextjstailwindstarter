import type { NextPage } from "next";
import Table from "./../components/Table";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import { useContext, useEffect } from "react";
import { PocketBaseContext } from "../lib/PocketBaseProvider";

const pageColor = { border: "border-sky-500", before: "before:bg-sky-500" };

const Home: NextPage = () => {
  const {
    activities,
    // activitesTotal,
    // activitesPage,
    activitiesFetch,
    activitiesFetchForce,
    activitesLoading,
    activitiesHasMore,
  } = useContext(PocketBaseContext);

  useEffect(() => {
    activitiesFetch(undefined, false);
  }, []);

  return (
    <div
      className={`overflow-hidden shadow ring-1 ring-slate-200 ring-opacity-5 md:rounded-sm bg-white border-t-2 border-solid ${pageColor.border}`}
    >
      <div className="flex items-start pt-4 px-4">
        <div className="sm:flex-auto">
          <h1
            className={`text-2xl font-semibold italic before:block before:absolute before:-inset-1 before:-skew-y-3  relative inline-block ${pageColor.before}`}
          >
            <span className="relative text-white">Activities</span>
          </h1>
          {/* <p className="hidden mt-4 text-sm text-slate-600">
            A list of all the users in your account including their name, title,
            email and role.
          </p> */}
        </div>
        <div className="flex space-x-1 mt-0">
          {!activitesLoading && (
            <>
              <button className="btn-main inline-flex justify-center">
                Refresh<span className="ml-1 hidden sm:block">Strava</span>
                <RefreshIcon className="ml-2 -mr-1 h-5 w-5 text-slate-100" />
              </button>
              <button onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                activitiesFetch();
              }} className="btn-main inline-flex justify-center">
                More<span className="ml-1 hidden sm:block">Activities</span>
              </button>
            </>
          )}
          {activitesLoading && (
            <button className="btn-main inline-flex justify-center ml-1">
              Loading
              <svg
                className="animate-spin h-5 w-5 text-slate-100 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx={12}
                  cy={12}
                  r={10}
                  stroke="currentColor"
                  strokeWidth={4}
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="mt-0">
        <Table activities={activities} />
        <div className="my-4 w-full flex items-center justify-center">
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-ml-px relative inline-flex items-center px-2 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
