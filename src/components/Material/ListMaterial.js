import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";

const ListMaterial = ({m_ser}) => {
  return (
    <Link to={`/material/${m_ser.id}`}>
      {/* <table>
        <thead>
          <tr>
            <th scope="col">Zboží</th>
          </tr>
        </thead>
      </table> */}
      <Container>
        {/* <div className="notes-list-item"> */}
          <h3>{m_ser.name}</h3>
          <p>typ {m_ser.type.name}</p>
          <h3>cena {m_ser.costs} Kč (za kus/jednotku)</h3>
        {/* </div> */}
      </Container>
    </Link>
  );
}

export default ListMaterial