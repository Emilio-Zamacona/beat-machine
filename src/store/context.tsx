import { createContext, useReducer } from "react";
import { themes } from "../constants/config";
import initialState from "./initialstate";
import { IRow, ISound } from "../types";

const StoreContext = createContext<{
  store: any;
  dispatch: React.Dispatch<any>;
}>({ store: initialState, dispatch: () => null });

const storeReducer = (state, action) => {
  const resetGrid = (sounds: ISound[]) => {
    return sounds.map((sound: ISound) => {
      return {
        name: sound.name,
        squares: [...Array(state.beats)].map(() => 0),
      };
    });
  };

  switch (action.type) {
    case "CURRENT": {
      return {
        ...state,
        current: state.beats - 1 > state.current ? state.current + 1 : 0,
      };
    }
    case "TRIGGERSOUNDS": {
      return {
        ...state,
        sounds: action.value,
      };
    }
    case "BPM": {
      return {
        ...state,
        bpm: action.value,
      };
    }
    case "BEATS": {
      return {
        ...state,
        beats: action.value,
        rows: state.rows?.map((row: IRow) => {
          if (row.squares.length > action.value) {
            return {
              ...row,
              squares: row.squares.splice(0, action.value),
            };
          } else if (row.squares.length < action.value) {
            return {
              ...row,
              squares: row.squares.concat(
                [...Array(action.value)].map(() => 0)
              ),
            };
          }
          return row;
        }),
      };
    }
    case "THEME": {
      return {
        ...state,
        theme: {
          name: themes[action.value].name,
          sounds: themes[action.value].sounds,
          colors: themes[action.value].colors,
        },
        rows: resetGrid(themes[action.value].sounds),
        play: false,
        current: -1,
      };
    }
    case "RESETGRID": {
      return {
        ...state,
        rows: resetGrid(state.theme.sounds),
      };
    }
    case "UPDATEGRID": {
      const newRows = [...state.rows];
      newRows[action.value.row].squares[action.value.square] =
        newRows[action.value.row].squares[action.value.square] > 0 ? 0 : 1;
      return {
        ...state,
        rows: newRows,
      };
    }
    case "PLAY": {
      return {
        ...state,
        play: action.value,
        current: -1,
      };
    }
  }
};

const StoreProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
export { StoreContext, StoreProvider };
