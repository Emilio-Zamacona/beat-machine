import { useStore } from "../../store/hooks";
import { beatLengths } from "../../constants/config";

const BeatInput = () => {
  const { dispatch } = useStore();
  const onChangeBeatQty = (num: number) => {
    dispatch({ type: "BEATS", value: num });
  };
  return (
    <div className="header__element">
      {beatLengths.map((num) => (
        <button className="main-btn" onClick={() => onChangeBeatQty(num)}>
          {num}
        </button>
      ))}
    </div>
  );
};
export default BeatInput;
