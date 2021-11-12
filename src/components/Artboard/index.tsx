// @see https://codepen.io/apatheticwes/pen/BapOQYz?editors=0011




// import { Camera, Group, Scene  } from 'three';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



// import React, { FC } from 'react';
import { FC, useRef, useEffect, useState } from 'react';
// import useMouse from '@/hooks/useMouse';
// import * as THREE from 'three';

// import PEGBOARD from '../../pegboard-demo';
// PEGBOARD.init();

interface ArtboardOptions {
  // opt: any;
}

let camera, scene, renderer;

const Artboard: FC<ArtboardOptions> = () => {
  const canvas = useRef(); // document querySelector(' birds')
  // const [isAnimating, setAnimating] = useState(true);
  // const [x, y] = useMouse(canvas);

  // useEffect(() => {
  //   const loadModel = async () => {
  //     // const GTFOLoader = (await import('three/examples/jsm/controls/OrbitControls'));
  //     const GTFOLoader = (await import('three/examples/jsm/loaders/GLTFLoader')).GLTFLoader;
  //     new GTFOLoader().load('/scene.gtfo', setModel);
  //   }
  // });


  useEffect(() => {
    let frameId;

    renderer = new WebGLRenderer({
      canvas: canvas.current,
      antialias: true,
    });
    camera = new PerspectiveCamera();
    scene = new Scene();

    camera.fov = 70;
    camera.near = 1;
    camera.far = 4000;
    camera.position.z = 200;
    camera.position.y = 300;
    camera.position.x = -500;
    camera.lookAt(scene.position);

    scene.add(camera);

    const onResize = () => {
      // const w = canvas.current.innerWidth;
      // const h = canvas.current.innerHeight;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // renderer.setPixelRatio( window.devicePixelRatio ); // if no `false`, below:
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = null;
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      // other animation stuffs
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', onResize);

    onResize();
    start();

    return () => {
      // ...cleanup
      stop();
      window.removeEventListener('resize', onResize);
      // canvas.current.removeChild(renderer.domElement)
      // scene.remove(cube)
      // geometry.dispose()
      // material.dispose()
    };
  }, []);

  return (
    <>
      {/* { x }, { y } */}
      <canvas ref={canvas}></canvas>
    </>
  );
};

export default Artboard;
