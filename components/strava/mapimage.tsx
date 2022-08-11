import { Activity } from "../../common/Strava";

export interface MapImageInterface {
  activity: Activity;
  fontSize: number;
}

export const MapImage = ({ activity, fontSize }: MapImageInterface) => {
  return (
    <svg width={800} height={600}>
      <image
        href={`http://localhost:8090/api/strava/map/${activity.id}?width=800&height=600`}
        height={800}
        width={600}
        x={0}
        y={0}
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      />
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
  );
};
