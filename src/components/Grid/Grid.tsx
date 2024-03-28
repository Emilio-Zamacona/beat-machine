import  GridRow  from "./GridRow/GridRow";
import { IRow } from "../../types";

interface IRows {
    rows:IRow[]
    onUpdateGrid: (rowIndex:number,squareIndex:number)=>void
}

const Grid = ({rows,onUpdateGrid}:IRows)=>{

    const onUpdateRow = (rowIndex:number,squareIndex:number)=>{
        onUpdateGrid(rowIndex,squareIndex)
    }
    return(
        <div className="grid">
            {rows.map((row,i)=><GridRow key={i} name={row.name} squares={row.squares} onUpdateRow={(s)=>{onUpdateRow(i,s)}}/>)}
        </div>
    )
}
export default Grid;