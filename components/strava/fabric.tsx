import React, { createRef, useCallback, useEffect, useRef } from "react";

import { fabric } from "fabric";
import { Activity } from "../../common/Strava";
import { Transform } from "fabric/fabric-impl";

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
    canvas.current.renderAll();
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
    const scale          = widthXTmp / canvas.current.getWidth();
    const zoom           = canvas.current.getZoom() * scale;

    canvas.current.setDimensions({width: widthXTmp, height: heightXTmp});
    canvas.current.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);

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
    canvas.current = new fabric.Canvas(fabricRef.current, {
      
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

    console.log("witdhx=" + widthX + ",heightx=" + heightX);
    canvas.current.setDimensions(
      { width: widthX, height: heightX },
      { cssOnly: false }
    );
    const scale          = widthX / canvas.current.getWidth();
    
    canvas.current.setZoom(scale);



    const url = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/strava/map/${activity.id}?width=800&height=600`;
    fabric.Image.fromURL(url, function (img) {
      mapImage.current = img;
      img.set({
        // width: containerRef.current.clientWidth,
        // height: containerRef.current.clientHeight,
        originX: "left",
        originY: "top",
        scaleX: scaleX,
        scaleY: heightX / img.height!,
        crossOrigin: 'anonymous',
      });
      canvas.current.setBackgroundImage(
        img,
        canvas.current.renderAll.bind(canvas.current), {
          crossOrigin: 'anonymous',
          width: widthX,
          height: heightX,
        }

      );
      // canvas.current.setBackgroundImage(
      //   img,
      //   canvas.current.renderAll.bind(canvas.current, {
      //     width: containerRef.current.clientWidth,
      //     height: containerRef.current.clientHeight,
      //     originX: "left",
      //     originY: "top",
      //     scaleX: containerRef.current.clientWidth / img.width!,
      //     scaleY: containerRef.current.clientHeight / img.height!,
      //   })
      // );
      // add background image
      // canvas.current.setBackgroundImage(img, canvas.current.renderAll.bind(canvas.current), {
      //    scaleX: canvas.current.width / img.width!,
      //    scaleY: canvas.current.height / img.height!
      // });
    });

    var titletextbox = new fabric.Textbox(activity.name, {
      left: 10,
      top: 10,
      fontSize: 48,
      fontWeight: 'bold',
      fontFamily: "'Roboto', sans-serif",
      fill: '#F34E3A',
      lineHeight: 1.1,
      // width: canvas.width - 48 * 2,
    });


  // Render the Text on Canvas
  canvas.current.add(titletextbox);
  // canvas.current.renderAll();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center w-full my-2"
      
    >
      {/* <div className="flex flex-row space-x-1">
        <button onClick={onAddCircle}>Add circle</button>
        <button onClick={onAddRectangle}>Add Rectangle</button>
      </div> */}
      <div className="w-full flex justify-center items-center" ref={containerRef}>
      <canvas ref={fabricRef} className="w-full h-full"/>
      </div>
      
      {/* <FabricJSCanvas className="w-[800px] h-[600px]" onReady={onReady} /> */}
    </div>
  );
};

export default Fabric;
