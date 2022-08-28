import { MailOpenIcon } from "@heroicons/react/outline";
import { MailIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
};

const SettingsTable = ({ title, subtitle }: Props) => (
  <div className="mt-0">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-2 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-slate-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >
                      <span className="inline-flex items-center justify-center">
                        <MailOpenIcon className="w-5 h-5 mr-2" />
                        <span className="ml-0">E-Mail</span>
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Confirmed
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                    >
                      <span className="">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="hover:bg-slate-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      <span
                        className="label txt-base txt-mono label label-success"
                        title="id"
                      > mats.becker@gmail.com
                      </span>
                    </td>
                    
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="inline-flex">
                        <span className="txt" title="distance">
                          Not yet
                        </span>
                      </div>
                    </td>
    
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="inline-flex">
                        <span className="txt" title="start_date">
                          21/08/2022, 08:59:44
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                    <Link
                  href={{
                    pathname: "/maps/1",
                  }}
                >
                  <a
                    type="button"
                    className="btn-main"
                  >
                    <i className="ri-map-2-line" />
                    <span className="txt">Delete</span>
                  </a>
                </Link>
                <Link
                  href={{
                    pathname: "/maps/1",
                  }}
                >
                  <a
                    type="button"
                    className="btn-main ml-2"
                  >
                    <i className="ri-map-2-line" />
                    <span className="txt">Resend</span>
                  </a>
                </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsTable;
