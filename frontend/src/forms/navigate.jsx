import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { useRef } from "react";
import { useEffect } from "react";

setOptions({
    key:import.meta.env.VITE_GOOGLE_KEY,
    v:"weekly"
})
export default function Navigate_map({values}){
const parentmap=useRef(null);
const refparent=useRef(null);
    useEffect(()=>{
        if(refparent.current){
            return;
        }
        const v=async()=>{
        const {Map}=await importLibrary ("maps")
        refparent.current=new Map(parentmap.current,{
            center:{ lat:Number(values.lat), lng: Number(values.long) },
            zoom:12
        })
        }
        v()
        return ()=>{
            refparent.current=null
        }
    },[])
    return(<>
     <div style={{width:"100vw",height:"100vh"}}>
    <div ref={parentmap} style={{width:"100%",height:"100%"}}>
    </div>
   </div>
    </>)
}