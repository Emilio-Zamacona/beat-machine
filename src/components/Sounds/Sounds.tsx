import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../../store/context";

const Sounds = () => {
  const { store } = useContext(StoreContext);
  const trigger = store.sounds;
  const theme = store.theme;
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
    console.warn(trigger);
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
