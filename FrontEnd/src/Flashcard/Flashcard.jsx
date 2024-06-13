import React, { useState, useEffect } from 'react';
import './Flashcard.css';
import CardList from './CardList';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import Title from '../Title/Title';
import { NavLink, useNavigate } from 'react-router-dom';

const FlashCard = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState();
    const [showChapters,setShowChapters] = useState(true)
    const url = `https://localhost:7211/FlashCards`;

    useEffect(() => {
        if (selectedChapter) {
            axios
                .get(`${url}/${selectedChapter}`)
                .then(res => {
                    setCards(res.data.map((questionItem, index) => ({
                        id: `${index}`,
                        question: decodeString(questionItem.question),
                        answer: questionItem.answer,
                       
                    })))
                    console.log("h2",res)
                })
                .catch(error => {
                    console.error('Error fetching flashcards:', error);
                });
        }
    }, [selectedChapter]);

    function decodeString(string){
        const textArea = document.createElement('textarea');
        textArea.innerHTML = string;
        return textArea.value;
    }

    const handleChapterClick = (chapter) => {
        setSelectedChapter(chapter)
        setShowChapters(false)
    }
    const seeChapterClick = () => {
        setShowChapters(true)
        setSelectedChapter(null)
    }
    const handleBack = () => {
        navigate("/Study");
    };

    return (
        <>
            <div className='Background'>
                <Title/>
                <div className='Flashcard'>
                    <h1>FlashCards</h1>
                {showChapters ? (
                    <div className="chapter-buttons-container">
                    
                        <button className='chapter-buttons' onClick={() => handleChapterClick('A')}>Chapter A</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('B')}>Chapter B</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('C')}>Chapter C</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('D')}>Chapter D</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('E')}>Chapter E</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('F')}>Chapter F</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('G')}>Chapter G</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('H')}>Chapter H</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('I')}>Chapter I</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('J')}>Chapter J</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('K')}>Chapter K</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('L')}>Chapter L</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('M')}>Chapter M</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('N')}>Chapter N</button>
                        <button className='chapter-buttons' onClick={() => handleChapterClick('O')}>Chapter O</button>
                       

                   
                    </div>     
                   ): (
                    <>
                        <CardList cards={cards}/>
                        <button className='Next-btn' onClick={seeChapterClick}>Chapters</button>
                    </>
                )}
                    
                    
                </div>
                <button className='bButton' onClick={handleBack}>Back</button>
            </div>
        </>
    );
};

export default FlashCard;
