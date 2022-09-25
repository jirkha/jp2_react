import React, {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import ListMaterial from "../components/Material/ListMaterial";

import * as AddButton from '../components/Material/AddButton'
import UpdateItemForm from "../components/Material/UpdateItemForm";
import FormContainer from "../components/Material/FormContainer";
import ItemTable from '../components/Material/ItemTable';
import {HeaderPage} from "../styles/styles";
import { Container, Typography, Stack } from "@mui/material";


function UpdateMaterialPage() {

  return (
    <div>
      <Container component="section" id="itemForm">
        {/*<FormContainer> */}
        <Typography
          variant="h2"
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Editace materiálu
        </Typography>
        <Stack
          sx={{ justifyContent: "center" }}
          direction="row"
        >
          <UpdateItemForm />
        </Stack>

        {/* </FormContainer>*/}
      </Container>
      {/* </section> */}
    </div>
  );
}

export default UpdateMaterialPage;
