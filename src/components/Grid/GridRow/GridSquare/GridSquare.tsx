import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStore } from "../../../../store/hooks";

interface IGridSquare {
  square: number;
  rowIndex: number;
  squareIndex: number;
  onUpdateSquare: () => void;
}

const GridSquare = ({
  square,
  rowIndex,
  squareIndex,
  onUpdateSquare,
}: IGridSquare) => {
  const squareRef = useRef<HTMLButtonElement>(null);
  const { store } = useStore();
  const { theme, current } = store;
  const isCurrent = () => {
    return current === squareIndex;
  };
  useGSAP(
    () => {
      if (square && isCurrent()) {
        const tl = gsap.timeline().to(squareRef.current, {
          scale: 1.4,
          backgroundColor:
            theme.sounds[rowIndex].color || theme.colors.squareActive,
          borderRadius: "50%",
          boxShadow: "0px 0px 10px black",
          duration: 0.3,
          onComplete: () => {
            tl.reverse();
          },
          onReverseComplete: () => {
            gsap.set(squareRef.current, { clearProps: "all" });
          },
        });
      }
    },
    { scope: squareRef, dependencies: [square, isCurrent()] }
  );
  return (
    <button
      ref={squareRef}
      className={`grid__row__square ${square && "--filled"} ${
        isCurrent() && "--current"
      }`}
      onMouseDown={onUpdateSquare}
    ></button>
  );
};
export default GridSquare;
