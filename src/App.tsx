import { useEffect, useState } from "react";
import Grid from "./components/Grid/Grid";
import Sounds from "./components/Sounds/Sounds";
import { useStore } from "./store/hooks";
import Header from "./components/Header/Header";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";

function App() {
  const [track, setTrack] = useState<number | undefined>(0);

  const { store, dispatch } = useStore();
  const { rows, play, bpm } = store;

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
    console.warn(time());
    setTrack(
      setInterval(() => {
        dispatch({ type: "CURRENT" });
        console.warn("wawwwwww", time());
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
    console.warn("aaaaaaaaaaaaa");
    clearInterval(track);
    setTrack(0);
    goToNextBeat();
  }, [time()]);

  useEffect(() => {
    dispatch({ type: "RESETGRID" });
  }, []);
  return (
    <>
      <Sounds />
      {rows && <Grid />}
      <Header />
      <ThemeSwitcher />
    </>
  );
}

export default App;
