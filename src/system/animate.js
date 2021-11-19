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


const createTimeline = ({ camera, scene, renderer }) => {
  const start = () => {
    renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      tick();

      // render a frame
      renderer.render(scene, camera);
    });
  };

  const stop = () => {};

  const setUpdatables = () => {};

  const tick = () => {
    for (const object of this.updatables) {
      object.tick();
    }
  };

  return [start, stop];
};

export {
  createTimeline
};
