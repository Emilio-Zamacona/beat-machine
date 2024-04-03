import GridSquare from "./GridSquare/GridSquare";
import { IRow } from "../../../types";

interface IGridRow extends IRow {
  rowIndex: number;
  onUpdateRow: (s: number) => void;
}

const GridRow = ({ name, squares, rowIndex, onUpdateRow }: IGridRow) => {
  return (
    <div className="grid__row">
      {/* <div className="grid__row__label">{name.toUpperCase()}</div> */}
      {squares.map((square, i) => (
        <GridSquare
          key={i}
          rowIndex={rowIndex}
          squareIndex={i}
          square={square}
          onUpdateSquare={() => {
            onUpdateRow(i);
          }}
        />
      ))}
    </div>
  );
};

export default GridRow;
