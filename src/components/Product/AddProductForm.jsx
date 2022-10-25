import React, {useState, useEffect, useField} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios'
import TextField from "../Global/Textfield"
import Notification from '../Global/Notifications/Notification';

import * as AddButton from '../Material/AddButton';
import SelectArrayWrapper from '../Global/Select/SelectArrayWrapper';
import SelectMultipleWrapper from '../Global/Select/SelectMultipleWrapper';
import { useDispatch, useSelector } from "react-redux";
import { getProductType } from '../Store/Features/Products/productTypeSlice';
import { getProduct } from '../Store/Features/Products/productSlice';
// import { getMaterial } from '../Store/Features/Material/materialSlice';

import { 
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";



const AddProductForm = () => {

const dispatch = useDispatch();

const productType = useSelector((state) => state.productType.data)
const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
// const material = useSelector((state) => state.material.data)

useEffect(() => {
  dispatch(getProductType());
  // dispatch(getMaterial());
  console.log("productType: ",productType);
  // console.log("material: ",material)
}, [SelectArrayWrapper]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Prosím zadejte název produktu"),//.oneOf(itemType),
    product_type: Yup.string().required("Prosím vyberte typ produktu"),
    //items: Yup.array().min(1).required("Vyberte prosím alespoň jednu položku"),
    price: Yup.number().min(0).max(1000000).required("Prosím zadejte prodejní cenu produktu (minimálně 0 a maximálně 1 000 000 Kč)"),
    stocked: Yup.number().min(0).max(1000000),
    procedure: Yup.string(),
    brand: Yup.bool(), //JPcandles A/N
    note: Yup.string()
  });

  const initialValues = {
    name: "",
    product_type: "",
    //items: [],
    price: 0,
    stocked: 0,
    procedure: "",
    brand: true,
    note: ""
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { 
        name,
        product_type,
        //items,
        price,
        stocked,
        procedure,
        brand,
        note
    } = values;
    console.log("values: : ", values);
    Axios.post('/api/product_add/', {
        name,
        product_type,
        //items,
        price,
        stocked,
        procedure,
        brand,
        note
    })
    .then(res => {
        console.log("Adding Product: ", res);
        //console.log("product ID: ", res.data.id);
        dispatch(getProduct()); //aktualizuje seznam produktů
        navigate(`/product_detail/${res.data.id}`) //přesměruje na detail vytvořeného produktu
        setNotify({
          isOpen: true,
          message: 'Zadejte prosím materiál obsažený v produktu níže na této stránce',
          type: 'info'
        })
    }).catch(err => console.log(err))
}

//   const productOptions = itemType.map((opt, index) => (<option key={index} value={opt.id}>
//  {opt.name}
//  </option>
// ));

  // const renderError = (message) => <p style={errorStyle}>{message}</p>;

  return (
    <>
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
            <Grid item xs={10}>
               <SelectArrayWrapper
                name="product_type"
                // size="small"
                label="Typ produktu ..."
                options={productType}
                required
              > 
                </SelectArrayWrapper>              
            </Grid>
            <Grid item xs={2}>
              <AddButton.AddButton fontSize="large" color="success" link="#productTypeForm" />              
            </Grid>
             
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="primary"
                //align="center" //zarovná doprostřed
                gutterBottom //vytvoří mezeru pod textem
                >Obsah produktu zadejte po uložení na další obrazovce
              </Typography>            
            </Grid>
            <Grid item xs={6}>
              <TextField 
                id="price" 
                name="price" 
                // size="small"
                label="Prodejní cena produktu"
                helperText="Zadejte celé číslo (bez haléřů)"
                InputProps={{
                  endAdornment: <InputAdornment position='end'>Kč</InputAdornment>
                }}
                required variant="outlined" />
            </Grid>
            <Grid item xs={6}>
               <TextField 
                id="stocked" 
                name="stocked" 
                // size="small"
                label="Naskladněné množství" 
                InputProps={{
                  endAdornment: <InputAdornment position='end'>ks</InputAdornment>
                }}
                required variant="outlined" />
            </Grid>
         
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                //color="textPrimary"
                //align="center" //zarovná doprostřed
                gutterBottom //vytvoří mezeru pod textem
                >Nepovinné údaje
              </Typography>
              <TextField id="procedure" name="procedure" multiline rows={8} label="Výrobní postup" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="note" name="note" label="Poznámka" multiline rows={6} variant="outlined" />
            </Grid>

            <Grid item xs={3}>
               <Button 
                type="submit" 
                className="button"
                variant="contained"
                >
                Přidat
                </Button>            
            </Grid>
             <Grid item xs={9}>
              <Field
              as={FormControlLabel}
              type="checkbox"
              name="brand"
              control={<Checkbox />}
              label="Produkt pod značkou J&P"
            />
        </Grid>
        </Grid>
        </Box>
      </Form>
      
      )}
    </Formik>
    <Notification
      notify={notify}
      setNotify={setNotify}
      />
    </>
  );
};
export default AddProductForm