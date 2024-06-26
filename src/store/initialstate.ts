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
  bpm: 70,
  beats: beats,
  sounds: null,
  size: 0,
  rows: themes[0].sounds.map(
    (sound: { name: string; color: string | boolean }) => {
      return {
        name: sound.name,
        color: sound.color || themes[0].colors[0].value,
        squares: [...Array(beats)].map(() => 0),
      };
    }
  ),
};
export default initialState;
