import { useEffect, useState } from 'react'
import Grid from './components/Grid/Grid'
import { IRow } from './types';
import Sounds from './components/Sounds/Sounds';

function App() {
  const [sounds,setSounds] = useState([ 'bongo','clack','hh','kick','kick2','pot','rim','snap'])
  const [time, setTime] = useState(500)
  const [beats, setBeats] = useState(16)
  const [rows, setRows] = useState<IRow[]>(null)
  const [play, setPlay]= useState(false)
  const [track, setTrack] =useState(null)
  useEffect(()=>{
    if (!beats || !sounds || rows)return;
    setRows(sounds.map(sound=>{return{
      name:sound,
      squares: [...Array(beats)].map(()=>0)
    }}))
  },[beats,sounds,rows])

  const updateGrid =(rowIndex:number,squareIndex:number)=>{
    console.warn(rowIndex,squareIndex)
    setRows((prev)=>{
      const newRows = [...prev]
      newRows[rowIndex].squares[squareIndex] = newRows[rowIndex].squares[squareIndex]>0 ? 0 : 1  
      console.log(newRows[rowIndex].squares[squareIndex])
      return newRows
    })
  }
  const start =()=>{
    /* setTrack(setInterval(()=>{console.warn("test")},time))
    if (!play) clearInterval(track) */
  }
  useEffect(()=>{
    if(!play)return;
    start()
  },[play])
  return (
    <>
    <div>
    <button onClick={()=>{setPlay(!play)}}>play</button>
    </div>
    <Sounds sounds={sounds}></Sounds>
    {rows &&
      <Grid rows={rows} onUpdateGrid={updateGrid}/>
    }
    </>
  )
}

export default App
