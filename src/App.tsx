import { useEffect, useReducer, useState } from "react";
import Grid from "./components/Grid/Grid";
import { IRow } from "./types";
import Sounds from "./components/Sounds/Sounds";
import BpmInput from "./components/BpmInput/BpmInput";
import BeatInput from "./components/BeatInput/BeatInput";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import { themes } from "./constants/config";

function App() {
  const [rows, setRows] = useState<IRow[]>();
  const [play, setPlay] = useState(false);
  const [track, setTrack] = useState<number | undefined>(0);

  const themeReducer = (state, action) => {
    switch (action.type) {
      case "SWITCH": {
        return {
          ...state,
          name: themes[action.value].name,
          sounds: themes[action.value].sounds,
          colors: themes[action.value].colors,
        };
      }
    }
  };

  const [themeState, themeDispatch] = useReducer(themeReducer, {
    name: themes[0].name,
    sounds: themes[0].sounds,
    colors: themes[0].colors,
  });
  const themeUpdate = (index: number) => {
    themeDispatch({ type: "SWITCH", value: index });
  };

  const beatReducer = (state, action) => {
    switch (action.type) {
      case "CURRENT": {
        return {
          ...state,
          current: state.beats - 1 > state.current ? state.current + 1 : 0,
        };
      }
      case "SOUNDS": {
        return {
          ...state,
          sounds: rows && rows.map((row) => row.squares[state.current]),
        };
      }
      case "TIME": {
        return {
          ...state,
          time: action.value,
        };
      }
      case "BEATS": {
        return {
          ...state,
          beats: action.value,
        };
      }
    }
  };

  const [beatState, beatDispatch] = useReducer(beatReducer, {
    current: -1,
    time: 175,
    beats: 16,
    sounds: null,
  });
  const goToNextBeat = (time?: number) => {
    clearInterval(track);
    setTrack(
      setInterval(() => {
        beatDispatch({ type: "SOUNDS" });
        beatDispatch({ type: "CURRENT" });
      }, time || beatState.time)
    );
  };

  const clearGrid = () => {
    setRows(
      themeState.sounds.map((sound: string) => {
        return {
          name: sound,
          squares: [...Array(beatState.beats)].map(() => 0),
        };
      })
    );
  };

  useEffect(() => {
    if (!beatState.beats || !themeState.sounds || rows) return;
    clearGrid();
  }, [beatState.beats, themeState.sounds, rows]);

  const updateGrid = (rowIndex: number, squareIndex: number) => {
    console.warn(rowIndex, squareIndex);
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
    beatDispatch({ type: "TIME", value: Math.round(time) });
    console.warn(beatState.time);
    if (track && play) {
      console.warn("changing time");
      goToNextBeat(Math.round(time));
      clearInterval(track);
    }
  };
  const updateBeats = (qty: number) => {
    beatDispatch({ type: "BEATS", value: qty });
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
    console.warn(themeState);
    clearGrid();
  }, [themeState]);
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
      <Sounds theme={themeState} trigger={beatState.sounds}></Sounds>
      {rows && (
        <Grid
          rows={rows}
          onUpdateGrid={updateGrid}
          current={beatState.current}
        />
      )}
    </>
  );
}

export default App;
