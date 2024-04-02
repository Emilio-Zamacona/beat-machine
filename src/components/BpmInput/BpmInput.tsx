import { minBpm, maxBpm } from "../../constants/config";
import { useStore } from "../../store/hooks";

const BpmInput = () => {
  const { dispatch } = useStore();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "TIME",
      value: Math.round(15000 / Number(e.target.value)),
    });
  };
  return (
    <input onChange={onInputChange} type="range" min={minBpm} max={maxBpm} />
  );
};
export default BpmInput;
