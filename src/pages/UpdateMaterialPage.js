import React from 'react'
import UpdateItemForm from "../components/Material/UpdateItemForm";
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
