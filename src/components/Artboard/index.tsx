// @see https://codepen.io/apatheticwes/pen/BapOQYz?editors=0011


import { createWorld } from '../../system/world';
import { FC, useRef, useEffect, useState } from 'react';

// import cube from '../../models/Cube';
// import RagDoll from '../../models/RagDoll';

// let player = new RagDoll(Math.random() * 8 - 4, 30 + 20, Math.random() * 8 - 4);

// import useMouse from '@/hooks/useMouse';

// import PEGBOARD from '../../pegboard-demo';
// PEGBOARD.init();

interface ArtboardOptions {
  // opt: any;
}


const Artboard: FC<ArtboardOptions> = ({ className }) => {
  const $el = useRef(); // document querySelector(' birds')
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
    // const scene = createScene($el.current);
    const world = createWorld($el.current);

    // scene.add(cube);

    world.start();
  }, []);


  return (
    <div className={className} ref={$el}>
      {/* { x }, { y } */}
      {/* <canvas className="w-full h-full"></canvas> */}
    </div>
  );
};

export default Artboard;
