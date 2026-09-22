
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import './App.css'
import Register_Form from "./forms/register";
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register_Form/>}/>
      </Routes>
    </Router>
  )
}

export default App
