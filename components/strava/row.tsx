import { Cell, Row } from "@tanstack/react-table";
import classNames from "classnames";
import Link from "next/link";
import { clearLine } from "readline";
import { Activity } from "../../common/Strava";
import { normalizeDate, normalizeDistance, normalizeMovingTime } from "../../lib/utils";

interface StravaRowProps {
  row: Row<Activity>;
  // showOnlyWithMap: boolean;
}

export default function StravaRow({ row }: StravaRowProps) {
  const cells = row.getVisibleCells();
  const hasMap: boolean =
    (cells[cells.length - 1].getValue() as string).length > 0;

  const stravaId = cells[0].getValue();

  return (
    <tr key={row.id} className="hover:bg-slate-50">
      {cells.map((cell) => {
        if (cell.column.id === "type") {
          return (
            <td key={cell.id} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
              <span
                className={classNames("label txt-base txt-mono", {
                  "label label-success": hasMap,
                })}
                title="id"
              >
                {cell.getValue() as string}
              </span>
            </td>
          );
        }
        if (cell.column.id === "name") {
          return (
            <td className="break-before-auto max-w-xs px-3 py-4 text-sm text-gray-500" key={cell.id}>
              <div className="inline-flex">
                <span className="txt" title={cell.id}>
                  {`${cell.getValue()}`}
                </span>
                {/* <span className="label label-success">Verified</span> */}
              </div>
            </td>
          );
        }
        if (cell.column.id === "distance") {
          return (
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" key={cell.id}>
              <div className="inline-flex">
                <span className="txt" title="distance">
                  {normalizeDistance(cell.getValue())}
                </span>
                {/* <span className="label label-warning">Verified</span> */}
              </div>
            </td>
          );
        }
        if (cell.column.id === "moving_time") {
          return (
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" key={cell.id}>
              <div className="inline-flex">
                <span className="txt" title="moving_time">
                  {normalizeMovingTime(cell.getValue())}
                </span>
                {/* <span className="label label-warning">Verified</span> */}
              </div>
            </td>
          );
        }
        if (cell.column.id === "start_date") {
          return (
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" key={cell.id}>
              <div className="inline-flex">
                <span className="txt" title="start_date">
                  {normalizeDate(cell.getValue())}
                </span>
                {/* <span className="label label-warning">Verified</span> */}
              </div>
            </td>
          );
        }
        if (cell.column.id === "polyline") {
          return (
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" key={cell.id}>
              {hasMap && (
                <Link
                  href={{
                    pathname: "/maps/" + stravaId,
                  }}
                >
                  <a
                    type="button"
                    className="btn-main"
                  >
                    <i className="ri-map-2-line" />
                    <span className="txt">Create Map</span>
                  </a>
                </Link>
              )}

              {/* <button type="button" className="btn btn-sm m-l-10 tbtn-edit">
              <i className="ri-profile-line" />
              <span className="txt">Edit profile</span>
            </button> */}
            </td>
          );
        }
        return null;
      })}
    </tr>
  );
}
