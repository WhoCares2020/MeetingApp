import React, { useRef, useLayoutEffect } from "react";

const D3 = ({ render, className }) => {
  const el = useRef(null);

  useLayoutEffect(() => {
    if (el.current) render(el.current);
  }, [render]);

  return <svg ref={el} className={className}/>;
};

export default D3;
