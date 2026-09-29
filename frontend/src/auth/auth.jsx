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
            const {data,error}=await client.schema("mmust_homes").from("users").select("user_id,user_role").match({user_email:da.user.email});
            console.log(data);
            console.log(error)
            if(data){
                console.log(data)
                setuser({user_id:data[0].user_id,user_role:data[0].user_role})
                setloading(false);
            }
            else{
                console.log(error);
                seterror(true);
                setloading(false)
            }
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