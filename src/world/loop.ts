import { Clock } from 'three';

const clock = new Clock();

// let frameId;

// const animate = () => {
//   window.requestAnimationFrame(animate);

//   renderer.render(scene, camera);
// };

// const start = () => {
//   if (!frameId) {
//     frameId = window.requestAnimationFrame(animate);
//   }
// };

// const stop = () => {
//   window.cancelAnimationFrame(frameId);
//   frameId = null;
// };

const createLoop = ({ camera, scene, renderer }) => {
  let updatables = [];

  const start = () => {
    renderer.setAnimationLoop(() => {
      tick();
      renderer.render(scene, camera);
    });
  };

  const stop = () => {
    renderer.setAnimationLoop(null);
  };

  const add = (x) => {
    updatables.push(x);
  };

  const tick = () => {
    const delta = clock.getDelta();

    for (const object of updatables) {
      object.tick(delta);
    }
  };

  return { start, stop, add };
};

export {
  createLoop
};
