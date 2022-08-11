import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Activity } from "../../common/Strava";
import { useMemo } from "react";
import { LatLngExpression, LatLngTuple, PathOptions } from "leaflet";
import SPolyline from "./spolyline";

var polyUtil = require("polyline-encoded");

export interface MapInterface {
  activity: Activity;
  fontSize: number;
}

var getCenter = function (arr: LatLngTuple[]) {
  var x = arr.map((xy) => xy[0]);
  var y = arr.map((xy) => xy[1]);
  var cx = (Math.min(...x) + Math.max(...x)) / 2;
  var cy = (Math.min(...y) + Math.max(...y)) / 2;
  return [cx, cy];
};

const Map = ({ activity, fontSize }: MapInterface) => {
  const pol: LatLngTuple[] = useMemo(
    () => polyUtil.decode(activity.map.summary_polyline),
    [activity.map.summary_polyline]
  );

  const svgText = useMemo(
    () => (
      <svg
        key={"text1"}
        className="absolute left-0 top-0 w-[100%] h-[100%] z-[999999]"
      >
        <text
          x="64"
          y="24"
          color="#E11D48"
          fill="#E11D48"
          style={{
            fontSize: fontSize + "px",
            color: "#E11D48",
            fontWeight: "bolder",
          }}
        >
          {activity.name}
        </text>
      </svg>
    ),
    [activity.name, fontSize]
  );
  const center = useMemo(() => getCenter(pol), [pol]);
  const map = useMemo(
    () => (
      <MapContainer
        key={"map1"}
        center={center as LatLngExpression}
        zoom={13}
        dragging={false}
        zoomControl={false}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        {activity.map.summary_polyline.length > 0 && (
          <SPolyline key={"pol1"} polyline={pol} />
        )}
        {/* <SText text={activity.name} /> */}
      </MapContainer>
    ),
    [activity.map.summary_polyline.length, center, pol]
  );

  return (
    <div className="w-full h-full">
      {svgText}
      {map}
    </div>
  );
};

export default Map;
