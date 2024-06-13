import React from "react";
import "../HomePage.css";
import profile from "../assets/Profile .png";
import TitleAdmin from "../Title/TitleAdmin.jsx"
import { useLogin } from "../Login/LoginContext.jsx";
import { NavLink } from "react-router-dom";
import quiz from "../assets/QuizIcon.png";
import flashcardicon from "../assets/FlashcardIcon.png";

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
       <TitleAdmin/> 

        <div className="box-container">

            <div className="box" >
              <NavLink to='/EditFlashcards'>
              <div className="box-content">
                <h2>FlashCards</h2>
                <img src={flashcardicon} alt="Education Icon" />
              </div>
              </NavLink>
            </div>
          
          <div className="box">
          <NavLink to='/EditQuestionere'>
            <div className="box-content">
              <h2>Questions</h2>
              <img src={quiz} alt="Study Icon" />
            </div>
            </NavLink>
          </div>
          
          <div className="box">
            <NavLink to='/EditUsers'>
            <div className="box-content">
              <h2>Users</h2>
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