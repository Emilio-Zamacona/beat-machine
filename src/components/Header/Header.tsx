import { useStore } from "../../store/hooks";
import BpmInput from "../BpmInput/BpmInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import Clear from "../Clear/Clear";
import Config from "../Config/Config";
import About from "../About/About";

const Header = () => {
  const { store, dispatch } = useStore();
  const { play, size, rows } = store;
  return (
    <>
      <div
        className="header"
        style={{
          maxWidth: `calc(${size * rows[0].squares.length}vh + ${
            rows[0].squares.length * 2
          }px)`,
        }}
      >
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
        <div className="flex gap-8">
          <Config />
          <About />
        </div>
      </div>
    </>
  );
};

export default Header;
