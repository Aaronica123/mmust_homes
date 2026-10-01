import { useEffect, useRef } from "react";
import Cardimage from "../components/cards";
import { useState } from "react";
import { Card, Spinner, Table } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import axios_client from "../axios/axios";
import { Button } from "@radix-ui/themes";
import { Skeleton } from "@radix-ui/themes";
import Navigate_map from "./navigate";
import { setOptions,importLibrary } from "@googlemaps/js-api-loader";

setOptions({
    key:import.meta.env.VITE_GOOGLE_KEY,
    v:"weekly"
})
function Home(){
    const[loading,setloading]=useState(true);
    const [value,setvalue]=useState([]);
    const[crd,setcrd]=useState({lat:"",long:""})
    const[home,sethome]=useState({});
    const[track,settrack]=useState(false);
    const parentref=useRef(null);
    const refmap=useRef(null);
    const mark=useRef(null);
    const mark1=useRef(null);
    const directService=useRef(null);
    const directrend=useRef(null);
    const fetch=async()=>{

        const data=await axios_client('/api/get_all?index=1');
        console.log(data.data.data);
        const rows=data.data.data.map((value)=>Object.values(value));
        setvalue(rows);
        console.log(rows);
        setloading(false);
        navigator.geolocation.getCurrentPosition((async(value)=>{
                setcrd({lat:value.coords.latitude,long:value.coords.longitude})
            }))
    }
    useEffect(()=>{
        fetch();
    },[])
    useEffect(()=>{
        if(loading){
            return;
        }
        if(refmap.current){
            return;
        }
        const ch=async()=>{
        const{Map}=await importLibrary("maps")
        const{DirectionsService,DirectionsRenderer}=await importLibrary("routes")
        refmap.current=new Map(parentref.current,{
        center:{lat:Number(crd.lat),lng:Number(crd.long)},zoom:12
        })
        console.log(Number(crd.lat),Number(crd.long))
        directService.current=new DirectionsService();
        directrend.current=new DirectionsRenderer({
            map:refmap.current,
            suppressMarkers:true
        });
        }
        
    
        ch();
    return ()=>{
        refmap.current=null
    }
    },[loading,crd])
    const ma=()=>{
        if(mark.current){
            mark.current.setPosition({lat:Number(crd.lat),lng:Number(crd.long)})
            refmap.current.panTo({lat:Number(crd.lat),lng:Number(crd.long)})
        }
        else{
            mark.current=new window.google.maps.Marker({
                position:{lat:Number(crd.lat),lng:Number(crd.long)},
                map:refmap.current,
                title:"Locate"
            })
            refmap.current.panTo({lat:Number(crd.lat),lng:Number(crd.long)})
        }
        const path={
            origin:{lat:Number(crd.lat),lng:Number(crd.long)},
            destination:home,
            travelMode:window.google.maps.TravelMode.WALKING
        }
        directService.current.route(path,(result,status)=>{
            if(status=="OK"){
                console.log("Success")
                directrend.current.setDirections(result)
            }
            else{
                console.log("error occured")
            }
        })
    }
    function dest(value){
        const dir={
            lat:Number(value.lat),
            lng:Number(value.long)
        }
        sethome(dir);
        if(mark1.current){
            mark1.current.setPosition(dir);
        }else{
            mark1.current=new window.google.maps.Marker({
                position:dir,
                label:"Destination marker",
                map:refmap.current
            })
        }
        
    }
    if(loading){
    return(
    <div>
            <Skeleton>
                <Card size={"5"}></Card>
            </Skeleton>
    </div>
    )
}else{
        return(
    <>
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column"}}>
    <div  style={{position:"absolute",width:"100%",height:"100%",backdropFilter:"blur(6px)",zIndex:2,inset:0,background:"rgba(0,0,0,0.15)",
        pointerEvents:track?"auto":"none",opacity:track?1:0
    }}>
        <div ref={parentref} style={{zIndex:3,justifyContent:"center",alignContent:"center",width:"80%",height:"80%"}}>
            
        </div>
        <Button onClick={ma} style={{zIndex:3}}>Current
        </Button>
        <Button onClick={()=>settrack(false)} variant="outline" color="bronze">Exit</Button>
    </div>
    <div>
        <button onClick={()=>settrack(!track)}>blur</button>
        <Text>Values are</Text>
    </div>
    <div style={{width:"80%",height:"100%",gap:"10px",display:"flex",flexDirection:"column",overflow:"visible"}}>
       
            {value.map((data,index)=>((
                <Cardimage key={index} clk={(value)=>{settrack(!track),dest(value)}} text={data} ></Cardimage>
            )))}
    </div>
    
    
    </div>

    </>
)
    }
}
export default Home;