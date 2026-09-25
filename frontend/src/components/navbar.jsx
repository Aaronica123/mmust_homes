import { useState } from "react"
import {BoxIcon, DoorClosed, ScanBarcode}from "lucide-react";
import { LogOut } from "lucide-react";
import { Avatar, Text } from "@radix-ui/themes";
import { X } from "lucide-react";
export default function NavBar({children}){
    const [nav,setnav]=useState(true);
    const handle_nav=()=>{
        setnav(!nav)
    }
return(
    <>
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"row",background:"white 60%"}}>
        <div
        onClick={handle_nav}     // click outside to close
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          background: "rgba(0,0,0,0.15)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)", // Safari
          opacity: nav ? 1 : 0,
          pointerEvents: nav ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      />
        
        <div style={{width:"fit-content",height:"100%",display:"flex",flexDirection:"column",padding:"5px",
          position: "absolute",       // ✅ out of flow — doesn't push content
          inset:0,
          zIndex: 10,                  // ✅ above blur
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          transform: nav ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 300ms ease",
        }}>
        <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"row"}}>
        <Avatar fallback="MN"></Avatar>
        <X onClick={handle_nav}></X>
        </div>
        <div style={{display:"flex",width:"100%",height:"fit-content",position:"sticky",
        justifyContent:"center",alignItems:"center"}}>
            <LogOut></LogOut>
        </div>
        </div>
        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:"5px"}}>
            <div style={{width:"100%",height:"fit-content",flexDirection:"row",display:"flex"}}>
                <DoorClosed onClick={handle_nav}></DoorClosed>
                <Text size={"5"} style={{fontFamily:"sans-serif"}}>Dashboard</Text>
            </div>
            <div style={{width:"100%",height:"100%"}}>
                {children}
            </div>
        </div>

    </div>
    </>
)
}