import { NextPage } from "next";
import React from "react";

type Props = {};

const pageColor = { border: "border-cyan-500", before: "before:bg-cyan-500" };

const Components: NextPage= ({}: Props) => (
  <div className={`overflow-hidden shadow ring-1 ring-slate-200 ring-opacity-5 md:rounded-sm bg-white border-t-2 border-solid ${pageColor.border}`}>
      <div className="sm:flex sm:items-start p-4">
        <div className="sm:flex-auto">
          <h1 className={`text-2xl font-semibold italic before:block before:absolute before:-inset-1 before:-skew-y-3  relative inline-block ${pageColor.before}`}>
          <span className="relative text-white">Components</span>
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          A list of components
        </p>
      </div>
      <div className="hidden mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" className="btn-main">
          Add user
        </button>
      </div>
    </div>
    <div className="mt-0">
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16">
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3 dark:text-slate-400">
              shadow-cyan-500/50
            </p>
            <button className="py-2 px-3 bg-cyan-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-cyan-500/50 focus:outline-none">
              Subscribe
            </button>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3 dark:text-slate-400">
              shadow-blue-500/50
            </p>
            <button className="py-2 px-3 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-blue-500/50 focus:outline-none">
              Subscribe
            </button>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3 dark:text-slate-400">
              shadow-indigo-500/50
            </p>
            <button className="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-indigo-500/50 focus:outline-none">
              Subscribe
            </button>
          </div>
        </div>
        <div className="p-4">
          <a
            href="#"
            className="group block max-w-xs  rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
          >
            <div className="flex items-center space-x-3">
              <svg
                className="h-6 w-6 stroke-sky-500 group-hover:stroke-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19H6.931A1.922 1.922 0 015 17.087V8h12.069C18.135 8 19 8.857 19 9.913V11"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 7.64L13.042 6c-.36-.616-1.053-1-1.806-1H7.057C5.921 5 5 5.86 5 6.92V11M17 15v4M19 17h-4"
                />
              </svg>

              <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">
                New project
              </h3>
            </div>
            <p className="text-slate-500 group-hover:text-white text-sm">
              Create a new project from a variety of starting templates.
            </p>
          </a>
        </div>
        <div className="p-4">
          <a
            href="#"
            className="group block max-w-xs  rounded-lg p-3 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
          >
            <div className="flex items-center space-x-3">
              <svg
                className="h-6 w-6 stroke-sky-500 group-hover:stroke-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19H6.931A1.922 1.922 0 015 17.087V8h12.069C18.135 8 19 8.857 19 9.913V11"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 7.64L13.042 6c-.36-.616-1.053-1-1.806-1H7.057C5.921 5 5 5.86 5 6.92V11M17 15v4M19 17h-4"
                />
              </svg>

              <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">
                New project
              </h3>
            </div>
            
          </a>
        </div>
        <div className="p-4">
        <button
  type="button"
  className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
  tabIndex={-1}
>
  Subscribe
</button>

        </div>
      </div>
    </div>
  </div>
);

export default Components;
