import GridRow from "./GridRow/GridRow";
import { IRow } from "../../types";

interface IRows {
  rows: IRow[];
  current: number;
  onUpdateGrid: (rowIndex: number, squareIndex: number) => void;
}

const Grid = ({ rows, current, onUpdateGrid }: IRows) => {
  const onUpdateRow = (rowIndex: number, squareIndex: number) => {
    onUpdateGrid(rowIndex, squareIndex);
  };
  return (
    <div className="grid">
      {rows.map((row, i) => (
        <GridRow
          key={i}
          name={row.name}
          squares={row.squares}
          current={current}
          onUpdateRow={(s) => {
            onUpdateRow(i, s);
          }}
        />
      ))}
    </div>
  );
};
export default Grid;
