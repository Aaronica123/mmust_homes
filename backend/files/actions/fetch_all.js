//uses pagination to fetch houses from the database
import client from "../supabase.js";
export default async function ALl_Fetch(req,res){
    try{
    const {index}=req.query;
    if(isNaN(index)){
        return res.status(403).json({message:"Query values must be a number"})
    }
    if(index<=-1){
        return res.status(409).json({message:"Wrong index"});
    }
    const values={
        diff:10,
        pages:null,
        offset:null,
        current:null
    }
    const value=(await client.schema("mmust_homes").from("houses").select("*",{count:'exact',head:true})).count
    console.log(value,typeof(value))
    var set=0;
    if(value){
        set=value
    }
    
    values.pages=Math.ceil(Number(set)/10);
    console.log("Pages are "+values.pages)
    values.current=Math.min(index,values.pages);
    values.offset=values.diff*(values.current-1)
    const{data,error}=await client.schema("mmust_homes").from("houses").select("house_name, house_location, house_type, house_rooms").limit(values.diff).range(values.offset,(values.offset+values.diff));
    console.log(data);
    console.log(error);
    return res.status(200).json({message:"Fetched from schema",data:data})
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"An error occured"})
    }
    
}