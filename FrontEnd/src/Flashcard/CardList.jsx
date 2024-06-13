import React from 'react'
import Cards from './Cards.jsx'

export default function CardList({cards}) {
  return (
    <div className='card-grid'>
      {cards.map(card => {
        return <Cards card={card} key={card.id}/>
      })}
    </div>
  )
}
