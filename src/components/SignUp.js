import React, {useContext, useState} from 'react'
import userContext from '../context/user/userContext'
import {useNavigate} from 'react-router-dom'


const SignUp = (props) => {
  const {signup} = useContext(userContext)
  const [user, setUser] = useState({name: "", email: "", password: "", cpassword: ""})
  let navigate = useNavigate();

  const handleChange = (e)=>{
    setUser({...user, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(user.password!==user.cpassword){
      alert("Password does not match in the two fields");
      setUser({name: "", email: "", password: "", cpassword: ""});
      return;
    }
    const response = await signup(user.name, user.email, user.password);
    setUser({name: "", email: "", password: "", cpassword: ""});
    if(response && response.success===true){
      const json = response.data;
      console.log(json)
      localStorage.setItem("token", json.authToken);
      navigate('/')
      props.showAlert(`Success`, "success");
    }
    else{
      props.showAlert(`Error, ${response.response.data.errors[0].msg}`, "danger");
    }
  }
  return (
    <div className='my-3'>
      <form onSubmit={handleSubmit} style={{"display": "flex", "flexDirection": "column"}}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input type="text" name='name' className="form-control" id="name" onChange={handleChange} value={user.name}/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={user.email}/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' className="form-control" id="password" onChange={handleChange} value={user.password}/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="cpassword">Re-enter Password</label>
          <input type="password" name='cpassword' className="form-control" id="cpassword" onChange={handleChange} value={user.cpassword}/>
        </div>
        <button type="submit" className="btn btn-primary my-3">Submit</button>
      </form>
    </div>

  )
}

export default SignUp