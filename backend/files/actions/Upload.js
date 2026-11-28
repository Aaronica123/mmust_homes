import min_client from "../minio.js";
import Auth from "../auth/auth.js";
import fs from "fs";
export default async function UploadImage(req,res){
    try{
    const files=req.files;
    const count=files.length;
    const url=[]
    var state=true;
    console.log(files)
    for(var x=0;x<count;x++){
        if(files[x].mimetype=="image/jpg"||files[x].mimetype=="image/jpeg"||files[x].mimetype=="image/png"||files[x].mimetype=="image/webp"){
            state=false;
            
        }
    }
    if(state){
        return res.status(409).json({message:"Wrong image types"})
    }
    const {data}=await Auth(req);
    console.log(data);
    const result=await min_client.bucketExists("mmustimages");
        if(!result){
            await min_client.makeBucket("mmustimages").then(()=>console.log("Bucket has been created"));
        }else{
            console.log("bucket already exists");
        }
     var tr=0;
      const v=async()=>{
        const date=new Date().toLocaleTimeString('en-Us',{second:"2-digit",minute:"numeric",hourCycle:"h24",hour:"numeric"})
        console.log(date)
        const pin = Math.floor(100000 + Math.random() * 900000).toString();
        const pass=`${data.user_metadata.user_id}/${date}/${pin}`
        console.log(pass)
        const path = await min_client.presignedPutObject('mmustimages', pass, 3600)
        
        url.push(path);
    }
    for(var x=0;x<count;x++){   
       await  v().then((fs.unlink(`${files[x].path}`,()=>{})));
        console.log(x)
    
}
return res.status(200).json({message:"paths proivded",path:url})
    }
    catch(error){
        console.log(error);
        return res.status(200).json({message:"An error occured"})
    }
}