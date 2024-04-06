import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../../../store/hooks';

interface IGridSquare {
  square: number;
  rowIndex: number;
  squareIndex: number;
  onUpdateSquare: () => void;
}

const GridSquare = ({ square, rowIndex, squareIndex, onUpdateSquare }: IGridSquare) => {
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
        scale: 1.4,
        backgroundColor: theme.sounds[rowIndex].color || theme.colors[0].value,
        borderRadius: '50%',
        boxShadow: '0px 0px 10px black',
        duration: 0.3,
        onComplete: () => {
          tl.reverse();
        },
        onReverseComplete: () => {
          gsap.set(squareRef.current, { clearProps: 'all' });
        },
      });
    }
  });
  const onSquareChecked = contextSafe(() => {
    const tl = gsap
      .timeline()
      .from('gradient', {
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 0%)',
        duration: 1,
      })
      .to('.gradient', {
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(0,0,0,0) 10%)',
        /* backgroundColor: 'red', */
        onComplete: () => {
          console.warn('check');
          /* tl.reverse(); */
        },
        onReverseComplete: () => {
          gsap.set('.gradient', { clearProps: 'all' });
        },
      });
  });
  useEffect(() => {
    onPlay();
  }, [square, isCurrent()]);
  return (
    <li ref={squareRef} className={`grid__row__square ${square && '--filled'} ${isCurrent() && '--current'}`}>
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
