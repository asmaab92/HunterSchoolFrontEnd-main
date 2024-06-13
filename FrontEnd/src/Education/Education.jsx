import React, { useState, useEffect } from 'react';
import './Education.css';
import axios from 'axios';
import BackButton from '../BackButton/BackButton';
import Title from '../Title/Title';


const Education = () => {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [chapterData, setChapterData] = useState(null);
    const [showChapters, setShowChapters] = useState(true);
    const url = 'https://localhost:7211/api/Chapters'; // Update to your actual backend URL

    useEffect(() => {
        if (selectedChapter) {
            axios
                .get(`${url}/${selectedChapter}`)
                .then(res => {
                    setChapterData({
                        Id: res.data.id,
                        ChapterName: decodeString(res.data.chapterName),
                        Content: decodeString(res.data.content),
                    });
                })
                .catch(error => {
                    console.error('Error fetching chapter:', error);
                });
        }
    }, [selectedChapter]);

    function decodeString(string) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = string;
        return textArea.value;
    }

    const handleChapterClick = (chapterId) => {
        setSelectedChapter(chapterId);
        setShowChapters(false);
    };

    const seeChapterClick = () => {
        setShowChapters(true);
        setSelectedChapter(null);
        setChapterData(null);
    };

    return (
        <>
            <div className='Background'>
                <Title />
                <div className='Education'>
                     <h2>Education</h2>
                    {showChapters ? (
                        <div className="chapter-buttons-container">
                            <button className='chapter-buttons' onClick={() => handleChapterClick('1')}>Chapter 1</button>
                            <button className='chapter-buttons' onClick={() => handleChapterClick('2')}>Chapter 2</button>
                            <button className='chapter-buttons' onClick={() => handleChapterClick('3')}>Chapter 3</button>
                            <button className='chapter-buttons' onClick={() => handleChapterClick('4')}>Chapter 4</button>
                            <button className='chapter-buttons' onClick={() => handleChapterClick('5')}>Chapter 5</button>
                            <button className='chapter-buttons' onClick={() => handleChapterClick('6')}>Chapter 6</button>
                            <button className='chapter-buttons' onClick={() => handleChapterClick('7')}>Chapter 7</button>
                            <button className='chapter-buttons' onClick={() => handleChapterClick('8')}>Chapter 8</button>
                            <button className='chapter-buttons' onClick={() => handleChapterClick('9')}>Chapter 9</button>
                            <button className='chapter-buttons' onClick={() => handleChapterClick('10')}>Chapter 10</button>
                        </div>
                    ) : (
                        <>
                            {chapterData && (
                                <div className='chapter-page'>
                                    <h2>{chapterData.ChapterName}</h2>
                                    <p>{chapterData.Content}</p>
                                </div>
                            )}
                            <hr />
                            <button onClick={seeChapterClick} className="back-to-chapters-button">Back to Chapters</button>
                        </>
                    )}
                </div>
                <BackButton />
            </div>
        </>
    );
};

export default Education;
