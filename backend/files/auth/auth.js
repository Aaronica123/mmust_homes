import client from "../supabase.js";
export default async function Auth(req){
    const token=req?.headers?.authorization;
    const{data}=await client.auth.getUser(token)
    
    if(data?.user){
        
        return {data:data.user,state:true}
    }
    else{
        return {data:null,state:false}
    }
}