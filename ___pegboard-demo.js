// PEGBOARD DEMO
// https://codepen.io/iondrimba/pen/YzpwNLo?editors=0010


  // <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.min.js"></script>
  // <script src="https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js"></script>
  // <script src="https://Threejs.org/examples/js/controls/OrbitControls.js"></script>
  // <script src="https://Threejs.org/examples/js/controls/TransformControls.js"></script>

  import * as THREE from 'three';
  import * as CANNON from 'cannon-es'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';




  // <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.0/gsap.min.js"></script>
  // <script src="https://raw.githubusercontent.com/iondrimba/obstacles/main/public/debugger.js"></script>
  // <script src="https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js"></script>
  // <script src="https://cdn.jsdelivr.net/npm/tweakpane@1.5.8/dist/tweakpane.min.js" integrity="sha256-L+eEmiGRTnw9RotAeaziCRN0+TV9BiUaFiyD1FIhm3I=" crossorigin="anonymous"></script>


const radians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      }
    : null;
};

const rgbToHex = (s) =>
  s.match(/[0-9]+/g).reduce((a, b) => a + (b | 256).toString(16).slice(1), "#");

const rInterval = function (callback, delay) {
  const dateNow = Date.now;
  const requestAnimation = window.requestAnimationFrame;
  let start = dateNow();
  let stop;

  const intervalFunc = function () {
    dateNow() - start < delay || ((start += delay), callback());
    stop || requestAnimation(intervalFunc);
  };

  requestAnimation(intervalFunc);

  return {
    clear: function () {
      stop = 1;
    }
  };
};

class App {
  init() {
    this.setup();
    this.addStatsMonitor();
    this.createScene();
    this.createCamera();
    this.addCameraControls();
    this.addAmbientLight();
    this.addDirectionalLight();
    this.addPhysicsWorld();
    this.addFloor();
    this.addFloorGrid();
    this.addBackWall();
    this.addObstacles();
    this.addSpheres();
    this.addAxisHelper();
    this.addGuiControls();
    this.animate();
    this.addWindowListeners();
    this.addFallingBalls();
  }

  addFallingBalls() {
    if (this.animation.auto) {
      this.animation.loop = rInterval(this.addSpheres.bind(this), 300);
    } else {
      this.animation.loop.clear();
    }
  }

  tweenColors(material, rgb) {
    // gsap.to(material.color, 0.3, {
    //   ease: "power2.out",
    //   r: rgb.r,
    //   g: rgb.g,
    //   b: rgb.b
    // });
    Object.assign(material.color, {
      r: rgb.r,
      g: rgb.g,
      b: rgb.b
    });
  }

  setup() {
    this.debug = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.animation = {
      auto: true,
      interval: null
    };

    this.colors = {
      background: rgbToHex(
        window.getComputedStyle(document.body).backgroundColor
      ),
      wall: "#ff003e",
      floor: "#ffffff",
      ball: "#5661ff",
      cylinder: "#ffff00",
      grid: "#aca9a9"
    };

    this.meshes = {
      container: new THREE.Object3D(),
      spheres: [],
      obstacles: [],
      sphereMaterial: new THREE.MeshStandardMaterial({
        color: this.colors.ball,
        metalness: 0.11,
        emissive: 0x0,
        roughness: 0.1
      }),
      cylinderMaterial: new THREE.MeshStandardMaterial({
        color: this.colors.cylinder,
        emissive: 0x0,
        roughness: 1,
        metalness: 0
      })
    };
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.colors.background);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.scene.add(this.meshes.container);
    this.renderer.setSize(this.width, this.height);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);
  }

  addAxisHelper() {
    const axesHelper = new THREE.AxesHelper(5);

    this.debug && this.scene.add(axesHelper);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(0, 10, 50);

    this.scene.add(this.camera);
  }

  addCameraControls() {
    // this.orbitControl = new THREE.OrbitControls(
    this.orbitControl = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControl.minPolarAngle = radians(30);
    this.orbitControl.maxPolarAngle = radians(90);
    this.orbitControl.minAzimuthAngle = radians(-40);
    this.orbitControl.maxAzimuthAngle = radians(40);
    this.orbitControl.enableDamping = true;
    this.orbitControl.dampingFactor = 0.02;

    document.body.style.cursor = "-moz-grabg";
    document.body.style.cursor = "-webkit-grab";

    this.orbitControl.addEventListener("start", () => {
      requestAnimationFrame(() => {
        document.body.style.cursor = "-moz-grabbing";
        document.body.style.cursor = "-webkit-grabbing";
      });
    });

    this.orbitControl.addEventListener("end", () => {
      requestAnimationFrame(() => {
        document.body.style.cursor = "-moz-grab";
        document.body.style.cursor = "-webkit-grab";
      });
    });
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight({ color: "#ffffff" }, 0.5);

    this.scene.add(light);
  }

  addDirectionalLight() {
    const target = new THREE.Object3D();
    target.position.set(0, 0, -40);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.needsUpdate = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.position.set(0, 13, 23);
    this.directionalLight.target = target;

    this.directionalLight.shadow.camera.far = 1000;
    this.directionalLight.shadow.camera.near = -100;

    this.directionalLight.shadow.camera.left = -20;
    this.directionalLight.shadow.camera.right = 20;
    this.directionalLight.shadow.camera.top = 15;
    this.directionalLight.shadow.camera.bottom = -15;
    this.directionalLight.shadow.camera.zoom = 1;
    this.directionalLight.shadow.camera.needsUpdate = true;

    this.scene.add(this.directionalLight);
  }

  addFloorGrid() {
    const size = 100;
    const divisions = 100;
    this.grid = new THREE.GridHelper(
      size,
      divisions,
      this.colors.grid,
      this.colors.grid
    );

    this.grid.position.set(0, -5, 0);
    this.grid.material.opacity = 0;
    this.grid.material.transparent = false;

    this.scene.add(this.grid);
  }

  addBackWall() {
    const materialParams = { color: this.colors.wall, side: THREE.DoubleSide };
    const geometry = new THREE.PlaneBufferGeometry(100, 80);
    const material = new THREE.MeshStandardMaterial(materialParams);

    this.backwall = new THREE.Mesh(geometry, material);
    this.backwall.position.z = -0.5;
    this.backwall.receiveShadow = true;

    this.scene.add(this.backwall);

    // physics backwall
    this.backwall.body = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, 3, -0.4),
      material: new CANNON.Material(),
      shape: new CANNON.Plane(2, 2, 2)
    });

    this.backwall.body.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      radians(0)
    );
    this.world.addBody(this.backwall.body);
  }

  addFloor() {
    const geometry = new THREE.PlaneBufferGeometry(100, 80);
    const material = new THREE.MeshStandardMaterial({
      color: this.colors.floor,
      side: THREE.DoubleSide
    });

    this.floor = new THREE.Mesh(geometry, material);
    this.floor.position.y = -5;
    this.floor.position.z = 5;
    this.floor.rotateX(Math.PI / 2);
    this.floor.receiveShadow = true;

    this.scene.add(this.floor);

    // physics floor
    this.floor.body = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, -5, 5),
      material: new CANNON.Material(),
      shape: new CANNON.Plane(2, 2, 2)
    });

    this.floor.body.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      radians(-90)
    );
    this.world.addBody(this.floor.body);
  }

  addFloorHelper() {
    // this.controls = new THREE.TransformControls(
    this.controls = new TransformControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.enabled = false;
    this.controls.attach(this.floor);
    this.scene.add(this.controls);
  }

  getSphereMesh({ x, y, z }) {
    const radius = 0.3,
      width = 32,
      height = 32;
    const geometry = new THREE.SphereBufferGeometry(radius, width, height);
    const mesh = new THREE.Mesh(geometry, this.meshes.sphereMaterial);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(x, y, z);

    // physics sphere
    mesh.body = new CANNON.Body({
      mass: 1,
      material: new CANNON.Material(),
      shape: new CANNON.Sphere(radius),
      position: new CANNON.Vec3(x, y, z)
    });

    mesh.body.linearDamping = this.damping;
    mesh.body.fixedRotation = true;

    return mesh;
  }

  addObstacle(posX, posY, posZ, rotation) {
    const width = 4;
    const geometry = new THREE.BoxBufferGeometry(width, 1, 0.1);
    const matParams = {
      emissive: 0x0,
      roughness: 1,
      metalness: 0
    };

    const material = new THREE.MeshStandardMaterial(matParams);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.position.set(posX, posY, posZ);
    mesh.rotation.x = -radians(90);
    mesh.rotation.y = radians(rotation);

    this.meshes.container.add(mesh);
    this.meshes.obstacles.push(mesh);

    // physics obstacle
    mesh.body = new CANNON.Body({
      mass: 0,
      material: new CANNON.Material(),
      shape: new CANNON.Box(new CANNON.Vec3(width * 0.5, 0.05, 0.5)),
      position: new CANNON.Vec3(posX, posY, posZ)
    });

    mesh.body.quaternion.setFromAxisAngle(
      new CANNON.Vec3(0, 0, -1),
      radians(rotation)
    );
    this.world.addBody(mesh.body);
  }

  addObstacles() {
    this.addObstacle(-3, 2, 0, 30);
    this.addObstacle(3, 2, 0, -40);
    this.addObstacle(0, -2, 0, 0);

    this.addCylinder(8, 0);
    this.addCylinder(7, 0.5);
    this.addCylinder(6, 1);
    this.addCylinder(5, -0.5);
    this.addCylinder(4, 1);
    this.addCylinder(8, -2);
    this.addCylinder(7, -2.5);
    this.addCylinder(6, -2);
    this.addCylinder(5, -2.5);
    this.addCylinder(4, -1);
  }

  addCylinder(posY, posX) {
    const size = 0.1;
    const geometry = new THREE.CylinderGeometry(size, size, 1, 32);

    for (let index = 0; index < 3; index++) {
      const mesh = new THREE.Mesh(geometry, this.meshes.cylinderMaterial);

      mesh.position.set(index + posX, posY, 0);
      mesh.rotateX(Math.PI / 2);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.meshes.container.add(mesh);

      // physics cylinder
      mesh.body = new CANNON.Body({
        mass: 0,
        material: new CANNON.Material(),
        shape: new CANNON.Cylinder(size, size, 1, 32),
        position: new CANNON.Vec3(index + posX, posY, 0)
      });

      this.world.addBody(mesh.body);
    }
  }

  addSpheres() {
    const pos = [-2, -1, 0, 0.2, 0.8, 1.1];
    const posX = pos[Math.floor(Math.random() * pos.length)];
    const mesh = this.getSphereMesh({ x: posX, y: 12, z: 0 });

    this.meshes.spheres.push(mesh);
    this.meshes.container.add(mesh);

    // add contact config in relation to floor
    this.world.addBody(mesh.body);
    const mat = new CANNON.ContactMaterial(
      this.floor.body.material,
      mesh.body.material,
      { friction: 0.3, restitution: 0.5 }
    );
    this.world.addContactMaterial(mat);

    this.meshes.spheres.forEach((mesh) => {
      this.meshes.obstacles.forEach((o) => {
        // add contact config in relation to each obstacle, only shapes (no cylinders)
        const mat = new CANNON.ContactMaterial(
          o.body.material,
          mesh.body.material,
          { friction: 0.3, restitution: 0.5 }
        );

        this.world.addContactMaterial(mat);
      });
    });
  }

  addPhysicsWorld() {
    this.fixedTimeStep = 1 / 60; // seconds
    this.maxSubSteps = 3;
    this.damping = 0.09;
    this.time = 0.01;
    this.lastTime = this.time;

    this.world = new CANNON.World();
    this.world.gravity.set(0, -20, 0.01);
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;
    this.world.defaultContactMaterial.contactEquationStiffness = 1e6;
    this.world.defaultContactMaterial.contactEquationRelaxation = 3;

    // this.cannonDebugRenderer = this.debug && new THREE.CannonDebugRenderer(this.scene, this.world);
  }

  addGuiControls() {
    this.pane = new Tweakpane();

    // control animation
    this.guiAnimation = this.pane.addFolder({
      title: "Animation",
      expanded: false
    });

    this.guiAnimation.addInput(this.animation, "auto").on("change", (value) => {
      this.animation.auto = value;
      this.addFallingBalls();
    });

    // add ball
    const btn = this.guiAnimation.addButton({
      title: "Add Ball"
    });

    btn.on("click", () => {
      this.addSpheres();
    });

    // control colors
    this.guiColors = this.pane.addFolder({
      title: "Colors",
      expanded: false
    });

    this.guiColors.addInput(this.colors, "wall").on("change", (value) => {
      this.tweenColors(this.backwall.material, hexToRgb(value));
    });

    this.guiColors.addInput(this.colors, "floor").on("change", (value) => {
      this.tweenColors(this.floor.material, hexToRgb(value));
    });

    this.guiColors.addInput(this.colors, "ball").on("change", (value) => {
      this.tweenColors(this.meshes.sphereMaterial, hexToRgb(value));
    });

    this.guiColors.addInput(this.colors, "cylinder").on("change", (value) => {
      this.tweenColors(this.meshes.cylinderMaterial, hexToRgb(value));
    });

    this.guiColors.addInput(this.colors, "grid").on("change", (value) => {
      this.tweenColors(this.grid.material, hexToRgb(value));
    });

    // control lights
    this.guiLights = this.pane.addFolder({
      title: "Lights",
      expanded: false
    });

    this.guiLights
      .addInput(this.directionalLight.position, "x", { min: -100, max: 100 })
      .on("change", (value) => {
        this.directionalLight.position.x = value;
      });

    this.guiLights
      .addInput(this.directionalLight.position, "y", { min: -100, max: 100 })
      .on("change", (value) => {
        this.directionalLight.position.y = value;
      });

    this.guiLights
      .addInput(this.directionalLight.position, "z", { min: -100, max: 100 })
      .on("change", (value) => {
        this.directionalLight.position.z = value;
      });
  }

  addWindowListeners() {
    window.addEventListener("resize", this.onResize.bind(this), {
      passive: true
    });

    window.addEventListener(
      "visibilitychange",
      (evt) => {
        if (evt.target.hidden) {
          this.animation.auto = false;
          this.addFallingBalls();
          this.pane.refresh();
        }
      },
      false
    );
  }

  addStatsMonitor() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.querySelector(".stats").appendChild(this.stats.domElement);
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    this.stats.begin();
    this.orbitControl.update();
    this.renderer.render(this.scene, this.camera);

    // physics loop
    if (this.lastTime !== undefined) {
      // this.debug && this.cannonDebugRenderer.update();
      var dt = (this.time - this.lastTime) / 1000;
      this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);

      // map physics position to threejs mesh position
      this.meshes.spheres.forEach((s) => {
        s.position.copy(s.body.position);
        s.quaternion.copy(s.body.quaternion);
      });
    }

    this.stats.end();
    this.lastTime = this.time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

// new App().init();
export default new App();
