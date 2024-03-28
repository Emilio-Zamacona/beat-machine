import  GridSquare  from "./GridSquare/GridSquare"
import { IRow } from "../../../types"

interface IGridRow extends IRow{
    onUpdateRow: (s:number)=>void
}

const GridRow  = ({name,squares,onUpdateRow}:IGridRow)=>{

    return (
        <div className="grid__row">
            {squares.map((square,i) => <GridSquare key={i} square={square} onUpdateSquare={()=>{onUpdateRow(i)}}/>)}
        </div>
    )
}

export default GridRow