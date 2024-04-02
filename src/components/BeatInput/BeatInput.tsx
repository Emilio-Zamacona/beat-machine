import { useStore } from "../../store/hooks";

const BeatInput = () => {
  const { dispatch } = useStore();
  const onChangeBeatQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "BEATS", value: e.target.value });
  };
  return <input onChange={onChangeBeatQty} type="number" />;
};
export default BeatInput;
