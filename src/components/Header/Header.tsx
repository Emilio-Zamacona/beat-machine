import { useStore } from "../../store/hooks";
import BeatInput from "../BeatInput/BeatInput";
import BpmInput from "../BpmInput/BpmInput";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const Header = () => {
  const { store, dispatch } = useStore();
  const { play } = store;
  return (
    <div className="header">
      <button
        className="header__button"
        onClick={() => dispatch({ type: "RESETGRID" })}
      >
        CLEAR
      </button>
      <button
        className="header__button"
        onClick={() => {
          dispatch({ type: "PLAY", value: !play });
        }}
      >
        {play ? "STOP" : "PLAY"}
      </button>
      <ThemeSwitcher />
      <BpmInput />
      <BeatInput />
    </div>
  );
};

export default Header;
