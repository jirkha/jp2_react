import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Axios from 'axios'
import TextField from "../Global/Textfield"

import { useDispatch } from "react-redux";
import { getSaleType } from "../Store/Features/Products/saleTypeSlice";

import { 
  Typography,
  Grid,
  Button,
  Stack
} from "@mui/material";


const AddSaleTypeForm = () => {

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Prosím zadejte název")
  });

  const initialValues = {
    name: ""
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { name
    } = values;
    console.log("values: : ", values);
    Axios.post('/api/saleType_add/', {
        name
    })
    .then(res => {
        console.log("Adding SaleType: ", res);
        dispatch(getSaleType());
        //navigate('/material')
    }).catch(err => console.log(err))
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
        //navigate('/');
      }}
    >
      {({ isValid }) => (
      <Form>
          <Stack
        sx={{ justifyContent: "center" }}
        direction="row"
        spacing={2}
      >
        <Grid 
          container 
          spacing={2}
          alignItems="center"
          maxWidth="550px"
          >
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                >Povinný údaj
              </Typography>
              </Grid>
               <Grid item xs={12}>
              <TextField fullWidth id="name" name="name" label="Název" variant="outlined" required />
            </Grid>
            <Grid item xs={12}>
            <Button 
              type="submit" 
              className="button"
              variant="contained"
              >
            Přidat
            </Button> 
            </Grid>
        </Grid>
        </Stack>
      </Form>
      )}
    </Formik>
    
  );
};
export default AddSaleTypeForm