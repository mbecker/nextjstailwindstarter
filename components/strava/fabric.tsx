import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { fabric } from "fabric";
import { Activity } from "../../common/Strava";
import { Transform } from "fabric/fabric-impl";
import {
  BlockPicker,
  ColorChangeHandler,
  ColorResult,
  GithubPicker,
  SliderPicker,
} from "react-color";
import {
  normalizeDate,
  normalizeDateSplit,
  normalizeDistance,
  normalizeMovingTime,
} from "../../lib/utils";
type Props = {
  activity: Activity;
};
const useFabric = (activity: Activity) => {
  const canvas = useRef<any | null>(null);
  const fabricRef = useCallback((element: any) => {
    if (!element) return canvas.current?.dispose();

    canvas.current = new fabric.Canvas(element);
    const scaleX = element.clientWidth > 800 ? 1 : element.clientWidth / 800;

    console.log("Client Width: ", element.clientWidth);
    console.log("Witdh: ", canvas.current.getWidth());
    console.log("Client Height: ", canvas.current.getHeight());
    console.log("Height: ", canvas.current.getHeight());
    canvas.current.setDimensions(
      {
        width: element.clientWidth > 800 ? 800 : element.clientWidth,
        height: 600 * scaleX,
      },
      { cssOnly: false }
    );

    const url = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/strava/map/${activity.id}?width=800&height=600`;

    fabric.Image.fromURL(url, function (img) {
      img.set({
        width: element.clientWidth, // canvas.current.getWidth(),
        height: 600 * scaleX,
        originX: "left",
        originY: "top",
      });
      canvas.current.setBackgroundImage(
        img,
        canvas.current.renderAll.bind(canvas.current)
      );
      // add background image
      // canvas.current.setBackgroundImage(img, canvas.current.renderAll.bind(canvas.current), {
      //    scaleX: canvas.current.width / img.width!,
      //    scaleY: canvas.current.height / img.height!
      // });
    });

    canvas.current.add(
      new fabric.Rect({
        top: 100,
        left: 100,
        width: 100,
        height: 100,
        fill: "red",
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (activity === null || typeof activity === "undefined") return null;
  const handleResize = () => {
    console.log("Resite GetWitdh: ", canvas.current.getWidth());
    const scaleX =
      canvas.current.getWidth() > 800 ? 1 : canvas.current.getWidth() / 800;
    console.log("Resize scaleX: ", scaleX);
    canvas.current.setWidth(
      canvas.current.getWidth() > 800 ? 800 : canvas.current.getWidth()
    );
    canvas.current.setHeight(600 * scaleX);
    // canvas.current.renderAll();
  };
  window.addEventListener("resize", handleResize);
  return fabricRef;
};

const Fabric = ({ activity }: Props) => {
  // const fabricRef = useFabric(activity);

  const containerRef = useRef<any | null>();
  const fabricRef = useRef<any | null>();
  const canvas = useRef<any | null>();
  const mapImage = useRef<fabric.Image>();
  const titleText = useRef<fabric.Text>();

  const [selectedObject, setSelectedObject] = useState<any | null>(null);

  const handleResize = () => {
    const scaleXTmp =
      containerRef.current.clientWidth > 800
        ? 1
        : containerRef.current.clientWidth / 800;
    const widthXTmp =
      containerRef.current.clientWidth > 800
        ? 800
        : containerRef.current.clientWidth;
    const heightXTmp = 600 * scaleXTmp;
    console.log("Tmp WidthX: ", widthXTmp);
    // canvas.current.setDimensions(
    //   { width: widthXTmp, height: heightXTmp },
    //   { cssOnly: false }
    // );
    // canvas.current.setWidth(widthXTmp);
    // canvas.current.setHeight(heightXTmp)
    // canvas.current.setDimensions(
    //   { width: widthXTmp, height: heightXTmp },
    //   { cssOnly: false }
    // );

    const ratio = 800 / 600;
    // const containerWidth = containerRef.current.clientWidth;
    const scale = widthXTmp / 800;
    // const zoom =  scale;
    console.log("widthXTmp=" + widthXTmp + ", scaleXTmp: ", scaleXTmp);
    canvas.current.setDimensions({ width: widthXTmp, height: heightXTmp });
    canvas.current.setViewportTransform([scaleXTmp, 0, 0, scaleXTmp, 0, 0]);

    // mapImage.current!.set({
    //   // width: containerRef.current.clientWidth,
    //   // height: containerRef.current.clientHeight,
    //   originX: "left",
    //   originY: "top",
    //   scaleX: scaleXTmp,
    //   scaleY: heightXTmp / 600,
    // });
    // console.log(mapImage.current);
    // canvas.current.scaleToWidth(widthXTmp);
    canvas.current.renderAll();
  };

  useEffect(() => {
    canvas.current = new fabric.Canvas(fabricRef.current, {});
    const scaleX =
      containerRef.current.clientWidth > 800
        ? 1
        : containerRef.current.clientWidth / 800;

    const widthX =
      containerRef.current.clientWidth > 800
        ? 800
        : containerRef.current.clientWidth;
    const heightX = 600 * scaleX;
    console.log("Client Width: ", containerRef.current.clientWidth);

    console.log("Client Height: ", canvas.current.getHeight());

    console.log(
      "witdhx=" + widthX + ",heightx=" + heightX + ",sclaeX=" + scaleX
    );
    canvas.current.setDimensions(
      { width: widthX, height: heightX },
      { cssOnly: false }
    );

    canvas.current.setZoom(scaleX);

    const url = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/strava/map/${activity.id}?width=800&height=600`;
    fabric.Image.fromURL(url, function (img) {
      // mapImage.current = img;
      // img.set({
      //   // width: containerRef.current.clientWidth,
      //   // height: containerRef.current.clientHeight,
      //   originX: "left",
      //   originY: "top",
      //   scaleX: scaleX,
      //   scaleY: heightX / img.height!,
      //   crossOrigin: 'anonymous',
      // });
      if (typeof canvas["current"] === "undefined") return;
      canvas.current.setBackgroundImage(
        img,
        canvas.current.renderAll.bind(canvas.current),
        {
          crossOrigin: "anonymous",
          width: 800,
          height: 600,
          originX: "left",
          originY: "top",
        }
      );
    });

    // Render the Text on Canvas
    // canvas.current.add(titleText.current);
    canvas.current.on("selection:cleared", function () {
      setSelectedObject(null);
    });
    canvas.current.renderAll();
    addText();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.current.dispose();
    };
  }, []);

  const addText = () => {
    const t = new fabric.Text(activity.name, {
      left: 10,
      top: 10,
      fontSize: 48,
      fontWeight: "bold",
      fontFamily: "'Roboto', sans-serif",
      fill: "rgb(14 165 233 / 1)",
      lineHeight: 1.1,
      // width: canvas.width - 48 * 2,
    });
    t.on("selected", function () {
      setSelectedObject(t);
    });
    canvas.current.add(t);

    const tsub = new fabric.Text(`${normalizeDateSplit(activity.start_date)}`, {
      left: 10,
      top: 64,
      fontSize: 32,
      fontWeight: "bold",
      fontFamily: "'Roboto', sans-serif",
      fill: "#EB144C",
      lineHeight: 1.1,
      // width: canvas.width - 48 * 2,
    });
    tsub.on("selected", function () {
      setSelectedObject(tsub);
    });
    canvas.current.add(tsub);

    const tsub2 = new fabric.Text(
      `${normalizeMovingTime(activity.moving_time)}`,
      {
        left: 10,
        top: 64 + 32,
        fontSize: 32,
        fontWeight: "bold",
        fontFamily: "'Roboto', sans-serif",
        fill: "#EB144C",
        lineHeight: 1.1,
        // width: canvas.width - 48 * 2,
      }
    );
    tsub2.on("selected", function () {
      setSelectedObject(tsub2);
    });
    canvas.current.add(tsub2);

    const tsub3 = new fabric.Text(`${normalizeDistance(activity.distance)}`, {
      left: 10,
      top: 64 + 32 + 32,
      fontSize: 32,
      fontWeight: "bold",
      fontFamily: "'Roboto', sans-serif",
      fill: "#EB144C",
      lineHeight: 1.1,
      // width: canvas.width - 48 * 2,
    });
    tsub3.on("selected", function () {
      setSelectedObject(tsub3);
    });
    canvas.current.add(tsub3);

    canvas.current.renderAll();
  };

  const handleChangeComplete = (
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedObject === null) return;
    console.log(color);
    selectedObject.set({ fill: color.hex });
    canvas.current.renderAll();
  };

  return (
    <>
      {selectedObject !== null && (
        <div className="fixed bottom-12 before:rounded-xl before:shadow-lg flex space-x-2 items-center z-50 px-2 py-4 font-semibold italic before:block before:absolute before:-inset-1 before:skew-y-2 before:bg-white">
          {/* <GithubPicker className="z-50 " triangle="hide" width="300px"/> */}
          <SliderPicker
            className="z-50 w-72"
            onChangeComplete={handleChangeComplete}
            color={selectedObject.fill}
          />
        </div>
      )}

      <div className="flex flex-row my-0 w-full">
        <div
          className="w-full min-h-full h-full flex justify-center items-center"
          ref={containerRef}
        >
          <canvas ref={fabricRef} className="w-full h-full shadow-lg rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default Fabric;
