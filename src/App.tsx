import { useEffect, useReducer, useState } from "react";
import Grid from "./components/Grid/Grid";
import { IRow } from "./types";
import Sounds from "./components/Sounds/Sounds";
import BpmInput from "./components/BpmInput/BpmInput";

function App() {
  const [sounds, setSounds] = useState([
    "bongo",
    "clack",
    "hh",
    "kick",
    "kick2",
    "pot",
    "rim",
    "snap",
  ]);
  const [rows, setRows] = useState<IRow[]>(null);
  const [play, setPlay] = useState(false);
  const [track, setTrack] = useState(null);

  const beatReducer = (state, action) => {
    switch (action.type) {
      case "BEAT": {
        return {
          ...state,
          current: state.beats - 1 > state.current ? state.current + 1 : 0,
        };
      }
      case "SOUNDS": {
        return {
          ...state,
          sounds: rows.map((row) => row.squares[state.current]),
        };
      }
      case "TIME": {
        return {
          ...state,
          time: action.value,
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
  const goToNextBeat = () => {
    beatDispatch({ type: "SOUNDS" });
    beatDispatch({ type: "BEAT" });
  };

  const clearGrid = () => {
    setRows(
      sounds.map((sound) => {
        return {
          name: sound,
          squares: [...Array(beatState.beats)].map(() => 0),
        };
      })
    );
  };

  useEffect(() => {
    if (!beatState.beats || !sounds || rows) return;
    clearGrid();
  }, [beatState.beats, sounds, rows]);

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
  const timeChange = (time: number) => {
    console.log(Math.round(time));
    beatDispatch({ type: "TIME", value: Math.round(time) });
    console.warn(beatState.time);
    if (track && play) {
      console.warn("changing time");
      clearInterval(track);
      setTrack(setInterval(goToNextBeat, Math.round(time)));
    }
  };

  const start = () => {
    if (!track && play) {
      setTrack(setInterval(goToNextBeat, beatState.time));
    } else if (!play) {
      clearInterval(track);
      setTrack(null);
    }
  };
  useEffect(() => {
    start();
  }, [play]);
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
      <BpmInput onTimeChange={timeChange}></BpmInput>
      <Sounds sounds={sounds} trigger={beatState.sounds}></Sounds>
      {rows && <Grid rows={rows} onUpdateGrid={updateGrid} />}
    </>
  );
}

export default App;
