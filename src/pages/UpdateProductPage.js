import React from 'react'
import UpdateProductForm from "../components/Product/UpdateProductForm";
import { Container, Typography, Stack } from "@mui/material";


function UpdateProductPage() {

  return (
    <div>
      <Container component="section" id="productForm">
        {/*<FormContainer> */}
        <Typography
          variant="h2"
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Editace produktu
        </Typography>
        <Stack sx={{ justifyContent: "center" }} direction="row">
          <UpdateProductForm />
        </Stack>

        {/* </FormContainer>*/}
      </Container>
      {/* </section> */}
    </div>
  );
}

export default UpdateProductPage;
