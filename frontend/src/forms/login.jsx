import { Button, TextField } from "@radix-ui/themes";
import { client } from "../axios/supabase.js";
import { useState } from "react";
import { Label } from "@radix-ui/themes/components/context-menu";
export default function Login(){
    const[form,setform]=useState({email:"",password:""})
    const change=(e)=>{
        const{name,value}=e.target;
        setform((data)=>({
            ...data,
            [name]:value
        }))
    }
    const login=async(e)=>{
        e.preventDefault;
        const{data,error}=await client.auth.signInWithPassword({email:form.email,password:form.password});
        if(data){
            alert("Authenticated user")
        }else{
            alert("failed to authenticate")
            console.log(error)
        }

    }
    return(
        <>
        <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:"100%",height:"100%"}}>
        <Label>Login</Label>
        <TextField.Root style={{width:"50%",height:"fit-content",padding:"5px"}} value={form.email}  onChange={change} name="email" type="email" placeholder="Enter email to login...">
        </TextField.Root>
        <Label>Password</Label>
        <TextField.Root  style={{width:"50%",height:"fit-content",padding:"5px"}} value={form.password} 
         onChange={change} name="password" type="password" placeholder="Enter password to login..."> 
        </TextField.Root>
        <Button type="button" variant="classic" onClick={login}>Login</Button>
        </div>
        </div>
        </>
    )
}