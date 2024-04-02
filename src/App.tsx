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

  const themeUpdate = (index: number) => {
    dispatch({ type: "THEME", value: index });
  };

  const goToNextBeat = () => {
    if (!play) {
      clearInterval(track);
      setTrack(0);
      return;
    }
    clearInterval(track);
    setTrack(
      setTimeout(() => {
        dispatch({ type: "CURRENT" });
        goToNextBeat();
      }, time)
    );
  };

  const clearGrid = () => {
    dispatch({ type: "RESETGRID" });
  };

  const updateTime = (newTime: number) => {
    dispatch({ type: "TIME", value: Math.round(newTime) });
    if (track && play) {
      goToNextBeat();
      clearInterval(track);
    }
  };
  const updateBeats = (qty: number) => {
    dispatch({ type: "BEATS", value: qty });
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
    clearGrid();
    console.warn(store);
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
      <ThemeSwitcher onChangeTheme={themeUpdate}></ThemeSwitcher>
      <BeatInput changeBeatQty={updateBeats}></BeatInput>
      <BpmInput onTimeChange={updateTime}></BpmInput>
      <Sounds />
      {rows && <Grid />}
    </>
  );
}

export default App;
