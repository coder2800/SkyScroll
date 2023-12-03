import React, {useContext, useState} from "react";
import userContext from "../context/user/userContext";
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const context = useContext(userContext);
  const {login} = context;
  const [user, setUser] = useState({email: "", password: ""})
  let navigate = useNavigate();
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const json = await login(user.email, user.password);
    // console.log(json);
    setUser({email: "", password: ""});
    if(json.success){
      console.log(json)
      localStorage.setItem("token", json.authToken);
      navigate('/')
    }
    else{
      alert("Invalid credentials");
    }
  }
  const handleChange = (e)=>{
    setUser({...user, [e.target.name]: e.target.value})
  }
  return (
    <div className="my-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={user.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
