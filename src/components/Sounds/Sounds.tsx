import { RefObject, createRef, useEffect, useRef } from "react";

interface ISounds {
  sounds: string[];
  trigger: number[];
}
const Sounds = ({ sounds, trigger }: ISounds) => {
  const audioRefs = useRef<any>(null);
  if (!audioRefs.current) {
    audioRefs.current = sounds.map(
      (sound) => new Audio(`src/assets/sounds/${sound}.mp3`)
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
      {sounds.map((sound, i) => (
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
