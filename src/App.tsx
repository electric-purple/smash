import { useState } from 'react';
import Artboard from './components/Artboard';
import Controls from './components/Controls';


const useLevel = () => {
  const [level, setLevel] = useState(1);

};


const App = () => (


  <main className="h-screen w-screen grid grid-cols-4">
    <Artboard className="col-span-3 overflow-hidden" />
    <Controls className="" />
  </main>
);

export default App;
