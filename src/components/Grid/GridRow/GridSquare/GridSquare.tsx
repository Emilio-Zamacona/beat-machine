import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStore } from "../../../../store/hooks";
import { IColor } from "../../../../types";

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
  const squareRef = useRef<HTMLLIElement>(null);
  const { store } = useStore();
  const { theme, current } = store;
  const isCurrent = () => {
    return current === squareIndex;
  };
  const { contextSafe } = useGSAP({ scope: squareRef });
  const onPlay = contextSafe(() => {
    if (square && isCurrent()) {
      const tl = gsap.timeline().to(squareRef.current, {
        scale: 1.1,
        backgroundColor: theme.sounds[rowIndex].color || theme.colors[0].value,
        boxShadow: `0px 0px 15px ${
          theme.colors.find((e: IColor) => e.name === "progress").value
        }`,
        rotate: "10deg",
        duration: 0.3,
        onComplete: () => {
          tl.reverse();
        },
        onReverseComplete: () => {
          gsap.set(squareRef.current, { clearProps: "all" });
        },
      });
      gsap
        .timeline()
        .to(squareRef.current, {
          rotate: "5deg",
          duration: 0.1,
        })
        .to(squareRef.current, {
          rotate: "-5deg",
          duration: 0.1,
        })
        .to(squareRef.current, {
          rotate: "0deg",
          duration: 0.1,
        });
    }
  });
  const onSquareHover = (hover: boolean) =>
    contextSafe(() => {
      if (hover) {
        gsap.timeline().to(".gradient", {
          backgroundColor: "rgba(255,255,255,0.3)",
          duration: 0.2,
        });
      } else {
        gsap.timeline().to(".gradient", {
          backgroundColor: "rgba(255,255,255,0)",
          duration: 0.2,

          onComplete: () => {
            gsap.set(".gradient", { clearProps: "all" });
          },
        });
      }
    })();

  const onSquareChecked = contextSafe(() => {
    if (!square) {
      gsap
        .timeline()
        .from(".gradient", {
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 0%)",
          duration: 0.5,
        })
        .to(".gradient", {
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0) 25%, rgba(0,0,0,0) 50%)",
          onReverseComplete: () => {
            gsap.set(".gradient", { clearProps: "all" });
          },
        });
    }
  });
  useEffect(() => {
    onPlay();
  }, [square, isCurrent()]);
  return (
    <li
      ref={squareRef}
      className={`grid__row__square ${square && "--filled"} ${
        isCurrent() && "--current"
      }`}
      onMouseEnter={() => onSquareHover(true)}
      onMouseLeave={() => onSquareHover(false)}
    >
      <div
        className="button"
        onMouseDown={() => {
          onUpdateSquare();
          onSquareChecked();
        }}
      >
        <div className="gradient"></div>
      </div>
    </li>
  );
};
export default GridSquare;
