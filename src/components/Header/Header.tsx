import { useStore } from "../../store/hooks";
import BeatInput from "../BeatInput/BeatInput";
import BpmInput from "../BpmInput/BpmInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faTrash,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { store, dispatch } = useStore();
  const { play } = store;
  return (
    <div className="header">
      <div className="header__left">
        <button
          className="main-btn"
          onClick={() => {
            dispatch({ type: "PLAY", value: !play });
          }}
        >
          {play ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <BpmInput />
        <BeatInput />
      </div>
      <button
        className="main-btn"
        onClick={() => dispatch({ type: "RESETGRID" })}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button className="main-btn">
        <FontAwesomeIcon icon={faGear} />
      </button>
    </div>
  );
};

export default Header;
