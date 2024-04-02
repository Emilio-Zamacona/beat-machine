import { useEffect, useState } from "react";
import Grid from "./components/Grid/Grid";
import Sounds from "./components/Sounds/Sounds";
import BpmInput from "./components/BpmInput/BpmInput";
import BeatInput from "./components/BeatInput/BeatInput";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import { useStore } from "./store/hooks";

function App() {
  const [track, setTrack] = useState<number | undefined>(0);

  const { store, dispatch } = useStore();
  const { rows, play, time } = store;

  const goToNextBeat = () => {
    if (!play) {
      clearInterval(track);
      setTrack(0);
      return;
    }
    clearInterval(track);
    setTrack(
      setInterval(() => {
        dispatch({ type: "CURRENT" });
      }, time)
    );
  };

  const clearGrid = () => {
    dispatch({ type: "RESETGRID" });
  };

  const start = () => {
    if (!track && play) {
      goToNextBeat();
    } else if (!play) {
      clearInterval(track);
      setTrack(0);
    }
  };
  useEffect(() => {
    start();
  }, [play]);

  useEffect(() => {
    clearInterval(track);
    setTrack(0);
    goToNextBeat();
  }, [time]);

  useEffect(() => {
    clearGrid();
  }, []);
  return (
    <>
      <div>
        <button
          onClick={() => {
            dispatch({ type: "PLAY", value: !play });
          }}
        >
          play
        </button>
        <button onClick={clearGrid}>clear grid</button>
      </div>
      <ThemeSwitcher />
      <BeatInput />
      <BpmInput />
      <Sounds />
      {rows && <Grid />}
    </>
  );
}

export default App;
