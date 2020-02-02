import React, { useRef, useLayoutEffect } from "react";
import * as d3 from "d3";

const D3 = ({ render, className }) => {
  const el = useRef(null);

  useLayoutEffect(() => {
    if (el.current) {
      d3.select(el.current)
        .selectAll("*")
        .remove();
      render(el.current);
    }
  }, [render]);

  return <svg ref={el} className={className} />;
};

export default D3;
