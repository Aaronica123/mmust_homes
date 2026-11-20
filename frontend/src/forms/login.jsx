import { Blockquote, Button, Card, Quote, TextField } from "@radix-ui/themes";
import { client } from "../axios/supabase.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import house from "../assets/image_house_1.png";
import { useMediaQuery } from "react-responsive";
import profile from "./images/profile.png";
import { Check, Eye, EyeClosed, House, Loader, Lock, Mail, XCircle } from "lucide-react";
import { Avatar,Text } from "@radix-ui/themes";
import im4 from "./images/im4.png";
import {toast} from "sonner"
export default function Login() {
  const [form, setform] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const min=useMediaQuery({maxWidth:"768px"})
  const change = (e) => {
    const { name, value } = e.target;
    setform((data) => ({ ...data, [name]: value }));
  };
 
  const login = async (e) => {
    const id=toast(
  <div style={{display:"flex",flexDirection:"row",alignItems:"center", gap:"10px",}}>
  <Loader></Loader>       
  <div style={{width:"fit-content",display:"flex",flexDirection:"column"}}>
  Logging In
  <Text size={"2"} weight={"medium"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                   Authenticating please wait
                </Text>
  </div>
  </div>,{position:"top-right",action:{label:"Close",onClick:()=>{}},actionButtonStyle:{background:"#D6C9C0",color:"#742C38",},style:{background:"#FAF9F6",border:"1px solid #DEDAD4"}});
 
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error } = await client.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    
    if (data?.user) {
      toast.dismiss(id)
      toast(
  <div style={{display:"flex",flexDirection:"row",alignItems:"center", gap:"10px",}}>
    <Check></Check>      
  <div style={{width:"fit-content",display:"flex",flexDirection:"column"}}>
  Login Success
  <Text size={"2"} weight={"medium"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                Login was successfull
                </Text>
  </div>
  </div>,{position:"top-right",action:{label:"Close",onClick:()=>{}},actionButtonStyle:{background:"#D6C9C0",color:"#742C38",},style:{background:"#FAF9F6",border:"1px solid #DEDAD4"}});
 
      nav("/houses");
    } else {
      toast.dismiss(id)
      toast(
  <div style={{display:"flex",flexDirection:"row",alignItems:"center", gap:"10px",}}>
    <XCircle></XCircle>      
  <div style={{width:"fit-content",display:"flex",flexDirection:"column"}}>
  Login Failed
  <Text size={"2"} weight={"medium"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                We couldn't sign you in. Check your email and password and try again.
                </Text>
  </div>
  </div>,{position:"top-right",action:{label:"Close",onClick:()=>{}},actionButtonStyle:{background:"#D6C9C0",color:"#742C38",},style:{background:"#FAF9F6",border:"1px solid #DEDAD4"}});
 
      console.log(error);
      setError("We couldn't sign you in. Check your email and password and try again.");
    }
  };
 
  const move = () => nav("/create_user");
 
  return (
    <>
      <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#F7F5F0"}}>
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
        <div>
          <form className="hf-card" onSubmit={login} style={{width:"100%",height:"100%",padding:"15px"}}>
            <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"column"}}>
            <Text size={"7"} weight={"regular"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                        Welcome back
                    </Text>
                    <Text size={"2"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
                        Login or Create an account to search for your affordable house rental  
                    </Text>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"5px",height:"100%",justifyContent:"center"}}>
            <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
               <Text size={"3"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
                Email
                </Text> 
              <TextField.Root
                id="email"
                style={{width:"100%",padding:"5px",color:"#2B3437"}}
                size="3"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={change}
                placeholder={""}
                
              >
                <TextField.Slot>
                  <Mail></Mail>
                </TextField.Slot>
              </TextField.Root>
            </div>
 
            <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
               <Text size={"3"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
                Password
                </Text> 
              <TextField.Root
                id="password"
                className="hf-input"
                size="3"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={form.password}
                onChange={change}
                placeholder="Enter your password"
              >
                <TextField.Slot><Lock></Lock></TextField.Slot>
                <TextField.Slot side="right">
                  <button
                    type="button"
                    className="hf-toggle"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    
                    
                    {showPassword ?<Eye></Eye> : <EyeClosed></EyeClosed>}
                  </button>
                </TextField.Slot>
              </TextField.Root>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px",marginTop:"15px"}}>
              <button type="submit"  style={{width:"100%",height:"fit-content",background:"#2B3437",padding:"5px",borderRadius:"8px"}}>
                <Text size={"5"} weight={"medium"} style={{fontFamily:"Plus Jakarta Sans",color:"#FFFFFF"}}>
                  Log in
                  </Text> 
              </button>
              <div style={{display:"flex",flexDirection:"row"}}>
                <Text size={"3"} weight={"medium"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                  New here?
                  </Text> 
              <Text size={"3"} weight={"medium"} style={{marginLeft:"5px",cursor:"pointer",fontFamily:"Plus Jakarta Sans",color:"#99462a"}} onClick={move}>
                  Create an account
              </Text> 
              </div>
            </div>

<Card style={{
  overflow: "hidden",
  width: "100%",
  height: "fit-content",
  gap: "15px",
  display: 'flex',
  flexDirection: "column",
  marginTop: "20px",
  background: "#FFFFFF",
  padding: "10px",
  borderRadius: "10px",
  position: "relative", // needed for absolute children
}}>
  <div style={{ position: "relative", width: "100%" }}>
    <img
      style={{ width: "100%", objectFit: "cover", borderRadius: "8px", display: "block" }}
      src={im4}
    />
    {/* Fade overlay */}
    <div style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "80%", // adjust fade height
      background: "linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%)",
      pointerEvents: "none",
    }} />
  </div>

  <div style={{
    width: "fit-content",
    height: "fit-content",
    display: "flex",
    zIndex: 3,
    position: "absolute",
    bottom: "-1px",
    padding:"8px",flexDirection:"column"
  }}>
    <Text size={"4"} weight={"medium"} style={{ color: "#99462a", fontFamily: 'Plus Jakarta Sans' }}>
 <Quote style={{color:"#2B3437",marginRight:"8px"}}>This app has helped me find a house I highly recommend to any house finder out there</Quote>
  System Developer
  </Text>
  </div>
</Card>
            </div>
 
            
          </form>
        </div>
 
        {/* Right: image + message */}
        {/* <div className="hf-hero" style={{ backgroundImage: `url(${house})` }}>
          <div className="hf-hero-text">
            <h2>Your next home is closer than you think.</h2>
            <p>
              Browse listings, compare neighbourhoods and shortlist the places
              you love, all in one spot.
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
}
 