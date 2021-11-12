// import * as THREE from 'three';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { DirectionalLight } from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import cube from '../../models/Cube';
import RagDoll from '../../models/RagDoll';


let camera, scene, renderer;
let frameId;

const animate = () => {
  window.requestAnimationFrame(animate);

  // ......
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  //
  //

  renderer.render(scene, camera);
};

const start = () => {
  if (!frameId) {
    frameId = window.requestAnimationFrame(animate);
  }
};

const stop = () => {
  window.cancelAnimationFrame(frameId);
  frameId = null;
};

const resize = (el) => {
  const w = el.offsetWidth;
  const h = el.offsetHeight;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};

const createRenderer = (el) => {
  // const r = new WebGLRenderer({ antialias: true, canvas: el });
  const r = new WebGLRenderer({ antialias: true });

  r.physicallyCorrectLights = true;

  return r;
};

const createCamera = () => {
  const camera = new PerspectiveCamera(
    70,   // fov = Field Of View
    1,    // aspect ratio (dummy value)
    1,    // near clipping plane
    1000, // far clipping plane
  );

  camera.position.set(0, 0, 5);

  return camera;
};

const createLights = () => {
  // Create a directional light
  const light = new DirectionalLight('white', 8);
  // move the light right, up, and towards us
  light.position.set(10, 10, 10);

  return light;
};

const createScene = (el) => {
  renderer = createRenderer();
  camera = createCamera();
  scene = new Scene();

  const light = createLights();
  const onResize = () => resize(el);


  // camera.lookAt(scene.position); // default ...?
  scene.add(cube, light);

  onResize();

  el.append(renderer.domElement);
  window.addEventListener('resize', onResize);
};

const destroyScene = (el) => {
  stop();
  // window.removeEventListener('resize', resize); // onResize
  el.removeChild(renderer.domElement);
  scene.remove(cube);
  // geometry.dispose();
  // material.dispose();
};


export {
  createScene,
  destroyScene,
  start,
  stop
};
