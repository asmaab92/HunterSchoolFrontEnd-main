import React from "react";
import "./HomePage.css";
import quiz from "./assets/QuizIcon.png";
import flashcardicon from "./assets/FlashcardIcon.png";

import { useLogin } from "./Login/LoginContext.jsx";
import { NavLink } from "react-router-dom";
import Title from "./Title/Title.jsx";
import BackButton from "./BackButton/BackButton.jsx";



export default function Study() {
 

  return (
    <>
    <div className="container">
      <div className="background">
       <Title/>

        <div className="box-container">

            <div className="box" >
              <NavLink to='/Flashcard'>
              <div className="box-content">
                <h2>Flash Cards</h2>
                <img src={flashcardicon} alt="FlasCard Icon" />
              </div>
              </NavLink>
            </div>
          
          <div className="box">
          <NavLink to='/Quiz'>
            <div className="box-content">
              <h2>Quiz</h2>
              <img src={quiz} alt="Quiz Icon" />
            </div>
            </NavLink>
          </div>
          
        </div>
        <BackButton />
      </div>
    </div>
    </>
  );
}