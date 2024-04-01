import { useContext, useEffect, useState } from "react";
import Grid from "./components/Grid/Grid";
import { IRow } from "./types";
import Sounds from "./components/Sounds/Sounds";
import BpmInput from "./components/BpmInput/BpmInput";
import BeatInput from "./components/BeatInput/BeatInput";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import { StoreContext } from "./store/context";

function App() {
  const [rows, setRows] = useState<IRow[]>();
  const [play, setPlay] = useState(false);
  const [track, setTrack] = useState<number | undefined>(0);

  const { store, dispatch } = useContext(StoreContext);

  const themeUpdate = (index: number) => {
    dispatch({ type: "SWITCH", value: index });
  };
  const goToNextBeat = (time?: number) => {
    console.log(store.current);
    clearInterval(track);
    setTrack(
      setInterval(() => {
        console.warn(rows && rows.map((row) => row.squares[store.current]));
        dispatch({ type: "CURRENT" });
        dispatch({
          type: "TRIGGERSOUNDS",
          value: rows && rows.map((row) => row.squares[store.current]),
        });
      }, time || store.time)
    );
  };

  const clearGrid = () => {
    setRows(
      store.theme.sounds.map((sound: string) => {
        return {
          name: sound,
          squares: [...Array(store.beats)].map(() => 0),
        };
      })
    );
  };

  const updateGrid = (rowIndex: number, squareIndex: number) => {
    setRows((prev) => {
      const newRows = [...prev];
      newRows[rowIndex].squares[squareIndex] =
        newRows[rowIndex].squares[squareIndex] > 0 ? 0 : 1;
      console.log(newRows[rowIndex].squares[squareIndex]);
      return newRows;
    });
  };
  const updateTime = (time: number) => {
    console.log(Math.round(time));
    dispatch({ type: "TIME", value: Math.round(time) });
    if (track && play) {
      goToNextBeat(Math.round(time));
      clearInterval(track);
    }
  };
  const updateBeats = (qty: number) => {
    dispatch({ type: "BEATS", value: qty });
    setRows(
      rows?.map((row) => {
        if (row.squares.length > qty) {
          return {
            ...row,
            squares: row.squares.splice(0, qty),
          };
        } else if (row.squares.length < qty) {
          return {
            ...row,
            squares: row.squares.concat([...Array(qty)].map(() => 0)),
          };
        }
        return row;
      })
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
    clearGrid();
  }, []);
  return (
    <>
      <div>
        <button
          onClick={() => {
            setPlay(!play);
          }}
        >
          play
        </button>
        <button onClick={clearGrid}>clear grid</button>
      </div>
      <ThemeSwitcher onChangeTheme={themeUpdate}></ThemeSwitcher>
      <BeatInput changeBeatQty={updateBeats}></BeatInput>
      <BpmInput onTimeChange={updateTime}></BpmInput>
      <Sounds></Sounds>
      {rows && (
        <Grid rows={rows} onUpdateGrid={updateGrid} current={store.current} />
      )}
    </>
  );
}

export default App;
