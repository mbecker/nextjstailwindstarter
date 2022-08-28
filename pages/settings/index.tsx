import { ExclamationCircleIcon, MailIcon } from "@heroicons/react/outline";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Modal } from "../../components/Modal";

import SettingsTable from "../../components/settings/table";
import { defaultActivity } from "../../lib/utils";

import SettingsTwo from "./../../components/Settings";

type Props = {};

const pageColor = { border: "border-slate-500", before: "before:bg-slate-500" };

const Fabric = dynamic(
  () => import("./../../components/strava/fabric"), // replace '@components/map' with your component's location
  {
    loading: () => <p>A map is loading</p>,
    ssr: false, // This line is important. It's what prevents server-side render
  }
);

const Settings: NextPage = ({}: Props) => {
  const [addEmail, setAddEmail] = useState<boolean>(false);

  return (
    <div
      className={`overflow-hidden shadow ring-1 ring-slate-200 ring-opacity-5 md:rounded-sm bg-white border-t-2 border-solid ${pageColor.border}`}
    >
      <div className="flex flex-col md:flex-row space-y-6 items-start pt-4 px-4">
        <div className="sm:flex-auto">
          <h1
            className={`text-2xl font-semibold italic before:block before:absolute before:-inset-1 before:-skew-y-3  relative inline-block ${pageColor.before}`}
          >
            <span className="relative text-white">Settings</span>
          </h1>
        </div>
        <div className="flex space-x-1 mt-0"></div>
      </div>

      {/* TABLE START */}
      <div className="p-4 mt-4">
        <h5 className="text-xl font-semibold">Emails</h5>
      </div>
      <SettingsTable />
      <Modal open={addEmail} setOpen={(b) => setAddEmail(b)} />
      <div className="p-4 mt-4 flex items-center space-x-2">
        <button
          disabled={false}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setAddEmail(!addEmail);
          }}
          className="btn-main"
        >
          Add new e-mail
        </button>
      </div>
      {/* TABLE END */}
      {/* MAPS START */}
      <div className="p-4 mt-4">
        <h5 className="text-xl font-semibold">Maps</h5>
      </div>
      <div className="p-4">
        <Fabric activity={defaultActivity} />
      </div>
      {/* MAPS END */}
      <div className="mt-8">
        <SettingsTwo />
      </div>
    </div>
  );
};

export default Settings;
