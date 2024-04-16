import { useStore } from "../../store/hooks";
import { beatLengths } from "../../constants/config";

const BeatInput = () => {
  const { dispatch } = useStore();
  const onChangeBeatQty = (num: number) => {
    dispatch({ type: "BEATS", value: num });
  };
  return (
    <div className="config">
      <p className="config__label">Beat amount:</p>
      <div className="config__action">
        {beatLengths.map((num) => (
          <button
            key={num}
            className="main-btn"
            onClick={() => onChangeBeatQty(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};
export default BeatInput;
