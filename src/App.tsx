import { useEffect, useReducer, useState } from "react";
import Grid from "./components/Grid/Grid";
import { IRow } from "./types";
import Sounds from "./components/Sounds/Sounds";

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
  const [time, setTime] = useState(175);
  const [beats, setBeats] = useState(32);
  const [rows, setRows] = useState<IRow[]>(null);
  const [play, setPlay] = useState(false);
  const [track, setTrack] = useState(null);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [triggerSounds, setTriggerSounds] = useState(null);

  const beatReducer = (state, action) => {
    switch (action.type) {
      case "BEAT": {
        return {
          ...state,
          current: beats - 1 > state.current ? state.current + 1 : 0,
        };
      }
      case "SOUNDS": {
        return {
          ...state,
          sounds: rows.map((row) => row.squares[state.current]),
        };
      }
    }
  };

  const [beatState, beatDispatch] = useReducer(beatReducer, {
    current: -1,
    sounds: null,
  });

  const goToNextBeat = () => {
    beatDispatch({ type: "SOUNDS" });
    beatDispatch({ type: "BEAT" });
  };

  useEffect(() => {
    console.warn(beatState);
  }, [beatState]);

  useEffect(() => {
    if (!beats || !sounds || rows) return;
    setRows(
      sounds.map((sound) => {
        return {
          name: sound,
          squares: [...Array(beats)].map(() => 0),
        };
      })
    );
  }, [beats, sounds, rows]);

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
  const start = () => {
    if (!track && play) {
      setTrack(setInterval(goToNextBeat, time));
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
      </div>
      <Sounds sounds={sounds} trigger={beatState.sounds}></Sounds>
      {rows && <Grid rows={rows} onUpdateGrid={updateGrid} />}
    </>
  );
}

export default App;
