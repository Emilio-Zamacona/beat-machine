export const minBpm = 50;
export const maxBpm = 200;
export const themes = [
  {
    name: "normal",
    sounds: [
      { name: "bongo", color: "red" },
      { name: "clack", color: "blue" },
      { name: "hh", color: "yellow" },
      { name: "kick", color: "green" },
      { name: "kick2", color: "violet" },
      { name: "pot", color: "black" },
      { name: "rim", color: "pink" },
      { name: "snap", color: false },
    ],
    colors: [
      { name: "filled", value: "#220a78" },
      { name: "empty", value: "#ffffff" },
      { name: "border", value: "#220a78" },
      { name: "background", value: "#ffffff" },
      { name: "progress", value: "#0000ff" },
    ],
  },
  {
    name: "other",
    sounds: [
      { name: "clap", color: "red" },
      { name: "clave", color: "blue" },
      { name: "hihat", color: "yellow" },
      { name: "hihat2", color: "green" },
      { name: "kick", color: "violet" },
      { name: "snare", color: "brown" },
      { name: "wood", color: "pink" },
    ],
    colors: [
      { name: "filled", value: "#22ff78" },
      { name: "empty", value: "#000000" },
      { name: "border", value: "#22ff78" },
      { name: "background", value: "#ffffff" },
      { name: "progress", value: "#ff00ff" },
    ],
  },
];
