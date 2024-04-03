import { useState } from "react";
import { minBpm, maxBpm } from "../../constants/config";
import { useStore } from "../../store/hooks";

const BpmInput = () => {
  const { dispatch } = useStore();
  const [bpm, setBpm] = useState(70);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
    dispatch({
      type: "BPM",
      value: Number(e.target.value),
    });
  };
  return (
    <div>
      <span>BPM: {bpm}</span>
      <input
        onChange={onInputChange}
        value={bpm}
        type="range"
        min={minBpm}
        max={maxBpm}
      />
    </div>
  );
};
export default BpmInput;
