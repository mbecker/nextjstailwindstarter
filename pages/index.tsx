import type { NextPage } from "next";
import Table from "./../components/Table";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshIcon,
} from "@heroicons/react/solid";

const pageColor = { border: "border-sky-500", before: "before:bg-sky-500" };

const Home: NextPage = () => {
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
          <p className="mt-4 text-sm text-slate-600">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="flex space-x-1 mt-0">
          <button className="btn-main inline-flex justify-center">
            Refresh<span className="ml-1 hidden sm:block">Strava</span>
            <RefreshIcon className="ml-2 -mr-1 h-5 w-5 text-slate-100" />
          </button>
          <button className="btn-main">More<span className="ml-1 hidden sm:block">Activities</span></button>
        </div>
      </div>
      <div className="mt-0">
        <Table />
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
