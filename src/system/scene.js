// import * as THREE from 'three';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { DirectionalLight } from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// import cube from '../models/Cube';
// import RagDoll from '../models/RagDoll';
// let player = new RagDoll(Math.random() * 8 - 4, 30 + 20, Math.random() * 8 - 4);
// this.Add(player);


// let camera;
// let scene;
// let renderer;
// // let frameId;


const createResizer = ({ el, camera, renderer }) => {
  const onResize = () => {
    const w = el.offsetWidth;
    const h = el.offsetHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  window.addEventListener('resize', onResize);
  onResize();

  return () => {
    window.removeEventListener('resize', onResize);
  };
};

const createRenderer = () => {
  // const r = new WebGLRenderer({ antialias: true, canvas: el });
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
  // Create a directional light
  const light = new DirectionalLight('white', 8);
  // move the light right, up, and towards us
  light.position.set(10, 10, 10);

  return light;
};

const createScene = () => {
  return new Scene();

  // const onResize = () => resize(el);
  // const light = createLights();

  // renderer = createRenderer();
  // camera = createCamera();
  // scene = new Scene();
  // scene.add(light);

  // onResize();

  // window.addEventListener('resize', onResize);
  // el.append(renderer.domElement);

  // return scene;
};

const destroyScene = (el) => {
  stop();
  // window.removeEventListener('resize', resize); // onResize
  el.removeChild(renderer.domElement);
  // scene.remove(cube);
  // geometry.dispose();
  // material.dispose();
};


export {
  createScene,
  createRenderer,
  createCamera,
  createLights,
  createResizer,
  destroyScene,
};
