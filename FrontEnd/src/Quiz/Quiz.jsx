import React, { useEffect, useRef, useState } from 'react';
import './Quiz.css';
import BackButton from '../BackButton/BackButton';
import Title from '../Title/Title';
import axios from 'axios';
import ImageHandler from './ImageHandler';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';import AssistantPhotoOutlinedIcon from '@mui/icons-material/AssistantPhotoOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [questionLength, setQuestionLength] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showChapters, setShowChapters] = useState(true);

  const optionA = useRef(null);
  const optionB = useRef(null);
  const optionC = useRef(null);
  const optionD = useRef(null);

  const option_array = [optionA, optionB, optionC, optionD];

  const navigate = useNavigate();

  const checkAnswer = (e, answer) => {
    if (!lock) {
      if (questions[index].answer === answer) {
        e.target.classList.add('correct');
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add('wrong');
        const correctOption = Object.keys(questions[index].options).find(key => questions[index].options[key] === questions[index].answer);
        option_array[correctOption.charCodeAt(6) - 65].current.classList.add('correct'); 
      }
      setLock(true);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
      setLock(false);
      option_array.forEach(option => {
        option.current.classList.remove('wrong', 'correct');
      });
    }
  };

  const handleNext = () => {
    if (index === questionLength - 1) {
      setResult(true);
    } else {
      setIndex(prev => prev + 1);
      setLock(false);
      option_array.forEach(option => {
        option.current.classList.remove('wrong', 'correct');
      });
    }
  };

  const handleBack = () => {
    navigate("/Study");
  };

  useEffect(() => {
    if (selectedChapter) {
      axios.get(`https://localhost:7211/Questionnaire/${selectedChapter}`).then(({ data }) => {
        setQuestions(data);
        setQuestionLength(data.length);
        setIndex(0);
        setLock(false);
      });
    }
  }, [selectedChapter]);

  const handlePartClick = (part) => {
    setSelectedChapter(part);
    setShowChapters(false);
  };

  const seePartClick = () => {
    setShowChapters(true);
    setSelectedChapter(null);
    setQuestions([]);
    setQuestionLength(0);
    setIndex(0);
    setLock(false);
    setScore(0);
    setResult(false);
  };

  return (
    <div className='Background'>
      <Title />
      <div className='Quiz'>
      <h1>Quiz</h1>
      
        {showChapters ? (
          <>
            <button className='part-buttons' onClick={() => handlePartClick(1)}>Part 1</button>
            <button className='part-buttons' onClick={() => handlePartClick(2)}>Part 2</button>
            <button className='part-buttons' onClick={() => handlePartClick(3)}>Part 3</button>
            <button className='part-buttons' onClick={() => handlePartClick(4)}>Part 4</button>
            <button className='part-buttons' onClick={() => handlePartClick(5)}>Part 5</button>
          </>
        ) : (
          <>
            {result ? (
              <h2>You Scored {score} / {questionLength}</h2>
            ) : (
              questions.length > 0 && (
                <>
                   <ImageHandler imageIndex={questions[index].image} />
                  <h2 className='Question-tag'>
                 
                    {index + 1}. {questions[index].question}
                  </h2>
                  <ul className='Ul-tag'>
                    <li className= 'LI-tag' ref={optionA} onClick={(e) => checkAnswer(e, questions[index].options.optionA)}>{questions[index].options.optionA}</li>
                    <li className= 'LI-tag' ref={optionB} onClick={(e) => checkAnswer(e, questions[index].options.optionB)}>{questions[index].options.optionB}</li>
                    <li className= 'LI-tag' ref={optionC} onClick={(e) => checkAnswer(e, questions[index].options.optionC)}>{questions[index].options.optionC}</li>
                    <li className= 'LI-tag' ref={optionD} onClick={(e) => checkAnswer(e, questions[index].options.optionD)}>{questions[index].options.optionD}</li>
                  </ul>

                 
                  <div className="button-container">
                    <IconButton onClick={handlePrevious} disabled={index=== 0} >
                      <ArrowBackIosNewRoundedIcon fontSize='large' />
                    </IconButton>
                    <IconButton onClick={handleNext} disabled= {index === questionLength - 1}>
                      <ArrowForwardIosRoundedIcon fontSize='large' />
                    </IconButton>
                  {/* <button className='Next-btn' onClick={handlePrevious} disabled={index === 0}>Previous</button>
                  <button className='Next-btn' onClick={handleNext}>Next</button> */}
                  </div>
                  {questionLength && <div className='index'>{index + 1} / {questionLength} questions</div>}
                  
                </>
              )
            )}
            <button className='Next-btn' onClick={seePartClick} >Choose Part</button>
          </>
        )}
      </div>
      <button className='bButton' onClick={handleBack}>Back</button>

      {/* <NavLink to="/Study">
                <button className="backButton" >
                    Back
                </button>
            </NavLink> */}
    </div>
  );
};

export default Quiz;
