import { themes } from "../constants/config";
const initialState = {
  theme: {
    name: themes[0].name,
    sounds: themes[0].sounds,
    colors: themes[0].colors,
  },
  current: -1,
  time: 175,
  beats: 16,
  sounds: null,
};
export default initialState;
