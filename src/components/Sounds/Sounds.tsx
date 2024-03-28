import { RefObject, createRef, useEffect, useRef } from "react"

interface ISounds {
    sounds:string[]
}
const Sounds = ({sounds}:ISounds)=>{
    const audioRefs = useRef<any>(sounds.map(()=>createRef())) 

    useEffect(()=>{
        console.log(sounds)
    })
    const test = (i:number)=>{
        audioRefs.current[i].current.play()
    }
    return(
        <>
        {sounds.map((sound,i)=>
        <button onClick={()=>{test(i)}} key={sound}>
            <p>{sound}</p>
            <audio ref={audioRefs.current[i]} key={sound} src={`src/assets/sounds/${sound}.mp3`}></audio>
        </button>)}
        </>
    )

}
export default Sounds