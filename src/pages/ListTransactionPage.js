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

      <Container component="section" id="transactionForm">
        <Typography
          variant="h2"
          sx={{ mt: 5 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Přidat transakci
        </Typography>
        <Stack sx={{ justifyContent: "center" }} direction="row">
          <AddTransactionForm />
        </Stack>
      </Container>
    
    </div>
  );
}

export default ListTransactionPage;