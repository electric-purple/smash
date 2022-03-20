import { FC } from 'react';

interface ControlsProps {
  data?: any;
}

const Controls: FC<ControlsProps> = ({ className }) => {
  return (
    <div className={className}>
      Controls     we have smash
      <button>start</button>
      <button>stop</button>
    </div>
  );
};

export default Controls;
