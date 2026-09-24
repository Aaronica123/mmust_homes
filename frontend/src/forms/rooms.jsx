import { useEffect } from "react";
import Cardimage from "../components/cards";
import { useState } from "react";
import { Spinner, Table } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import axios_client from "../axios/axios";
import Button from "../components/button";
function Home(){
    const[loading,setloading]=useState(true);
    const [value,setvalue]=useState([]);

    const fetch=async()=>{

        const data=await axios_client('/api/get_all?index=1');
        console.log(data.data.data);
        const rows=data.data.data.map((value)=>Object.values(value));
        setvalue(rows);
        setloading(false);
    }
    useEffect(()=>{
        fetch();
    },[])
    if(loading){
    return(
    <div>
            <Spinner></Spinner>
    </div>
    )
}else{
        return(
    <>
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column"}}>
    <div>
        <Text>Values are</Text>
    </div>
    <div style={{width:"80%",height:"100%",gap:"10px",display:"flex",flexDirection:"column",overflow:"visible"}}>
       
            {value.map((data,index)=>((
                <Cardimage key={index} text={data}></Cardimage>
            )))}
    </div>
    
    </div>
    </>
)
    }
}
export default Home;