import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes/dist/cjs/index.js";
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import './App.css'
import Register_Form from "./forms/register";
import Home from "./forms/rooms";
import NavBar from "./components/navbar";
import Login from "./forms/login";
import { Auth } from "./auth/auth";
function App() {


  return (
    <Theme>
    <Router>
      <Routes>
        <Route path="/register" element={
          <Auth>
          <NavBar>
          <Register_Form/>
          </NavBar>
          </Auth>
          }/>
        <Route path="/" element={<Login/>}/>
        <Route path="/houses" element={
          <NavBar>
          <Home/>
          </NavBar>
          
        }/>
      </Routes>
    </Router>
    </Theme>
  )
}

export default App
