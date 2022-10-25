import React from 'react'

import * as AddButton from '../components/Material/AddButton';
import AddProductTypeForm from "../components/Product/AddProductTypeForm";
import AddProductForm from "../components/Product/AddProductForm";
import AddSaleTypeForm from "../components/Product/AddSaleTypeForm";
import AddSaleForm from "../components/Product/AddSaleForm";
import TableTransaction from "../components/Product/TableTransaction";

import { Container, Typography, Stack } from "@mui/material";
import AddTransactionForm from '../components/Product/AddTransactionForm';


function ListTransactionPage() {

  return (
    <div>
      <Container component="section" id="transactionList">
        <Typography
          variant="h2"
          sx={{ mt: 3 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Seznam transakcí{" "}
          <AddButton.AddButton
            fontSize="inherit"
            color="success"
            link="#transactionForm"
          />
        </Typography>
        <TableTransaction />
      </Container>
      <Container>
        <AddTransactionForm />
      </Container>
{/* 
      <Container component="section" id="productForm">
        <Typography
          variant="h2"
          sx={{ mt: 5 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Přidat produkt
        </Typography>
        <Stack sx={{ justifyContent: "center" }} direction="row">
          <AddProductForm />
        </Stack>
      </Container>

      <Container component="section" id="productTypeForm">
        <Typography
          sx={{ mt: 5 }} //mezera nad textem
          variant="h2"
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Přidat typ produktu
        </Typography>
        <Stack sx={{ justifyContent: "center" }} direction="row">
          <AddProductTypeForm />
        </Stack>
      </Container>

      <Container component="section" id="saleForm">
        <Typography
          sx={{ mt: 5 }} //mezera nad textem
          variant="h2"
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Přidat prodejní kanál
        </Typography>
        <Stack sx={{ justifyContent: "center" }} direction="row">
          <AddSaleForm />
        </Stack>
      </Container>

      <Container component="section" id="saleTypeForm">
        <Typography
          sx={{ mt: 5 }} //mezera nad textem
          variant="h2"
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Přidat typ prodejního kanálu
        </Typography>
        <Stack sx={{ justifyContent: "center" }} direction="row">
          <AddSaleTypeForm />
        </Stack>
      </Container> */}
    </div>
  );
}

export default ListTransactionPage;