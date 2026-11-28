import { useState } from "react"
import axios_client from "../axios/axios";
import {Checkbox, CheckboxCards} from "@radix-ui/themes"
import profile from "../forms/images/profile.png"
import { Eye, EyeClosed, House, IdCard, Lock, Mail, User } from "lucide-react";
import { Avatar,Text } from "@radix-ui/themes";
export default function Register(){
    const[file,setfile]=useState(null);
    const [prj,setprj]=useState([])
    const [percent,setp]=useState({im1:0,im2:0,im3:0})
    const [services,setservices]=useState({wifi:false,security:false,water:false,discount:false,accessibility:false});
    const[item,setitem]=useState({name:"",type:"",available:""})
    const[location,setlocation]=useState({city:"",town:""})
    const[coordinates,setcoordinates]=useState({lat:"",long:""})
    const item_change=(e)=>{
        const {name,value}=e.target
        setitem((data)=>({
            ...data,
            [name]:value
        }))
        console.log(item)
    }
    const services_change=(e)=>{
        const{name,checked}=e.target;
        setservices((data)=>({
            ...data,
            [name]:checked
        }))
        console.log(services)
    }
    const change=(e)=>{
        
        const value=e.target.files;
        setfile(value)
        const ay=[]
        for(var val=0;val<value.length;val++){
            ay.push(URL.createObjectURL(value[val]));

        }
        setprj(ay);
    }
    const upload=async()=>{
        const f=new FormData();
        for(var x=0; x<file?.length;x++){
            f.append("mmustimages",file[x])
        }
        console.log(file)
        const data=await axios_client.post('/api/upload_house',f);
        for(var x1=0;x1<data.data.path.length;x1++){
            await uploadWithProgress(data.data.path[x1],file[x1],setp,x1).then(()=>{
                if(x1==0){
                     setp((data)=>({...data,im1:0}))
                }else if(x1==1){
                     setp((data)=>({...data,im2:0}))
                }else if(x1==2){
                     setp((data)=>({...data,im3:0}))
                }
                prj.forEach((v)=>{
                    URL.revokeObjectURL(v);
                })
            })
        }
        if(data.status==200){
            
            console.log(data.data);
            return;
        }else{
            alert("an error occured");
            console.log(data.data);
            return;
        }
    }
   
    const uploadWithProgress = (uploadUrl, file, setp,index) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

       
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percent = (e.loaded / e.total) * 100
                if(index==0){
                    setp((data)=>({...data,im1:percent}))}
                else if(index==1){

                    setp((data)=>({...data,im2:percent}))}
                else if(index==2){
                    setp((data)=>({...data,im3:percent}))}
            }
        })
        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response)
            else reject(new Error(`Upload failed: ${xhr.status}`))
        })
        xhr.addEventListener('error', () => reject(new Error('Network error')))

        xhr.open('PUT', uploadUrl)
        xhr.setRequestHeader('Content-Type', file.type)
        xhr.send(file)
    })
}
    return(
        <>
        <div style={{width:"100%",display:"flex",flexDirection:"column",height:"100%",background:"#F7F5F0"}}>
        <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"row",padding:"15px",
                background:"#FFFFFF",justifyContent:"center",alignItems:"center"}}>
                <div style={{width:"100%",height:"100%",display:"flex",gap:"5px",alignItems:"center"}}>
                <div style={{display:"flex",width:"fit-content",height:"fit-content",padding:'5px',background:"#2B3437",borderRadius:"10px"}}
                ><House size={"30"} color="#ffffff"></House>    
                </div>
                <Text size={"6"} weight={"medium"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                    Mmust Homes
                </Text>
                </div>
                <div style={{width:"fit-content",height:"100%",display:"flex",alignItems:"center"}}>
                <Avatar size={"3"} variant="soft" src={profile} radius="full"></Avatar>
                </div>
        </div>
       <div>
        <p>House Name</p>
        <input type="text" onChange={item_change} placeholder="Enter house name" value={item.name} name="name" required/>
        <p>Available Rooms</p>
        <input type="number" onChange={item_change} value={item.available} placeholder="Enter rooms available" name="available" required/>
        <p>Choose house type</p>
        <select name="type" onChange={item_change}>
            <option value={""}>Choose type of house</option>
            <option value={"single"}>Single</option>
            <option value={"bedsitter"}>Bedsitter</option>
            <option value={"1Bedroom"}>1 Bedroom</option>
            <option value={"2Bedroom"}>2 Bedroom</option>
            <option value={"apartment"}>Apartment</option>
        </select>
       </div>
        <div>
        <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
        <input type="checkbox" name="wifi" onChange={services_change} checked={services.wifi}/>
        <p>available wifi</p>
        </div>
        <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
        
        <input type="checkbox" name="water" onChange={services_change} checked={services.water}/>
        <p>24/7 water supply</p>
        </div>

        <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
        
        <input type="checkbox" name="security" onChange={services_change} checked={services.security}/>
        <p>assured security</p>
        </div>
        <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
        
        <input type="checkbox" name="accessibility" onChange={services_change} checked={services.accessibility}/>
        <p>ease accessibility</p>
        </div>
       <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
        
        <input type="checkbox" name="discount" onChange={services_change} checked={services.discount}/>
        <p>rent discount</p>
        </div>
        </div>
        <input onChange={change} type="file" required multiple/>
        <button onClick={upload} type="button">Upload</button>
        
        {prj.map((m,index)=>(
            <div>
            <img src={m}/>
            <p>{index==0?percent.im1:index==1?percent.im2:percent.im3}%</p>
            </div>
        ))}
        </div>
        </>
    )
}
