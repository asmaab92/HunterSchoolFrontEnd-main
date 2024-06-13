import React, { useState } from 'react'
import './Card.css'

export default function Cards({ card }) {
  
  const [flip, setFlip] = useState(false)

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
    >
       <div className='front'>
        {card.question}
       </div>

       <div className='back'>
        {card.answer}
       </div>
     
    </div>
  )
}