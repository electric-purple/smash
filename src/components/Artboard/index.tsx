// @see https://codepen.io/apatheticwes/pen/BapOQYz?editors=0011


import SMASH from '../../world';
import { FC, useRef, useEffect, useState } from 'react';


// import useMouse from '@/hooks/useMouse';

// import PEGBOARD from '../../pegboard-demo';
// PEGBOARD.init();

interface ArtboardOptions {
  // opt: any;
}


const Artboard: FC<ArtboardOptions> = ({ className }) => {
  const $el = useRef(); // document querySelector(' birds')
  // const [x, y] = useMouse(canvas);

  // useEffect(() => {
  //   const loadModel = async () => {
  //     // const GTFOLoader = (await import('three/examples/jsm/controls/OrbitControls'));
  //     const GTFOLoader = (await import('three/examples/jsm/loaders/GLTFLoader')).GLTFLoader;
  //     new GTFOLoader().load('/scene.gtfo', setModel);
  //   }
  // });

  useEffect(() => {
    const world = SMASH($el.current);


    // world.start();
  }, []);


  return (
    <div className={className} ref={$el}>
      {/* { x }, { y } */}
      {/* <canvas className="w-full h-full"></canvas> */}
    </div>
  );
};

export default Artboard;
