import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface IGridSquare {
  square: number;
  current: boolean;
  onUpdateSquare: () => void;
}

const GridSquare = ({ square, current, onUpdateSquare }: IGridSquare) => {
  const squareRef = useRef<HTMLButtonElement>(null);
  useGSAP(
    () => {
      if (square && current) {
        const tl = gsap.timeline().to(squareRef.current, {
          scale: 1.4,
          backgroundColor: "#aa3356",
          borderRadius: "50%",
          boxShadow: "0px 0px 10px black",
          duration: 0.3,
          delay: 0.3,
          onComplete: () => {
            tl.reverse();
          },
          onReverseComplete: () => {
            gsap.set(squareRef.current, { clearProps: "all" });
          },
        });
      }
    },
    { scope: squareRef, dependencies: [square, current] }
  );
  return (
    <button
      ref={squareRef}
      className={`grid__row__square ${square && "--filled"} ${
        current && "--current"
      }`}
      onMouseDown={onUpdateSquare}
    ></button>
  );
};
export default GridSquare;
