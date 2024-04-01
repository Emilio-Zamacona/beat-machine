import { createContext, useReducer, Dispatch } from "react";
import { themes } from "../constants/config";
import initialState from "./initialstate";

const StoreContext = createContext<{
  store: any;
  dispatch: React.Dispatch<any>;
}>({ store: initialState, dispatch: () => null });

const storeReducer = (state, action) => {
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
      };
    }
    case "SWITCH": {
      return {
        ...state,
        theme: {
          name: themes[action.value].name,
          sounds: themes[action.value].sounds,
          colors: themes[action.value].colors,
        },
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
