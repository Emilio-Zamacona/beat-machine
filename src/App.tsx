import { useEffect, useState } from "react";
import Grid from "./components/Grid/Grid";
import Sounds from "./components/Sounds/Sounds";
import { useStore } from "./store/hooks";
import Header from "./components/Header/Header";
import { IColor } from "./types";

function App() {
  const [track, setTrack] = useState<NodeJS.Timeout | undefined | number>(
    undefined
  );

  const { store, dispatch } = useStore();
  const { rows, play, bpm, theme } = store;

  const time = () => {
    return Math.round(15000 / bpm);
  };

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
      }, time())
    );
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
  }, [time()]);

  useEffect(() => {
    dispatch({ type: "RESETGRID" });
  }, []);
  useEffect(() => {
    theme.colors.map((color: IColor) => {
      const key1 = `--theme-${color.name}`;
      const value1 = color.value;
      document.documentElement.style.setProperty(key1, value1);
    });
  }, [theme]);
  return (
    <>
      <Sounds />
      {rows && <Grid />}
      <Header />
    </>
  );
}

export default App;
