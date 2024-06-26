import { useEffect, useRef } from "react";
import { IRow, ISound } from "../../types";
import { useStore } from "../../store/hooks";

const Sounds = () => {
  const {
    store: { theme, current, rows },
  } = useStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioRefs = useRef<any>(null);
  const loadAudio = () => {
    audioRefs.current = theme.sounds.map(
      (sound: ISound) => new Audio(`sounds/${theme.name}/${sound.name}.mp3`)
    );
  };
  if (!audioRefs.current) {
    loadAudio();
  }

  const currentSounds = () => {
    return rows.map((row: IRow) => row.squares[current]);
  };
  const triggerSounds = () => {
    if (!audioRefs.current) return;
    audioRefs.current.map((sound: HTMLAudioElement, i: number) => {
      if (currentSounds()[i]) {
        sound.load();
        sound.play();
      }
    });
  };
  useEffect(() => {
    triggerSounds();
  }, [current]);
  useEffect(() => {
    loadAudio();
  }, [theme]);
  return <></>;
};
export default Sounds;
