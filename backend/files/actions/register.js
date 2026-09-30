import client from "../supabase.js";

export default async function Register(req,res){
    try{
    const{user_email,user_id,first_name,last_name,user_role,
        password}=req.body;
    if(!user_email||!user_id||!first_name||!last_name||!password){
        return res.status(409).json({message:"missing values"});
    }else{
        const{data:da,error:er}=await client.auth.admin.createUser({
            email:user_email,password:password,user_metadata:{user_role:user_role},email_confirm:true});
        const{data,error}=await client.schema("mmust_homes").from("users").insert({
            user_id:user_id,user_email:user_email,
            first_name:first_name,last_name:last_name,user_role:user_role}).select();
        const{data:dat,error:err}=await client.schema("mmust_homes").from("profile").insert({
            user_id:user_id,user_email:user_email,house_data:{}
        }).select();
        
        if(data&&da&&dat){
            
            console.log("created user and stored");
        }else{
            console.log(error);
            console.log(er);
            console.log(err);
        };
        return res.status(200).json({message:"User has been created"});
    }
    }catch(error){
        console.log("error");
        return res.status(500).json({message:"Error was encountered"});
    }
}