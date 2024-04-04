import { useState } from 'react';
import { minBpm, maxBpm } from '../../constants/config';
import { useStore } from '../../store/hooks';

const BpmInput = () => {
  const { dispatch } = useStore();
  const [bpm, setBpm] = useState(70);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
  };
  const onMouseUp = () => {
    dispatch({
      type: 'BPM',
      value: bpm,
    });
  };
  return (
    <div className="header__element">
      <span>BPM: {bpm}</span>
      <input onChange={onInputChange} onMouseUp={onMouseUp} value={bpm} type="range" min={minBpm} max={maxBpm} />
    </div>
  );
};
export default BpmInput;
