import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NoteState from "./context/notes/NoteState";
import UserState from "./context/user/UserState";
import Alert from "./components/Alert";

function App() { 
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("")
  const [type, setType] = useState("success")
  const showAlert = (x, y)=>{
    if(isAlert!==true){
      setIsAlert(true);
    }
    if(x!==type) setType(x);
    if(y!==message) setMessage(y);
    setTimeout(()=>{
      setIsAlert(false);
    }, 3000)
  }

  return (
    <>
    <UserState>
    <NoteState>
      <Router>
        <Navbar />
        {isAlert===true && <Alert setIsAlert={setIsAlert} type={type} msg = {message}/>}
        <div className = "container">
        <Routes>
          <Route exact path="/" element={<Home showAlert = {showAlert}/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/login" element={<Login showAlert = {showAlert}/>}></Route>
          <Route exact path="/signUp" element={<SignUp showAlert = {showAlert}/>}></Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
      </UserState>
    </>
  );
}

export default App;
