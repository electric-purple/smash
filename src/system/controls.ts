import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const createControls = (camera, canvas) => {
  const controls = new OrbitControls(camera, canvas);

  // controls.enableDamping = true;
  // controls.tick = () => controls.update();
  controls.tick = () => {};

  controls.minDistance = 5;  // not smaller than the camera’s near clipping plane
  controls.maxDistance = 20; // not greater than far clipping

  return controls;
}

const toggleEnabled = () => {
  // controls.enabled = false;
}

export { createControls, toggleEnabled };