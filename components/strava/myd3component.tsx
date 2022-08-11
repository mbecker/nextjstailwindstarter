import React, { useRef, useEffect, useState, useMemo } from "react";
import * as d3 from "d3";

import { drag } from "d3-drag";
import { Activity } from "../../common/Strava";

interface IProps {
  data?: number[];
  activity: Activity;
}

const width = 800;
const height = 600;
const radius = 20;


export default function MyD3Component(props: IProps) {
  
  const d3Container = useRef(null);

  const d3drag = useMemo(function () {
    function dragstarted() {
      d3.select(this).attr("stroke", "black");
    }

    function dragged(event: MouseEvent) {
      d3.select(this)
        // .raise()
        .attr("x", event.x)
        .attr("y", event.y);
    }

    function dragended() {
      d3.select(this).attr("stroke", null);
    }

    return (
      d3
        .drag()
        //   .on("start", dragstarted)
        .on("drag", dragged)
    );

    //   .on("end", dragended);
  }, []);

  const mounted = useRef(false);

  useEffect(
    () => {
      if (props.data && d3Container.current && !mounted.current) {
        mounted.current = true;

        const svgElement = d3.select(d3Container.current);
        svgElement
          .append("image")
          .attr(
            "href",
            `http://localhost:8090/api/strava/map/${props.activity.id}?width=800&height=600`
          )
          .attr("height", 600)
          .attr("width", 800)
          .attr("preserveAspectRatio", "none")
          .attr("x", 0)
          .attr("y", 0)
          .style("width", "100%")
          .style("height", "100%");

        svgElement
          .append("text")
          .text(props.activity.name)
          .attr("color", "#E11D48")
          .attr("fill", "#E11D48")
          .attr("x", 24)
          .attr("y", 24)
          .style("font-size", "16px")
          .call(d3drag)
          .attr("id", "drag");
      }
    },
    [d3drag, mounted, props.activity.id, props.activity.name, props.data]
  );

  return (
    <svg className="d3-component" width={800} height={600} ref={d3Container} />
  );
}
