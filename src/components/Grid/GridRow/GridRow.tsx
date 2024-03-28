import  GridSquare  from "./GridSquare/GridSquare"

interface IGridRow{
    sound:string
    beats:number
}

const GridRow  = ({sound, beats}:IGridRow)=>{
    console.log('row', sound)
    return (
        <div className="grid__row">
            {[...Array(beats)].map(() => <GridSquare/>)}
        </div>
    )
}

export default GridRow