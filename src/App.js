import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NoteState from "./context/notes/NoteState";
import UserState from "./context/user/UserState";

function App() {

  const showAlert = (msg, type)=>{
    <div className={`alert alert-${type}`} role="alert">
      {msg}
    </div>
  }

  return (
    <>
    <UserState>
    <NoteState>
      <Router>
        <Navbar />
        <div className = "container">
        <Routes>
          <Route exact path="/" element={<Home showAlert = {showAlert}/>}></Route>
          <Route exact path="/about" element={<About showAlert = {showAlert}/>}></Route>
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
