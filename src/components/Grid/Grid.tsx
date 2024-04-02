import GridRow from "./GridRow/GridRow";
import { IRow } from "../../types";
import { useStore } from "../../store/hooks";

const Grid = () => {
  const { store, dispatch } = useStore();
  const { rows } = store;
  const onUpdateRow = (rowIndex: number, squareIndex: number) => {
    dispatch({
      type: "UPDATEGRID",
      value: { row: rowIndex, square: squareIndex },
    });
  };
  return (
    <div className="grid">
      {rows.map((row: IRow, i: number) => (
        <GridRow
          rowIndex={i}
          key={i}
          name={row.name}
          squares={row.squares}
          onUpdateRow={(s) => {
            onUpdateRow(i, s);
          }}
        />
      ))}
    </div>
  );
};
export default Grid;
