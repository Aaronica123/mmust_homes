
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import './App.css'
import Register_Form from "./forms/register";
import Home from "./forms/rooms";
import NavBar from "./components/navbar";
function App() {


  return (
    <Router>
      <Routes>
        {/* <Route path="/register" element={<Register_Form/>}/> */}
        <Route path="/houses" element={
          <NavBar>
          <Home/>
          </NavBar>
        }/>
      </Routes>
    </Router>
  )
}

export default App
