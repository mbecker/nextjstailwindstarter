import { Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngBoundsExpression, LatLngExpression, PathOptions } from "leaflet";

var polyUtil = require("polyline-encoded");

export interface MapInterface {
    polyline: LatLngBoundsExpression;
}


const limeOptions: PathOptions = { color: "#E11D48", weight: 4 };
const SPolyline = ({ polyline }: MapInterface) => {
  const map = useMap();

  
  map.fitBounds(polyline as LatLngBoundsExpression);
    
  return (
    <Polyline
      pathOptions={limeOptions}
      positions={polyline as LatLngExpression[]}
    />
  );
};

export default SPolyline;
