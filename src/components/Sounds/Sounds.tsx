import { RefObject, createRef, useEffect, useRef } from "react";
import { ITheme } from "../../types";

interface ISounds {
  trigger: number[];
  theme: ITheme;
}
const Sounds = ({ theme, trigger }: ISounds) => {
  const audioRefs = useRef<any>(null);
  if (!audioRefs.current) {
    audioRefs.current = theme.sounds.map(
      (sound) => new Audio(`src/assets/sounds/${theme.name}/${sound}.mp3`)
    );
    console.log(audioRefs);
  }
  const test = (i: number) => {
    audioRefs.current[i].play();
  };
  const triggerSounds = () => {
    if (!audioRefs.current || !trigger) return;
    audioRefs.current.map((sound, i) => {
      if (trigger[i]) {
        sound.load();
        sound.play();
      }
    });
  };
  useEffect(() => {
    triggerSounds();
  }, [trigger]);
  return (
    <>
      {theme.sounds.map((sound, i) => (
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
