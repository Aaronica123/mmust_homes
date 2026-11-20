import { Button, DropdownMenu, TextField } from "@radix-ui/themes";
import { useState } from "react";
import axios_client from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed, House, IdCard, Lock, Mail, User } from "lucide-react";
import { Avatar,Text } from "@radix-ui/themes";
import profile from "./images/profile.png";
export default function Create_user() {
  const [form, setform] = useState({
    user_id: "",
    user_email: "",
    first_name: "",
    last_name: "",
    user_role: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
 
  const changeform = (e) => {
    const { name, value } = e.target;
    setform((data) => ({ ...data, [name]: value }));
  };
 
  const create = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await axios_client.post("/api/register", {
        user_id: form.user_id,
        user_email: form.user_email,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
        user_role: form.user_role,
      });
      if (data.status == 200 || data.status == 201) {
        nav("/");
      } else {
        console.log(data.data);
        setError("We couldn't create your account. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data?.message ||
          "We couldn't create your account. Check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      
      <div style={{width:"100%",display:"flex",flexDirection:"column",height:"100%",background:"#F7F5F0"}}>
        <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"row",padding:"15px",
                background:"#FFFFFF",justifyContent:"center",alignItems:"center"}}>
                <div style={{width:"100%",height:"100%",display:"flex",gap:"5px",alignItems:"center"}}>
                <div style={{display:"flex",width:"fit-content",height:"fit-content",padding:'5px',background:"#2B3437",borderRadius:"10px"}}
                ><House size={"30"} color="#ffffff"></House>    
                </div>
                <Text size={"6"} weight={"medium"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                    Mmust Homes
                </Text>
                </div>
                <div style={{width:"fit-content",height:"100%",display:"flex",alignItems:"center"}}>
                <Avatar size={"3"} variant="soft" src={profile} radius="full"></Avatar>
                </div>
            </div>
        <form onSubmit={create} style={{background:"#F7F5F0",width:"100%",height:"100%",padding:"15px",marginTop:"5px"}}>
          <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column"}}>
            <Text size={"7"} weight={"regular"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                        Welcome back
                    </Text>
                    <Text size={"2"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
                        Create an account to search for your affordable house rental  
                    </Text>
            </div>
 
          
 
          <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column",gap:'10px',marginTop:"8px"}}>
            <div>
              <Text size={"3"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
                First Name
                </Text> 
              <TextField.Root
                id="first_name"
                style={{width:"100%",padding:"5px",color:"#2B3437"}}
                size="3"
                name="first_name"
                type="text"
                autoComplete="given-name"
                required
                value={form.first_name}
                onChange={changeform}
                placeholder="Jane"
              >
                <TextField.Slot>
                <User></User>
                </TextField.Slot>
              </TextField.Root>
            </div>
 
            <div>
              <Text size={"3"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
               Last Name
                </Text> 
              <TextField.Root
                id="last_name"
                style={{width:"100%",padding:"5px",color:"#2B3437"}}
                size="3"
                name="last_name"
                type="text"
                autoComplete="family-name"
                required
                value={form.last_name}
                onChange={changeform}
                placeholder="Doe"
              >
                <TextField.Slot>
                <User></User>
                </TextField.Slot>
              </TextField.Root>
            </div>
 
            <div className="hf-full">
              <Text size={"3"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
               Email
                </Text> 
              <TextField.Root
                id="user_email"
                style={{width:"100%",padding:"5px",color:"#2B3437"}}
                size="3"
                name="user_email"
                type="email"
                autoComplete="email"
                required
                value={form.user_email}
                onChange={changeform}
                placeholder="you@example.com"
              >
                <TextField.Slot>
                <Mail></Mail>
                </TextField.Slot>
              </TextField.Root>
            </div>
 
            <div>
              <Text size={"3"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
                National ID
                </Text> 
              <TextField.Root
                id="user_id"
                style={{width:"100%",padding:"5px",color:"#2B3437"}}
                size="3"
                name="user_id"
                type="number"
                required
                value={form.user_id}
                onChange={changeform}
                placeholder="Enter your ID number"
              >,
              <TextField.Slot>
                <IdCard></IdCard>
                </TextField.Slot>
              </TextField.Root>
            </div>
 
            <div style={{display:"flex",flexDirection:"column",width:"100%"
            }}>
              <Text size={"3"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
                Role
                </Text>
              <select 
                id="user_role"
                style={{border:"solid 1px #c1c1c1",borderRadius:"5px",padding:"5px",background:"#FFFFFF"}}
                name="user_role"
                required
                value={form.user_role}
                onChange={changeform}
              >
                <option value="" disabled>Choose a role</option>
                <option value="finder">House Finder</option>
                <option value="provider">House Provider</option>
              </select>
            </div>
 
            <div className="hf-full">
              <Text size={"3"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
                Password
                </Text>
              <TextField.Root
                id="password"
                style={{width:"100%",padding:"5px",color:"#2B3437"}}
                size="3"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={form.password}
                onChange={changeform}
                placeholder="Create a password"
              >
                <TextField.Slot>
                  <Lock></Lock>
                </TextField.Slot>
                <TextField.Slot side="right">
                  <button
                    type="button"
                    className="hf-toggle"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                  </button>
                </TextField.Slot>
              </TextField.Root>
            </div>
          <div style={{width:"100%",display:"flex",flexDirection:"column",marginTop:"10px",gap:"5px"}}>
            
            <button type="submit" style={{width:"100%",height:"fit-content",background:"#2B3437",padding:"5px",borderRadius:"8px"}}>
             <Text size={"5"} weight={"medium"} style={{fontFamily:"Plus Jakarta Sans",color:"#FFFFFF"}}>
                  Create Account
                  </Text> 
            </button>
          
 
          <div style={{display:"flex",flexDirection:"row"}}>
                <Text size={"3"} weight={"medium"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                  Already have an acount?
                  </Text> 
              <Text size={"3"} weight={"medium"} style={{marginLeft:"5px",cursor:"pointer",fontFamily:"Plus Jakarta Sans",color:"#99462a"}} onClick={()=>nav('/login')}>
                  Login
              </Text> 
          </div>
          </div>  
        </div>
 
          
        </form>
      </div>
    </>
  );
}
 