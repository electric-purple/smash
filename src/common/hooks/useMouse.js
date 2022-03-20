import { useState } from "react";

const [coords, setCoords] = useState({
  x: 0,
  y: 0
});


function onMouseMove(e) {
  setCoords({
    x: e.clientX,
    y: e.clientY
  });
}

function useMouse(ref) {
  return [coords];
}

window.addEventListener("mousemove", onMouseMove);
// () =>  window.removeEventListener("mousemove", onMouseMove)

export default useMouse;
