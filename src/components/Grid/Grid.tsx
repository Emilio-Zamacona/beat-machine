import  GridRow  from "./GridRow/GridRow";

interface IGrid{
    sounds:string[]
    beats: number
}

const Grid = ({sounds,beats}:IGrid)=>{
    console.log('test')
    return(
        <div className="grid">
            {sounds.map(sound=><GridRow sound={sound} beats={beats}/>)}
        </div>
    )
}
export default Grid;