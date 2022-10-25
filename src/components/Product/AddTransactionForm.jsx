import React, {useState, useEffect, useField} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios'
import TextField from "../Global/Textfield"
import Notification from '../Global/Notifications/Notification';
import SelectWrapper from '../Global/Select/SelectWrapper';

import * as AddButton from '../Material/AddButton';
import SelectArrayWrapper from '../Global/Select/SelectArrayWrapper';
import SelectMultipleWrapper from '../Global/Select/SelectMultipleWrapper';
import { useDispatch, useSelector } from "react-redux";
import { getProductType } from '../Store/Features/Products/productTypeSlice';
import { getSale } from '../Store/Features/Products/saleSlice';
import { getTransaction } from '../Store/Features/Products/transactionSlice';


import { 
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DateTimePicker from '../Global/DateTimePicker';




const AddTransactionForm = () => {

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
    day_of_sale: "",
    sales_channel: Yup.string().required("Prosím vyberte prodejní kanál"),
    product: Yup.string().required("Prosím vyberte produkt"),
    discount_increase: Yup.string(),
    //items: Yup.array().min(1).required("Vyberte prosím alespoň jednu položku"),
    quantity_of_product: Yup.number().min(1).max(1000000).required("Prosím zadejte počet prodaných produktů (minimálně 1 a maximálně 1 000 000 ks)"),
    difference_price: Yup.number().min(0).max(1000000),
    note: Yup.string()
  });

  const initialValues = {
    day_of_sale: "",
    sales_channel: "",
    product: "",
    discount_increase: "",
    quantity_of_product: 1,
    difference_price: "",
    note: ""
  };

  //const navigate = useNavigate();

  const onSubmit = (values) => {
    const { 
        day_of_sale,
        sales_channel,
        product,
        discount_increase,
        quantity_of_product,
        difference_price,
        note
    } = values;
    //console.log("values: : ", values);
    Axios.post('/api/transaction_add/', {
        day_of_sale,
        sales_channel,
        product,
        discount_increase,
        quantity_of_product,
        difference_price,
        note
    })
    .then(res => {
        console.log("Adding Transaction: ", res);
        //console.log("product ID: ", res.data.id);
        dispatch(getTransaction()); //aktualizuje seznam produktů
        //navigate(`/product_detail/${res.data.id}`) //přesměruje na detail vytvořeného produktu
        setNotify({
          isOpen: true,
          message: 'Transakce byla úspěšně vložena',
          type: 'success'
        })
    }).catch(err => console.log(err))
}

const changePrice = {
  "0": "Beze změny",
  "-": "Sleva",
  "+": "Navýšení"
  };

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
              <DateTimePicker 
                      name="day_of_sale"
                      label="Datum uskutečnění transakce"
                      variant="outlined"
                      required />
            </Grid>
                      <Grid item xs={12}>
               <SelectWrapper
                name="discount_increase"
                // size="small"
                label="Úprava ceny"
                options={changePrice}
                required
              > 
                </SelectWrapper>              
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
export default AddTransactionForm