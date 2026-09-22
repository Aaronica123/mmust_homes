import { useState } from "react";
import axios_client from "../axios/axios";
function Register_Form(){
    const [image,setimage]=useState({input:null})

    const image_change=(e)=>{
        const value=e.target.files;
        setimage({input:value});
    }
    const submit=async(e)=>{
        e.preventDefault();
        const Frm=new FormData();
        var count=0;
        while(count<=image.input.length){
            Frm.append('images',image.input[count]);
            count++;
        }
        console.log(Frm.get("images"));
        Frm.append('body',JSON.stringify({house_location:{lat:20,long:120},house_name:"Test home",id:100}))
        const{data,status}=await axios_client.post("/api/register_house",Frm);
        if(status==200){
            console.log("successfully uploaded image");
            
        }
        else{
            console.log(status,data);
        };

    }
return(<>
<form>  
    <label>Enter your image</label>
    <input type="file" multiple placeholder="enter a file" onChange={image_change} />
    <button type="button" onClick={submit} >Submit</button>
</form>
</>)
}
export default Register_Form;