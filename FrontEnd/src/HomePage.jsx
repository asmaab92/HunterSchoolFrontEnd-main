import React from "react";
import "./HomePage.css";
import education from "./assets/Education.png";

import profile from "./assets/Profile .png";
import study from "./assets/Study.png";
import Title from "./Title/Title.jsx"

import { useLogin } from "./Login/LoginContext.jsx";
import { NavLink } from "react-router-dom";


export default function HomePage() {
  const { logout } = useLogin();

  const handleLogout = () => {
    logout();
    console.log("logout");
  }

  return (
    <>
    <div className="container">
      <div className="background">
       <Title/>

        <div className="box-container">

            <div className="box" >
              <NavLink to='/Education'>
              <div className="box-content">
                <h2>Education</h2>
                <img src={education} alt="Education Icon" />
              </div>
              </NavLink>
            </div>
          
          <div className="box">
          <NavLink to='/Study'>
            <div className="box-content">
              <h2>Study</h2>
              <img src={study} alt="Study Icon" />
            </div>
            </NavLink>
          </div>
          
          <div className="box">
            <NavLink to='/Profile'>
            <div className="box-content">
              <h2>Profile</h2>
              <img src={profile} alt="Profile Icon" />
            </div>
            </NavLink>
          </div>
          
        </div>
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </>
  );
}



