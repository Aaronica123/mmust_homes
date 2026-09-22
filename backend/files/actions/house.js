import client from "../supabase.js";
import min_client from "../minio.js";
import fs from "fs";
export default async function House(req,res){
    try{
    const{body}=req.body;
    console.log(JSON.parse(body));
    const{house_location}=JSON.parse(body);
    var files=null;
    if(house_location.lat>90||house_location.lat<-90||house_location.long>180||house_location.long<-180){
        return res.status(409).json({message:"check coordinates"});
    }else{
        const{house_name,id}=JSON.parse(body);
        const degrees={
            lat:house_location.lat,
            long:house_location.long
        };
        const result=await min_client.bucketExists("mmustimages");
        if(!result){
            await min_client.makeBucket("mmustimages").then(()=>console.log("Bucket has been created"));
        }else{
            console.log("bucket already exists");
        }
        console.log(JSON.stringify(house_location).length);
        console.log(req.files,req.file);
        // const buffer=Buffer.alloc(JSON.stringify(house_location).length,JSON.stringify(house_location));
        if(req.file){
            files=req.file;
        }else if(req.files){
            files=req.files;
        };
        if(files){
        for(const data of files){
            const stream=fs.createReadStream(`${data.path}`);
            await min_client.putObject('mmustimages',
                `${id}/${house_name}/${degrees.lat}/${degrees.long}/${data.filename}`,
            stream,data.size).then(()=>{
                fs.unlink(`${data.path}`,()=>{});
            })
            
            console.log("Image has been successfully uploaded");
        }
        }else{console.log("Files are null");}
        return res.status(200).json({message:"Connection to minio successful"});
    }
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error occured"});
    }
}