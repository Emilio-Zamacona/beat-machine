import { minBpm, maxBpm } from "../../constants/config";

interface IBpmInput {
  onTimeChange: (time: number) => void;
}
const BpmInput = ({ onTimeChange }: IBpmInput) => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTimeChange(15000 / Number(e.target.value));
  };
  return (
    <input onChange={onInputChange} type="range" min={minBpm} max={maxBpm} />
  );
};
export default BpmInput;
