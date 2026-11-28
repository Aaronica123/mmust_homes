import { createContext,useContext, useEffect, useState } from "react";
import { client } from "../axios/supabase";
import { Spinner } from "@radix-ui/themes";
const Authparent=createContext();

export function Auth({children}){
    const[loading,setloading]=useState(false);
    const[error,seterror]=useState(false)
    const[user,setuser]=useState({user_id:"",user_role:""})
    const status=async()=>{
        setloading(true)
        const{data:da,error:er}=await client.auth.getUser();
        if(da.user){
            console.log(da.user.email)
            setuser({user_id:da.user.user_metadata.user_id,user_role:da.user.user_metadata.role})
              seterror(false);
            setloading(false);
        }
        else{
            console.log(er);
            seterror(true);
            setloading(false);
        }
    }
    useEffect(()=>{
    status();
    },[])
    return (
        <Authparent.Provider value={{loading:loading,error:error,user:user}}>
            {loading?<Spinner></Spinner>:error?<div>Not authorized or not logged in</div>:
            children
            }
        </Authparent.Provider>
    )
}
export default function Auth_parent(){
    const value_auth=useContext(Authparent);
    if(!value_auth){
        alert("Must be in auth route");
         return;
    }
    return value_auth;
}