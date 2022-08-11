import { Polyline, SVGOverlay, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngBoundsExpression, LatLngExpression, PathOptions } from "leaflet";
import { useMemo, useState } from "react";

var polyUtil = require("polyline-encoded");

export interface MapInterface {
    text: string;
}


const limeOptions: PathOptions = { color: "#E11D48", weight: 4 };
const SText = ({ text }: MapInterface) => {
  const map = useMap();
  

  const [bounds, setBounds] = useState<LatLngBoundsExpression>([
    [map.getBounds().getNorthWest().lat, map.getBounds().getNorthWest().lng],
    [map.getBounds().getSouthEast().lat, map.getBounds().getSouthEast().lng],
  ]);
  
  return (
    <SVGOverlay attributes={{ stroke: 'transparent' }} bounds={bounds} >
    <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
    <circle r="5" cx="10" cy="10" fill="red" />
    <text x="64" y="24" color="#E11D48" fill="#E11D48" style={{fontSize: '16px', color: '#E11D48', fontWeight: 'bolder'}}>
      {text}
    </text>
  </SVGOverlay>
  );
};

export default SText;
