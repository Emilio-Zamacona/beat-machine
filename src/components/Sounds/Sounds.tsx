import { useEffect, useRef } from "react";
import { IRow } from "../../types";
import { useStore } from "../../store/hooks";

const Sounds = () => {
  const {
    store: { theme, current, rows },
  } = useStore();
  const audioRefs = useRef<any>(null);
  if (!audioRefs.current) {
    audioRefs.current = theme.sounds.map(
      (sound: string) =>
        new Audio(`src/assets/sounds/${theme.name}/${sound}.mp3`)
    );
    console.log(audioRefs);
  }
  const test = (i: number) => {
    audioRefs.current[i].play();
  };
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
  return (
    <>
      {theme.sounds.map((sound: string, i: number) => (
        <button
          onClick={() => {
            test(i);
          }}
          key={sound}
        >
          <p>{sound}</p>
        </button>
      ))}
    </>
  );
};
export default Sounds;
