import GridSquare from "./GridSquare/GridSquare";
import { IRow } from "../../../types";

interface IGridRow extends IRow {
  current: number;
  onUpdateRow: (s: number) => void;
}

const GridRow = ({ name, squares, current, onUpdateRow }: IGridRow) => {
  return (
    <div className="grid__row">
      <div className="grid__row__label">{name}</div>
      {squares.map((square, i) => (
        <GridSquare
          key={i}
          square={square}
          current={current === i}
          onUpdateSquare={() => {
            onUpdateRow(i);
          }}
        />
      ))}
    </div>
  );
};

export default GridRow;
