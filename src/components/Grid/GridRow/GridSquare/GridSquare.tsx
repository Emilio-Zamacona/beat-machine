interface IGridSquare{
    square: number;
    onUpdateSquare: ()=>void
}

const GridSquare = ({square,onUpdateSquare}:IGridSquare)=>{
    return(
        <button className={`grid__row__square ${square && 'grid__row__square--filled'}`} onClick={onUpdateSquare}>
        </button>
    )
}
export default GridSquare