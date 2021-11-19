import * as CANNON from 'cannon-es';
import { createCamera, createRenderer, createLights, createScene, createResizer } from './scene';
import Cube from '../models/Cube';
import { start, stop, createTimeline } from './animate';

let world;
let scene;
let camera;
let renderer;
let groundBody;
// let frameId;

const createWorld = (el) => {
  renderer = createRenderer();
  camera = createCamera();
  scene = createScene();

  createResizer({ el, camera, renderer });
  createTimeline({ camera, scene, renderer });

  const light = createLights();
  const cube = new Cube(scene);

  scene.add(light);
  scene.add(cube);

  el.append(renderer.domElement);
};

const createWorldII = (el) => {
  groundBody = new CANNON.Body({
    shape: new CANNON.Plane(),
    mass: 0
  });

  groundBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),
    -Math.PI / 2
  );

  world = new CANNON.World();
  world.gravity.set(0, -5, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.tolerance = 0.001;
  world.addBody(groundBody);

  return world;
};

export {
  createWorld
};
