import React from 'react'
import userContext from '../context/user/userContext'

const SignUp = () => {
  return (
    <div className='my-3'>
      <form style={{"display": "flex", "flexDirection": "column"}}>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your Password"/>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Re-enter Password</label>
          <input type="password" className="form-control" id="cpassword" placeholder="Re-enter Password"/>
        </div>
        <button type="submit" className="btn btn-primary my-3">Submit</button>
      </form>
    </div>

  )
}

export default SignUp