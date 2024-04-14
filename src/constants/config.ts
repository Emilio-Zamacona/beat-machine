export const minBpm = 50;
export const maxBpm = 200;
export const beatLengths = [16, 32];
export const themes = [
  {
    name: "digital",
    sounds: [
      { name: "clap", color: "red" },
      { name: "clave", color: "blue" },
      { name: "hihat", color: "yellow" },
      { name: "hihat2", color: "green" },
      { name: "kick", color: "#1098F7" },
      { name: "snare", color: "red" },
      { name: "wood", color: "#1098F7" },
    ],
    colors: [
      { name: "filled", value: "#16F4D0" },
      { name: "empty", value: "#080708" },
      { name: "border", value: "#ffffff55" },
      { name: "background", value: "#ccc" },
      { name: "progress", value: "#F2F230" },
    ],
  },
  {
    name: "acoustic",
    sounds: [
      { name: "hat1", color: "yellow" },
      { name: "hat2", color: "yellow" },
      { name: "hat3", color: "yellow" },
      { name: "hatopen", color: "yellow" },
      { name: "crash", color: "orange" },
      { name: "splash", color: "orange" },
      { name: "kick", color: "blue" },
      { name: "rimshot", color: "red" },
      { name: "snare", color: "red" },
      { name: "tambourine", color: "#dd00000" },
      { name: "snap", color: "pink" },
    ],
    colors: [
      { name: "filled", value: "#F5CB5C" },
      { name: "empty", value: "#333533" },
      { name: "border", value: "#00000055" },
      { name: "background", value: "#ffffff" },
      { name: "progress", value: "#E8EDDF" },
    ],
  },
  {
    name: "wood",
    sounds: [
      { name: "bells", color: "yellow" },
      { name: "block", color: "yellow" },
      { name: "bongo", color: "yellow" },
      { name: "click", color: "yellow" },
      { name: "drum1", color: "orange" },
      { name: "drum2", color: "orange" },
      { name: "knock", color: "blue" },
      { name: "shaker", color: "red" },
      { name: "shaker2", color: "red" },
    ],
    colors: [
      { name: "filled", value: "#5f2301" },
      { name: "empty", value: "#ffddca" },
      { name: "border", value: "#00000055" },
      { name: "background", value: "#ffffff" },
      { name: "progress", value: "#BF4E30" },
    ],
  },
];
