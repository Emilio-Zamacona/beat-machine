import { useEffect, useState } from "react";
import Grid from "./components/Grid/Grid";
import Sounds from "./components/Sounds/Sounds";
import { useStore } from "./store/hooks";
import Header from "./components/Header/Header";

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
    dispatch({ type: "RESETGRID" });
  }, []);
  return (
    <>
      <Header />
      <Sounds />
      {rows && <Grid />}
    </>
  );
}

export default App;
