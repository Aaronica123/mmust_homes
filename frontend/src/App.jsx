import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes/dist/cjs/index.js";
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import './App.css'
import "./index.css"
import Register_Form from "./forms/register";
import Home from "./forms/rooms";
import NavBar from "./components/navbar";
import Login from "./forms/login";
import { Auth } from "./auth/auth";
import Create_user from "./forms/create";
import Landing from "./forms/landing";
import N from "./forms/new";
import { Toaster } from "@/components/ui/sonner"
function App() {


  return (
    <Theme>
    <Toaster />
    <Router>
      <Routes>
        <Route path="/register" element={
          <Auth>
          <NavBar>
          <Register_Form/>
          </NavBar>
          </Auth>
          }/>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create_user" element={<Create_user/>}/>
        <Route path="/houses" element={
          <Auth>
          <NavBar>
          <Home/>
          </NavBar>
          </Auth>
        }/>
      </Routes>
    </Router>
    </Theme>
  )
}

export default App
