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
import { useOnClickOutside } from "../../lib/hooks";
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

var deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23000000;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

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
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerSize = 6;
    fabric.Object.prototype.cornerColor = "black";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "black";
    fabric.Object.prototype.borderColor = "black";

    var img = document.createElement("img");
    img.src = deleteIcon;

    function deleteObject(
      eventData: MouseEvent,
      transformData: Transform,
      x: number,
      y: number
    ): boolean {
      var target = transformData.target;
      canvas.current.remove(target);
      canvas.current.requestRenderAll();
      return false;
    }

    function renderIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      styleOverride: any,
      fabricObject: fabric.Object
    ) {
      var size = 18;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle as number));
      ctx.drawImage(img, -size/2, -size/2, size, size);
      ctx.restore();
    }

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: -0.5,
      y: -0.75,
      offsetY: 0,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon,
    });

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

  useOnClickOutside(containerRef, () => {
    if(canvas.current === null) return;
    canvas.current.discardActiveObject().renderAll()
  });

  return (
    <div ref={containerRef}>
      {selectedObject !== null && (
        <div className="fixed bottom-0 left-0 right-0 w-72 mx-auto mb-12 z-40">
          <div className="flex items-center justify-center space-x-2 z-50 px-2 py-4 before:rounded-md before:shadow-md before:ring-1 before:ring-gray-400 before:block before:absolute before:-inset-1 before:skew-y-2 before:bg-white">
            {/* <GithubPicker className="z-50 " triangle="hide" width="300px"/> */}
            <SliderPicker
              className="z-50 w-72"
              onChangeComplete={handleChangeComplete}
              onChange={handleChangeComplete}
              color={selectedObject.fill}
            />
          </div>
        </div>
      )}

      <div className="flex flex-row my-0 w-full">
        <div
          className="w-full min-h-full h-full flex justify-center items-center"
          
        >
          <canvas
            ref={fabricRef}
            className="w-full h-full shadow-lg rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Fabric;
