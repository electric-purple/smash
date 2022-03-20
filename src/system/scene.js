// import * as THREE from 'three';
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  DirectionalLight,
  HemisphereLight,
  Color,
} from 'three';

// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;

  return renderer;
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
  const light = new DirectionalLight('white', 8);
  const ambientLight = new HemisphereLight(
    'white', // bright sky color
    'darkslategrey', // dim ground color
    5, // intensity
  );

  light.position.set(10, 10, 10);

  return { light, ambientLight };
};

const createScene = () => {
  const scene = new Scene();

  scene.background = new Color('papayawhip');

  return scene;
};

const destroyScene = () => {
  // stop();
  // window.removeEventListener('resize', resize); // onResize
  // el.removeChild(renderer.domElement);
  // scene.remove(cube);
  // geometry.dispose();
  // material.dispose();
};


export {
  createScene,
  createRenderer,
  createCamera,
  createLights,
  destroyScene,
};
