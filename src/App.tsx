import { useState, useEffect, useRef } from 'react';
// import { createWorld } from './system/world';
import Artboard from './components/Artboard';
import Controls from './components/Controls';


const useLevel = () => {
  const [level, setLevel] = useState(1);

};


const App = () => {
  const $el = useRef();

  // useEffect(() => {
  //   const world = createWorld($el.current);
  //   world.start();
  // }, []);

  return (
    <main className="h-screen w-screen grid grid-cols-4">
      <Artboard className="col-span-3 overflow-hidden" />
      <Controls className="" />
    </main>
  );
};

export default App;
