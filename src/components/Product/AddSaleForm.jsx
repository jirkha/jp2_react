import React, {useState, useEffect, useField} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios'
//import { FormikTextField } from 'formik-material-fields';
import TextField from "../Global/Textfield"
import ItemTypesWrapper from "../Global/Select/ItemTypesWrapper"
// import { HashLink as Link } from "react-router-hash-link";

import * as AddButton from '../Material/AddButton';
import SelectArrayWrapper from '../Global/Select/SelectArrayWrapper';
import { useDispatch, useSelector } from "react-redux";
import { getSale } from "../Store/Features/Products/saleSlice";
import { getSaleType } from "../Store/Features/Products/saleTypeSlice";

import { 
  Typography,
  Grid,
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
} from "@mui/material";


const AddSaleForm = () => {

const dispatch = useDispatch();

const saleType = useSelector((state) => state.saleType.data)

useEffect(() => {
  dispatch(getSaleType());
  console.log("saleType: ",saleType)
}, [SelectArrayWrapper]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Prosím zadejte název prodejního kanálu"),//.oneOf(itemType),
    type: Yup.string().required("Prosím vyberte typ prodejního kanálu"),
    brand: Yup.bool(), //JPcandles A/N
    note: Yup.string()
  });

  const initialValues = {
    name: "",
    type: "",
    brand: true,
    note: ""
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { 
        name,
        type,
        brand,
        note
    } = values;
    console.log("values: : ", values);
    Axios.post('/api/sale_add/', {
        name,
        type,
        brand,
        note
    })
    .then(res => {
        console.log("Adding Sale: ", res);
        dispatch(getSale()); //aktualizuje seznam prodejních kanálů
        //navigate('/material')
    }).catch(err => console.log(err))
  }

  console.log("saleType: ",saleType)
//   const productOptions = itemType.map((opt, index) => (<option key={index} value={opt.id}>
//  {opt.name}
//  </option>
// ));

  // const renderError = (message) => <p style={errorStyle}>{message}</p>;

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
        <Box sx={{  flexWrap: "wrap", }}>
        <Grid 
          container 
          spacing={2}
          // justifyContent="center"
          //direction="column"
          maxWidth="430px"
          alignItems="flex-start"
          >
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                //color="textPrimary"
                //align="center" //zarovná doprostřed
                gutterBottom //vytvoří mezeru pod textem
                >Povinné údaje
              </Typography>
              <TextField id="name" name="name" label="Název" variant="outlined" required />
            </Grid>
            {/* <Grid item xs={10}>
               <ItemTypesWrapper
                name="product_type"
                // size="small"
                label="Typ produktu ..."
                //options={productOptions}
                required
              > 
                </ItemTypesWrapper>              
            </Grid>
            <Grid item xs={2}>
              <AddButton.AddButton fontSize="large" color="success" link="#itemTypeForm" />              
            </Grid> */}
            {/* <Grid item xs={6}>
              <TextField 
                id="costs" 
                name="costs" 
                // size="small"
                label="Cena materiálu (za kus/jednotku)" 
                helperText="Zadejte prosím pouze celé číslo (bez haléřů)"
                InputProps={{
                  endAdornment: <InputAdornment position='end'>Kč</InputAdornment>
                }}
                required variant="outlined" />
            </Grid> */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <SelectArrayWrapper
                  //id="unit" 
                  name="type" 
                  //value={unit}
                  label="Typ prodejního kanálu"
                  options={saleType}
                >
                </SelectArrayWrapper>
              </FormControl>
            </Grid>
                     
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                //color="textPrimary"
                //align="center" //zarovná doprostřed
                gutterBottom //vytvoří mezeru pod textem
                >Nepovinné údaje
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField id="note" name="note" label="Poznámka" multiline rows={6} variant="outlined" />
            </Grid>

            <Grid item xs={3}>
              {/* <Link to="#itemList"> */}
               <Button 
                type="submit" 
                className="button"
                variant="contained"
                //onClick={() => (<Link to="#itemList"></Link>)}
                // containerElement={<Link to="#itemList" />}
                // linkButton={true}
                >
                Přidat
                </Button> 
              {/* </Link> */}
             
            </Grid>
            <Grid item xs={9}>
              <Field
              as={FormControlLabel}
              type="checkbox"
              name="brand"
              control={<Checkbox />}
              label="Prodejní kanál pod značkou J&P"
            />
              {/* <FormGroup name="brand">
                <FormControlLabel control={<Checkbox name="brand" defaultChecked />} label="Prodejní kanál pod značkou J&P" />
              </FormGroup> */}
            </Grid>
          </Grid>
        </Box>
      </Form>
      
      )}
    </Formik>
    
  );
};
export default AddSaleForm