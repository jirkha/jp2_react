import React from 'react'
import { Link } from 'react-router-dom'

const ListMaterial = ({m_ser}) => {
  return (
    <Link to={`/material/${m_ser.id}`}>
      <div className='notes-list-item'>
        <h3>{m_ser.name}</h3>
        <p>typ {m_ser.type.name}</p>
        <h3>cena {m_ser.costs} Kč (za kus/jednotku)</h3>
      </div>
        
    </Link>
  )
}

export default ListMaterial