import { NextPage } from "next";
import React from "react";

import SettingsTwo from "./../../components/Settings";

type Props = {};

const pageColor = { border: "border-slate-500", before: "before:bg-slate-500" };

const Settings: NextPage = ({}: Props) => (
  <div
    className={`p-4 overflow-hidden shadow ring-1 ring-slate-200 ring-opacity-5 md:rounded-sm bg-white border-t-2 border-solid ${pageColor.border}`}
  >
    <div className="sm:flex sm:items-start">
      <div className="sm:flex-auto">
        <h1
          className={`text-2xl font-semibold italic before:block before:absolute before:-inset-1 before:-skew-y-3  relative inline-block ${pageColor.before}`}
        >
          <span className="relative text-white">Settings</span>
        </h1>
        <p className="hidden mt-4 text-sm text-slate-600">
          A list of components
        </p>
      </div>
      <div className="hidden mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button className="px-4 py-2 font-semibold text-sm bg-sky-500 text-white rounded-none shadow-sm">
          Refresh
        </button>
      </div>
    </div>
    <div className="mt-8">
      <SettingsTwo />
    </div>
  </div>
);

export default Settings;
