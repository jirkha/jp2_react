import React, {useState, useEffect} from 'react'
import ListMaterial from "../components/Material/ListMaterial";
//imd(import)
//import "../App.css";
// import '../style.css'
import { Container, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import * as AddButton from '../components/Material/AddButton'
import AddItemForm from "../components/Material/AddItemForm";
import FormContainer from "../components/Material/FormContainer";
import ItemTable from '../components/Material/ItemTable';
import {HeaderPage} from "../styles/styles";
import { Typography, Stack } from "@mui/material";


function ListMaterialPage() {

  let [material, setMaterial] = useState([])
  let [materialType, setMaterialType] = useState([])

  useEffect(()=> {
    getMaterial();
    getMaterialType()
  }, [])

  let getMaterial = async () => {
    let response = await fetch('/api/list_items/')
    let data = await response.json()
    setMaterial(data)
  }
  
  let getMaterialType = async () => {
    let response = await fetch('/api/item_types/')
    let data = await response.json()
    //console.log(data)
    setMaterialType(data)
  }

  return (
    <div>
      {/* <Row>
        <Col>
          <h2 className="notes-title">&#9782; Seznam materiálu</h2>
        </Col>
      </Row>
      <Row md="auto">
        {material.map((m_ser, index) => (
          <Col sm={12} md={6} lg={4} xl={3} key={index}>
            <ListMaterial m_ser={m_ser} />
          </Col>
        ))}
      </Row> */}
      <Container>
        {/* <HeaderPage> */}
        <Typography
          variant="h2"
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Seznam materiálu <AddButton.AddButton link="#itemForm" />
        </Typography>
        {/* </HeaderPage> */}
        <ItemTable />
        {/* </Container> */}
      </Container>
      {/*</div> */}

      {/* <section id="itemForm"> */}
      <br />
      <br />
      <br />

      {/* <div className="notes"> */}
      <Container component="section" id="itemForm">
        {/*<FormContainer> */}
        <Typography
          variant="h2"
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Přidat materiál
        </Typography>
        <Stack
          sx={{ justifyContent: "center" }}
          direction="row"
        >
          <AddItemForm />
        </Stack>

        {/* </FormContainer>*/}
      </Container>
      {/* </section> */}
    </div>
  );
}

export default ListMaterialPage
