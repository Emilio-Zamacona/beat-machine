import GridSquare from "./GridSquare/GridSquare";
import { IRow } from "../../../types";
import { useStore } from "../../../store/hooks";

interface IGridRow extends IRow {
  onUpdateRow: (s: number) => void;
}

const GridRow = ({ name, squares, onUpdateRow }: IGridRow) => {
  const { store } = useStore();

  return (
    <div className="grid__row">
      <div className="grid__row__label">{name}</div>
      {squares.map((square, i) => (
        <GridSquare
          key={i}
          square={square}
          current={store.current === i}
          onUpdateSquare={() => {
            onUpdateRow(i);
          }}
        />
      ))}
    </div>
  );
};

export default GridRow;
