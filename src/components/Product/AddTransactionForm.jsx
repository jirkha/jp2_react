import React, {useState, useEffect, useRef, useField} from 'react'
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
import { getProduct } from '../Store/Features/Products/productSlice';
import { getSale } from '../Store/Features/Products/saleSlice';
import { getTransaction } from '../Store/Features/Products/transactionSlice';


import { 
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
  Divider,
  Stack
} from "@mui/material";
import DateTimePicker from '../Global/DateTimePicker';
import {ShowValue} from '../Global/Utils/showValue';
import { CurrentPrice } from '../Global/Utils/utils';




const AddTransactionForm = () => {

const dispatch = useDispatch();

const product = useSelector((state) => state.product.data)
const sale = useSelector((state) => state.sale.data)
const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

// const material = useSelector((state) => state.material.data)
const [productDetail, setProductDetail] = useState("");
const ref = useRef(null);
   
   const getProductDetail = () => {
      //  console.log("ref",ref.current.values)
      //  console.log("ref_pr",ref.current.values.product)
       Axios.get(`/api/product_detail/${ref.current.values.product}`)
       .then((res) => {
        setProductDetail(res.data.p_ser);
   })
  };

useEffect(() => {
  dispatch(getProduct());
  dispatch(getSale());
  console.log("useEffect runs")
  //console.log("productType: ",productType);
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
    price_variant: Yup.string(),
    note: Yup.string()
  });

  const initialValues = {
    day_of_sale: "",
    sales_channel: "",
    product: "",
    discount_increase: "0",
    quantity_of_product: 1,
    difference_price: 0,
    price_variant: "Kč",
    note: ""
  };

  //const navigate = useNavigate();

  const onSubmit = (values) => {
    //console.log("CurrentPrice")
    const { 
        day_of_sale,
        sales_channel,
        product,
        discount_increase,
        quantity_of_product,
        difference_price,
        price_variant,
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
        price_variant,
        note
    })
    .then(res => {
        console.log("Adding Transaction: ", res);
        //console.log("product ID: ", res.data.id);
        dispatch(getTransaction()); //aktualizuje seznam transakcí
        //navigate(`/product_detail/${res.data.id}`) //přesměruje na detail vytvořeného produktu
        setNotify({
          isOpen: true,
          message: 'Transakce byla úspěšně vložena',
          type: 'success'
        })
    }).catch((err) => {
        console.log(err.response.data);
        setNotify({
          isOpen: true,
          message: err.response.data,
          type: "error",
        });
      });
}

  // function showUnit(data) {
  //   // console.log("item_storage:",item);
  //   console.log("data_storage:", data);
  //   console.log("data:", data);
  //   var filtered = Object.fromEntries(
  //     Object.entries(product).filter(([k, v]) => v.id === data)
  //   );
  //   // console.log(
  //   //   "filtered",(filtered)
  //   // );
  //   var filteredUnit = Object.keys(filtered).map((key) => (
  //     console.log("key", filtered[key].price),
  //     <>{filtered[key].price} </>
  //   ));
  //   console.log("filteredUnit", filteredUnit);
    
  //   return <Typography>{filteredUnit}</Typography>;}

const changePrice = {
  "0": "Beze změny",
  "-": "Sleva",
  "+": "Navýšení"
  };

  const priceVariant = {
  "Kč": "Kč",
  "%": "%"
  };

  return (
    <>
    <Formik
      innerRef={ref}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
        //navigate('/');
      }}
    >
      {({ isValid, values }) => (
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

            <Grid item xs={10}>
               <SelectArrayWrapper
                name="sales_channel"
                // size="small"
                label="Zvolte prodejní kanál ..."
                options={sale}
                required
              > 
                </SelectArrayWrapper>              
            </Grid>
            <Grid item xs={2}>
              <AddButton.AddButton fontSize="large" color="success" link="/product" />              
            </Grid>

             <Grid item xs={10}>
               <SelectArrayWrapper
                name="product"
                // size="small"
                label="Zvolte produkt ..."
                options={product}
                onBlur={() => {getProductDetail()}}
                required
              > 
                </SelectArrayWrapper>   
                
            </Grid>
            <Grid item xs={2}>
              <AddButton.AddButton fontSize="large" color="success" link="/product" />              
            </Grid>
            
            <>
              
              {values.product && <Grid item xs={12}>
                <Typography
                variant="body1"
                color="primary"
                display="inline"
                style={{display: 'inline-block'}}
                component="span"
                //align="center" //zarovná doprostřed
                gutterBottom //vytvoří mezeru pod textem
                >
                  Standardní cena produktu <strong><ShowValue object={product} data={values.product} value="price" /> Kč </strong>
              </Typography>
            </Grid>}
            </>
            
     
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
                        
            {/* {values.discount_increase !== "0" && <Grid item xs={8}>
               <TextField 
                name="difference_price" 
                // size="small"
                label={(values.discount_increase === "-") ? "Snížení ceny" : "Navýšení ceny"} 
                InputProps={values.price_variant === "Kč" ? {
                  endAdornment: <InputAdornment position='end'>Kč</InputAdornment>} :
                {
                  endAdornment: <InputAdornment position='end'>%</InputAdornment>}}
                required variant="outlined" />
            </Grid>}
            
            {values.discount_increase !== "0" && <Grid item xs={4}>
               <SelectWrapper
                name="price_variant"
                // size="small"
                label=""
                options={priceVariant}
                required
              > 
                </SelectWrapper>              
            </Grid>} */}
            {values.discount_increase !== "0" && <Grid item xs={12}>
               <TextField 
                name="difference_price" 
                // size="small"
                label={(values.discount_increase === "-") ? "Snížení ceny" : "Navýšení ceny"} 
                InputProps={{
                  endAdornment: 
                  <SelectWrapper
                    name="price_variant"
                    size="small"
                    label=""
                    options={priceVariant}
                    required
                  > 
                </SelectWrapper>
                }}
                required variant="outlined" />
            </Grid>}    
            {values.difference_price < 1 && values.product &&
                <Grid item xs={12}>
                  <Typography color="primary">
                    Skladem {" "}<strong>
                      <ShowValue
                            object={product}
                            data={values.product}
                            value="stocked"
                          />{" "}ks</strong>{" "}
                      produktu
                  </Typography>
                </Grid>}
                
            {values.difference_price > 0 && values.product &&
            <Grid item xs={12}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <Typography
                  variant="body1"
                  color="primary"
                  display="inline"
                  style={{display: 'inline-block'}}
                  component="span"
                  //align="center" //zarovná doprostřed
                  gutterBottom //vytvoří mezeru pod textem
                  >
                    {CurrentPrice(productDetail.price, values.discount_increase, values.difference_price, values.price_variant)}
                </Typography>
                <Typography color="primary">
                  Skladem {" "}<strong>
                    <ShowValue
                          object={product}
                          data={values.product}
                          value="stocked"
                        />{" "}ks</strong>{" "}
                    produktu
                </Typography>

              </Stack>
            </Grid>}
         
            
            <Grid item xs={12}>
              <TextField 
                name="quantity_of_product" 
                // size="small"
                label="Množství prodaného zboží"
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
            </Grid>
            <Grid item xs={12}>
              <TextField id="note" name="note" label="Poznámka" multiline rows={6} variant="outlined" />
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