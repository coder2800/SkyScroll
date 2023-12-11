import React from "react";
import { Link, useLocation, useNavigate} from "react-router-dom"

export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  const handleClick = ()=>{
    localStorage.removeItem("token")
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand mx-3" to="#">
        SkyScroll
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/'?"active":""}`} to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
      {!localStorage.getItem('token')?<div>
        <Link className="btn btn-primary mx-1" role="button" to="/login">Login</Link>
        <Link className="btn btn-primary mx-1" role="button" to="/signUp">SignUp</Link>
      </div> : <button className="btn btn-primary" onClick={handleClick}>Logout</button>}
    </nav>
  );
}
