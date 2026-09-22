import client from "../supabase.js";
import min_client from "../minio.js";
export default async function House(req,res){
    try{
    const{house_location}=req.body;
    if(house_location.lat>90||house_location.lat<-90||house_location.long>180||house_location.long<-180){
        return res.status(409).json({message:"check coordinates"});
    }else{
        const{house_name}=house_location;
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
        // const buffer=Buffer.alloc(JSON.stringify(house_location).length,JSON.stringify(house_location));
        return res.status(200).json({message:"Connection to minio successful"});
    }
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error occured"});
    }
}