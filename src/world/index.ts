import * as CANNON from 'cannon-es';
import { createCamera, createRenderer, createLights, createScene } from '../system/scene';
import { createResizer } from '../system/resizer';
import { createLoop } from './loop';
import { createControls } from '../system/controls';
import { createPhysics } from './physics';
import Ground from '../system/ground';
import Cube from '../models/Cube';

let world;
let scene;
let camera;
let renderer;


const SMASH = (element) => {
  renderer = createRenderer();
  camera = createCamera();
  scene = createScene();
  // physicsWorld = createPhysics();

  const canvas = renderer.domElement;
  const controls = createControls(camera, canvas);
  const timeline = createLoop({ camera, scene, renderer });
  const { ambientLight, light } = createLights();

  const cube = Cube();
  const ground = Ground();

  createResizer({ element, camera, renderer });

  element.append(canvas);
  scene.add(light, ambientLight, ground);
  scene.add(cube);



  // Physics
  // this.physicsWorld = createPhysics

  // RenderLoop
/////// REFERENCE FROM SKETCHBOOK:
  // this.clock = new THREE.Clock();
  // this.renderDelta = 0;
  // this.logicDelta = 0;
  // this.sinceLastFrame = 0;
  // this.justRendered = false;
/////////////////////

  timeline.add(controls);
  timeline.add(cube);
  timeline.start();

  return world;
};







/////// REFERENCE FROM SKETCHBOOK:
	/**
	 * Rendering loop.
	 * Implements fps limiter and frame-skipping
	 * Calls world's "update" function before rendering.
	 * @param {World} world
	 * /
	public render(world: World): void {
		this.requestDelta = this.clock.getDelta();

		requestAnimationFrame(() =>
		{
			world.render(world);
		});

		// Getting timeStep
		let unscaledTimeStep = (this.requestDelta + this.renderDelta + this.logicDelta) ;
		let timeStep = unscaledTimeStep * this.params.Time_Scale;
		timeStep = Math.min(timeStep, 1 / 30);    // min 30 fps

		// Logic
		world.update(timeStep, unscaledTimeStep);

		// Measuring logic time
		this.logicDelta = this.clock.getDelta();

		// Frame limiting
		let interval = 1 / 60;
		this.sinceLastFrame += this.requestDelta + this.renderDelta + this.logicDelta;
		this.sinceLastFrame %= interval;

		// Stats end
		this.stats.end();
		this.stats.begin();

		// Actual rendering with a FXAA ON/OFF switch
		if (this.params.FXAA) this.composer.render();
		else this.renderer.render(this.graphicsWorld, this.camera);

		// Measuring render time
		this.renderDelta = this.clock.getDelta();
	}

	public add(worldEntity: IWorldEntity): void	{
		worldEntity.addToWorld(this);
		this.registerUpdatable(worldEntity);
	}

	public registerUpdatable(registree: IUpdatable): void {
		this.updatables.push(registree);
		this.updatables.sort((a, b) => (a.updateOrder > b.updateOrder) ? 1 : -1);
	}

	public remove(worldEntity: IWorldEntity): void {
		worldEntity.removeFromWorld(this);
		this.unregisterUpdatable(worldEntity);
	}

	public unregisterUpdatable(registree: IUpdatable): void	{
		_.pull(this.updatables, registree);
	}


	public update(timeStep: number, unscaledTimeStep: number): void {
		this.updatePhysics(timeStep);

		// Update registred objects
		this.updatables.forEach((entity) => {
			entity.update(timeStep, unscaledTimeStep);
		});

		// Lerp time scale
		this.params.Time_Scale = THREE.MathUtils.lerp(this.params.Time_Scale, this.timeScaleTarget, 0.2);

		// Physics debug
		if (this.params.Debug_Physics) this.cannonDebugRenderer.update();
	}

	public updatePhysics(timeStep: number): void {
		// Step the physics world
		this.physicsWorld.step(this.physicsFrameTime, timeStep);

		this.characters.forEach((char) => {
			if (this.isOutOfBounds(char.characterCapsule.body.position))
			{
				this.outOfBoundsRespawn(char.characterCapsule.body);
			}
		});

		this.vehicles.forEach((vehicle) => {
			if (this.isOutOfBounds(vehicle.rayCastVehicle.chassisBody.position))
			{
				let worldPos = new THREE.Vector3();
				vehicle.spawnPoint.getWorldPosition(worldPos);
				worldPos.y += 1;
				this.outOfBoundsRespawn(vehicle.rayCastVehicle.chassisBody, Utils.cannonVector(worldPos));
			}
		});
	}
/* */













export default SMASH;