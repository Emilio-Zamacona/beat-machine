import { RefObject, createRef, useEffect, useRef } from "react";

interface ISounds {
  sounds: string[];
  trigger: number[];
}
const Sounds = ({ sounds, trigger }: ISounds) => {
  const audioRefs = useRef<any>(sounds.map(() => createRef()));
  const test = (i: number) => {
    audioRefs.current[i].current.play();
  };
  const triggerSounds = () => {
    if (!audioRefs.current || !trigger) return;
    audioRefs.current.map((sound, i) => {
      if (trigger[i]) {
        sound.current.load();
        sound.current.play();
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
          <audio
            ref={audioRefs.current[i]}
            key={sound}
            src={`src/assets/sounds/${sound}.mp3`}
          ></audio>
        </button>
      ))}
    </>
  );
};
export default Sounds;
