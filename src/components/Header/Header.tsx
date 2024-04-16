import { useStore } from "../../store/hooks";
import BpmInput from "../BpmInput/BpmInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import Clear from "../Clear/Clear";
import Config from "../Config/Config";

const Header = () => {
  const { store, dispatch } = useStore();
  const { play } = store;
  return (
    <>
      <div className="header">
        <div className="header__left">
          <button
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
          <Clear />
          <BpmInput />
        </div>
        <Config />
      </div>
    </>
  );
};

export default Header;
