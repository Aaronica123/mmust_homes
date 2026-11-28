import { useState } from "react"
import axios_client from "../axios/axios";

export default function Register(){
    const[file,setfile]=useState(null);
    const [prj,setprj]=useState([])
     const [percent,setp]=useState({im1:0,im2:0,im3:0})
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
        <input onChange={change} type="file" required multiple/>
        <button onClick={upload} type="button">Upload</button>
        
        {prj.map((m,index)=>(
            <div>
            <img src={m}/>
            <p>{index==0?percent.im1:index==1?percent.im2:percent.im3}%</p>
            </div>
        ))}
        
        </>
    )
}