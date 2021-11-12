import { useState, useEffect } from "react";

const [size, setSize] = useState({
  height: undefined,
  width: undefined
});

useEffect(() => {
  function onResize() {
    setSize({
      height: window.innerWidth,
      width: window.innerWidth
    });
  }

  onResize();

  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);

return size;
