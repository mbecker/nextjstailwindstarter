import type { NextPage } from "next";
import Table from "./../components/Table";

import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";
import { useContext, useEffect, useRef, useState } from "react";
import { AFTER, BEFORE, PocketBaseContext } from "../lib/PocketBaseProvider";
import { Activities, Activity } from "../common/Strava";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import StravaRow from "../components/strava/row";

const pageColor = { border: "border-sky-500", before: "before:bg-sky-500" };

const PAGE_SIZE = 2000000000000000000000000;
const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "id",
    header: "id",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "type",
    header: "type",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },

  {
    accessorKey: "name",
    header: "name",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "distance",
    header: "distance",
    cell: (info) => `${((info.getValue() as number) / 1000).toFixed(2)} km`,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "moving_time",
    header: "moving time",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "start_date",
    header: "start date",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (r) => r.map.summary_polyline,
    id: "polyline",
    header: "map",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
];

const Home: NextPage = () => {
  const {
    activities,
    // activitesTotal,
    // activitesPage,
    activitiesFetch,
    activitiesFetchForce,
    activitesLoading,
    activitiesHasMore,
    activititesTotalItems,
  } = useContext(PocketBaseContext);

  // useEffect(() => {
  //   // if(activities.length > 0) return;
  //   activitiesFetch(undefined, false, undefined, undefined);
  //   return () => {

  //   }
  // }, []);

  const tableRef = useRef<HTMLInputElement>(null);

  /**
   * REACT TABLE
   */

  const [showOnlyWithMap, setShowOnlyWithMap] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rows, setRows] = useState<Activities>([]);

  const isFilterActive = sorting.length > 0 || showOnlyWithMap;
  const setFilter = () => {
    if (showOnlyWithMap) setShowOnlyWithMap(false);
    if (sorting.length > 0) setSorting([]);
  };

  useEffect(() => {
    const l = activities.filter((item) => {
      if (!showOnlyWithMap) return item;
      if (showOnlyWithMap && item.map.summary_polyline.length > 0) return item;
    });
    setRows(l);
  }, [activities, showOnlyWithMap]);

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
  });

  const recordsInfoText = () => {
    let recordsInfoText = "";

    const pageSize = table.getState().pagination.pageSize;
    const filtered = table.getState().columnFilters;
    const pageRows = table.getPaginationRowModel().rows.length;
    const sortedData = table.getFilteredRowModel().rows.length;
    const page = table.getState().pagination.pageIndex;

    if (sortedData && sortedData > 0) {
      let isFiltered = filtered.length > 0;

      let totalRecords = sortedData;

      let recordsCountFrom = page * pageSize + 1;

      let recordsCountTo = recordsCountFrom + pageRows - 1;

      if (isFiltered)
        recordsInfoText = `${recordsCountFrom}-${recordsCountTo} of ${totalRecords} filtered records`;
      else
        recordsInfoText = `${recordsCountFrom}-${recordsCountTo} of ${totalRecords} records`;
    } else recordsInfoText = "No records";
    return (
      <div className="block text-right m-t-sm mb-2 text-xs">
        {table.getSortedRowModel().rows.length !== 0 && (
          <>
            <span>Showing</span>
            <span className="ml-1">{recordsInfoText}</span>
            <span className="ml-1">(Total: {activities.length} / {activititesTotalItems})</span>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      ref={tableRef}
      className={`overflow-hidden shadow ring-1 ring-slate-200 ring-opacity-5 md:rounded-sm bg-white border-t-2 border-solid ${pageColor.border}`}
    >
      <div className="flex flex-col md:flex-row space-y-6 items-start pt-4 px-4">
        <div className="sm:flex-auto">
          <h1
            className={`text-2xl font-semibold italic before:block before:absolute before:-inset-1 before:-skew-y-3  relative inline-block ${pageColor.before}`}
          >
            <span className="relative text-white">Activities</span>
          </h1>
        </div>
        <div className="flex space-x-1 mt-0">
          {!activitesLoading && (
            <>
              <button
                className="btn-main inline-flex justify-center"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  const dt =
                    activities.length > 0
                      ? activities[0].start_date
                      : undefined;
                  activitiesFetchForce(dt, "after");
                }}
              >
                Refresh<span className="ml-1 hidden sm:block">Strava</span>
                <RefreshIcon className="ml-2 -mr-1 h-5 w-5 text-slate-100" />
              </button>
              {/* <button
                onClick={async (e: React.MouseEvent) => {
                  e.preventDefault();
                  // await fetchNewItems();
                  // await fetchMoreData(1);
                  let startDate: string | undefined = undefined;
                  if (activities.length > 0) {
                    startDate = activities[0].start_date;
                  }
                  try {
                    await activitiesFetchForce(startDate, "after");
                    // await activitiesFetch();
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className="btn-main inline-flex justify-center"
              >
                More<span className="ml-1 hidden sm:block">Activities</span>
              </button> */}
              <button
                type="button"
                className="btn-main inline-flex justify-center"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  const dt =
                    activities.length > 0
                      ? activities[0].start_date_local
                      : undefined;
                  activitiesFetch(dt, true, AFTER, undefined);
                }}
                // btn-loading btn-disabled
                // disabled={loadMoreEnabled}
              >
                {activitesLoading ? (
                  <i className="ri-refresh-line animate-spin" />
                ) : (
                  <span className="txt">Newer items</span>
                )}
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
      {/* SHOW FILTER */}
      <div className="flex w-full mt-2 px-4 justify-end">
        <button
          className="btn-filter"
          disabled={!isFilterActive}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            setFilter();
          }}
        >
          Clear filter
        </button>
      </div>
      {/* TABLE START */}
      <div className="mt-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-slate-50">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header, i) => {
                            if (header.column.columnDef.header == "id")
                              return null;
                            return (
                              <th
                                key={header.id}
                                {...{
                                  onClick:
                                    header.id === "polyline"
                                      ? () => {
                                          setShowOnlyWithMap(!showOnlyWithMap);
                                        }
                                      : header.column.getToggleSortingHandler(),
                                }}
                                colSpan={header.colSpan}
                                scope="col"
                                className={classNames({
                                  "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8":
                                    i === 1,
                                  "px-3 py-3.5 text-left text-sm font-semibold text-gray-900":
                                    i > 1,
                                })}
                              >
                                {header.isPlaceholder ? null : (
                                  <div
                                    className={classNames(
                                      "inline-flex items-center text-slate-500",
                                      {
                                        "text-sky-500":
                                          header.column.getIsSorted() === "asc",
                                      },
                                      {
                                        "text-sky-500":
                                          header.column.getIsSorted() ===
                                          "desc",
                                      },
                                      {
                                        "text-sky-500":
                                          header.id === "polyline" &&
                                          showOnlyWithMap,
                                      }
                                    )}
                                  >
                                    {(header.id !== "polyline" &&
                                      header.column.getIsSorted()) ===
                                      "desc" && (
                                      <SortDescendingIcon className="w-4 h-4" />
                                    )}
                                    {header.id !== "polyline" &&
                                      header.column.getIsSorted() === "asc" && (
                                        <SortAscendingIcon className="w-4 h-4" />
                                      )}
                                    {header.id !== "polyline" &&
                                      !header.column.getIsSorted() && (
                                        <SortAscendingIcon className="w-4 h-4" />
                                      )}
                                    {header.id === "polyline" && (
                                      <CheckIcon className="w-4 h-4" />
                                    )}

                                    <span className="capitalize cursor-pointer ml-1">
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                    </span>
                                  </div>
                                )}
                              </th>
                            );
                          })}
                        </tr>
                      ))}
                      {/* <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                        >
                          <span className="inline-flex items-center">
                            <svg
                              className="mr-2.5 h-4 w-4 flex-none stroke-slate-900"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                            </svg>
                            <span className="ml-0">Name</span>
                          </span>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Distance (km)
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Start Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Moving Time
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr> */}
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {table.getRowModel().rows.map((row) => {
                        return <StravaRow row={row} key={row.id} />;
                      })}
                      {/* {activities.map((activity) => (
                        <tr key={activity.id} className="hover:bg-slate-50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                            {activity.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {(activity.distance / 1000).toFixed(2)}km
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(
                              activity.start_date_local as any
                            ).toLocaleDateString(undefined)}
                            h
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date((activity.moving_time as number) * 1000)
                              .toISOString()
                              .substring(11, 16)}
                            h
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                            <a href="#" className="link">
                              Edit
                              <span className="sr-only">, {activity.id}</span>
                            </a>
                          </td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Table Footer */}
        <div className="my-4 w-full flex flex-col items-center justify-center">
          {/* <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              onClick={() => {
                if (tableRef.current) {
                  tableRef.current.scrollIntoView();
                }
                table.setPageIndex(0);
              }}
              disabled={!table.getCanPreviousPage()}
              type="button"
              className="disabled:bg-slate-50 relative inline-flex items-center px-2 py-2 mr-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => {
                if (tableRef.current) {
                  tableRef.current.scrollIntoView();
                }
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              type="button"
              className="disabled:bg-slate-50 relative inline-flex items-center px-2 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => {
                if (tableRef.current) {
                  tableRef.current.scrollIntoView();
                }
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              type="button"
              className="disabled:bg-slate-50 -ml-px relative inline-flex items-center px-2 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => {
                if (tableRef.current) {
                  tableRef.current.scrollIntoView();
                }
                table.setPageIndex(table.getPageCount() - 1);
              }}
              disabled={!table.getCanNextPage()}
              type="button"
              className="disabled:bg-slate-50 relative inline-flex items-center px-2 py-2 ml-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </span>
          <div>
            <span className="flex items-center gap-1 text-xs mt-2">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>

            <select
              className="hidden"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div> */}
          {(!activitesLoading && activitiesHasMore === true) && (
            <button
              className="btn-main mt-2"
              disabled={activities.length === 0}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                if (activities.length === 0) return;
                const dt = activities[activities.length - 1].start_date_local;
                activitiesFetch(dt, true, BEFORE, undefined);
              }}
            >
              Load older activities
            </button>
          )}
          {(!activitesLoading && activitiesHasMore === false) && (
            <button
              className="btn-main mt-2"
              disabled={activities.length === 0}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                if (activities.length === 0) return;
                const dt = activities[activities.length - 1].start_date_local;
                activitiesFetchForce(dt, BEFORE);
              }}
            >
              Request older activtities from strava
            </button>
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
      {/* TABLE END */}

      <div className="flex w-full mt-2 px-4 justify-end">
        <span className="text-xs">{recordsInfoText()}</span>
      </div>
    </div>
  );
};

export default Home;
