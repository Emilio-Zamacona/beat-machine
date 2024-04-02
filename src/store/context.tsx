import { createContext, useReducer, Dispatch } from "react";
import { themes } from "../constants/config";
import initialState from "./initialstate";
import { IRow } from "../types";

const StoreContext = createContext<{
  store: any;
  dispatch: React.Dispatch<any>;
}>({ store: initialState, dispatch: () => null });

const storeReducer = (state, action) => {
  const resetGrid = () => {
    return state.theme.sounds.map((sound: string) => {
      return {
        name: sound,
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
        rows: resetGrid(),
      };
    }
    case "RESETGRID": {
      return {
        ...state,
        rows: resetGrid(),
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
