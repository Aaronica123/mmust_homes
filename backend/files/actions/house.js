import client from "../supabase.js";
import min_client from "../minio.js";
import fs from "fs";
export default async function House(req,res){
    try{
    const{body}=req.body;
    console.log(JSON.parse(body));
    const{house_coordinates}=JSON.parse(body);
    const{house_location}=JSON.parse(body);
    var files=null;
    if(house_coordinates.lat>90||house_coordinates.lat<-90||house_coordinates.long>180||house_coordinates.long<-180){
        return res.status(409).json({message:"check coordinates"});
    }else{
        const{house_available,house_name,house_rooms,house_type,user_id}=JSON.parse(body);
        const degrees={
            lat:house_coordinates.lat,
            long:house_coordinates.long
        };
        const result=await min_client.bucketExists("mmustimages");
        if(!result){
            await min_client.makeBucket("mmustimages").then(()=>console.log("Bucket has been created"));
        }else{
            console.log("bucket already exists");
        }
        console.log(JSON.stringify(house_coordinates).length);
        console.log(req.files,req.file);
        // const buffer=Buffer.alloc(JSON.stringify(house_coordinates).length,JSON.stringify(house_coordinates));
        if(req.file){
            files=req.file;
        }else if(req.files){
            files=req.files;
        };
        if(files){
        for(const data of files){
            const stream=fs.createReadStream(`${data.path}`);
            await min_client.putObject('mmustimages',
                `${user_id}/${house_name}/${degrees.lat}/${degrees.long}/${data.filename}`,
            stream,data.size).then(()=>{
                fs.unlink(`${data.path}`,()=>{});
            })
            
            console.log("Image has been successfully uploaded");
        }
        }else{console.log("Files are null");

        }
        await client.schema("mmust_homes").from("houses").insert({
            user_id:Number(user_id),
            house_name:house_name,
            house_location:house_location,
            house_type:house_type,
            house_rooms:Number(house_rooms),
            house_coordinates:degrees,
            house_available:Number(house_available)
            
        }).then(()=>{
            console.log("house created and stored");
            return res.status(200).json({message:"House added"});
        });
        
    }
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error occured"});
    }
}