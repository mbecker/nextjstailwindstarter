import React, { useEffect, useRef } from "react";

import "tui-image-editor/dist/tui-image-editor.css";
import BaseImageEditor from "@toast-ui/react-image-editor";
import { Activity } from "../../common/Strava";

type Props = {
  activity: Activity;
};

const ToastUI = ({ activity }: Props) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    console.log(ref);
    if(ref.current === null) return;

      ref.current
      .getInstance().loadImageFromURL(`http://localhost:8090/api/strava/map/${activity.id}?width=800&height=600`, 'lena').then((result: any) => {
     console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
     console.log('new : ' + result.newWidth + ', ' + result.newHeight);
});
    return () => {};
  }, [activity.id, ref]);

  return (
    <div className="w-full h-full">
      <BaseImageEditor
        ref={ref}
        includeUI={{
          //   loadImage: {
          //     path: `http://localhost:8090/api/strava/map/${activity.id}?width=800&height=600`,
          //     name: 'SampleImage',
          //   },
          //   theme: 'white',
          menu: ["shape", "filter"],
          initMenu: "filter",
          uiSize: {
            width: "1000px",
            height: "700px",
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
    </div>
  );
};

export default ToastUI;
