import React, { useRef, useEffect } from "react";

const D3 = ({ render }) => {
  const el = useRef(null);

  useEffect(() => {
    render(el.current);
  }, [render]);

  return <svg ref={el} />;
};

export default D3;
