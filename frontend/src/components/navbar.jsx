import { useState } from "react"
import {BoxIcon, DoorClosed, ScanBarcode}from "lucide-react";
export default function NavBar({children}){
    const [nav,setnav]=useState(true);
    const handle_nav=()=>{
        setnav(!nav)
    }
return(
    <>
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"row",background:"white 60%"}}>
        {nav?
        <div style={{width:"fit-content",height:"100%",display:"column"}}>
        <ScanBarcode onClick={handle_nav}></ScanBarcode>
        <div style={{}}></div>
        </div>:""
}
        <div style={{width:"100%",height:"100%",flexDirection:"row"}}>
            <div style={{width:"100%",height:"fit-content"}}>
                <DoorClosed onClick={handle_nav}></DoorClosed>
                <p>Dashboard trial</p>
            </div>
            <div style={{width:"100%",height:"100%"}}>
                {children}
            </div>
        </div>

    </div>
    </>
)
}