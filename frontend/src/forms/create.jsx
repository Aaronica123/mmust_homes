import { useState } from "react";
import axios_client from "../axios/axios";
import { useNavigate } from "react-router-dom";
export default function Create_user(){
    const[form,setform]=useState({user_id:"",user_email:"",first_name:"",last_name:"",
        user_role:"",password:""
    })
    const nav=useNavigate();
    const changeform=(e)=>{
        const{name,value}=e.target
        setform((data)=>({...data,[name]:value}))
    }
    const create=async(e)=>{
        e.preventDefault();
        const data=await axios_client.post('/api/register',{
            user_id:form.user_id,
            user_email:form.user_email,
            first_name:form.first_name,
            last_name:form.last_name,
            password:form.password,
            user_role:form.user_role
        })
        if(data.status==200||data.status==201){
            alert("User account created")
            nav("/");
        }else{
            console.log(data.data);
        }
    }
    return(
        <>
        <form>
            <label>User ID</label>
            <input type="number" placeholder="enter user id"
             onChange={changeform} value={form.user_id} name="user_id"></input>
            <label>User Email</label>
            <input type="email" placeholder="enter user email" onChange={changeform} value={form.user_email}
            name="user_email"/>
            <label>Password</label>
            <input type="password" placeholder="enter password" onChange={changeform}
            value={form.password} name="password"/>
            <label>First Name</label>
            <input type="text" name="first_name" placeholder="enter first name"
            onChange={changeform} value={form.first_name}/>
            <label>Last Name</label>
            <input type="text" name="last_name" placeholder="enter last name"
            onChange={changeform} value={form.last_name}/>
            <select onChange={changeform} name="user_role">
                <option value="">Choose a role</option>
                <option value={"finder"}>House Finder</option>
                <option value={"provider"}>House Provider</option>
            </select>
            <button type="button" onClick={create}>Register</button>
        </form>
        </>
    )
}