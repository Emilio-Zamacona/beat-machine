import { themes } from "../constants/config";
const beats = 16;
const initialState = {
  theme: {
    name: themes[0].name,
    sounds: themes[0].sounds,
    colors: themes[0].colors,
  },
  play: false,
  current: -1,
  time: 175,
  beats: beats,
  sounds: null,
  rows: themes[0].sounds.map((sound: string) => {
    return {
      name: sound,
      squares: [...Array(beats)].map(() => 0),
    };
  }),
};
export default initialState;
