import React, {useState, useEffect, useField} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios'
//import { FormikTextField } from 'formik-material-fields';
import TextField from "../Global/Textfield"
import ItemTypesWrapper from "../Global/Select/ItemTypesWrapper"
// import { HashLink as Link } from "react-router-hash-link";

import * as AddButton from './AddButton';
import SelectWrapper from '../Global/Select/SelectWrapper';
import { useDispatch } from "react-redux";
import { getMaterial } from "../Store/Features/Material/materialSlice";

import { 
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Stack,
} from "@mui/material";


const AddItemForm = () => {
  
// useEffect(() => {
//   dispatch(getMaterial());
// }, []);

//const material = useSelector((state) => state.material.data)

const dispatch = useDispatch();
  // const [itemType, setItemType] = useState([]);

  //   useEffect(() => {
  //       Axios.get('/api/item_types/')
  //       .then(res => {
  //       console.log("MaterialTypes: ", res.data)
  //       setItemType(res.data)      
  //       }).catch(err => console.log(err))
  //   }, [])

  // const [material, setMaterial] = useState([]);

// useEffect(() => {
//   getMaterial();
// }, []);

// const getMaterial = () => {
//   Axios.get("/api/list_items/").then((res) => {
//     setMaterial(res.data);
//     console.log("Data načtena");
//     console.log("res.data", res.data);
//   });
// };


    const re = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

  const validationSchema = Yup.object({
    itemType: Yup.string().required("Prosím vyberte typ materiálu"),//.oneOf(itemType),
    name: Yup.string().required("Prosím zadejte název položky"),
    costs: Yup.number().min(0).max(1000000000).required("Prosím zadejte cenu položky (minimálně 0 a maximálně 1 000 000 000 Kč)"),
    unit: Yup.string().required("Prosím vyberte jednotku"),
    supplier: Yup.string(),
    link: Yup.string().matches(re,'Zadejte prosím platný odkaz'),
    note: Yup.string()
  });

  const initialValues = {
    name: "",
    itemType: "",
    costs: 0,
    unit: "",
    supplier: "",
    link: "",
    note: "",
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { name,
        itemType,
        costs,
        unit,
        supplier,
        link,
        note
    } = values;
    console.log("values: : ", values);
    Axios.post('/api/item_add/', {
        name,
        itemType,
        costs,
        unit,
        supplier,
        link,
        note
    })
    .then(res => {
        console.log("Adding Item: ", res);
        console.log("type: ", res.data.type);
        dispatch(getMaterial()); //aktualizuje seznam materiálu
        //navigate('/material')
    }).catch(err => console.log(err))
  }

//   const productOptions = itemType.map((opt, index) => (<option key={index} value={opt.id}>
//  {opt.name}
//  </option>
// ));

  // const renderError = (message) => <p style={errorStyle}>{message}</p>;

  const optionsUnit = {
  "ks": "ks",
  "g": "g",
  "kg": "kg",
  "l": "l",
  "ml": "ml",
  };
  

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
            {/* <JPLabel className="label" htmlFor="name">
            </JPLabel> */}
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
               <ItemTypesWrapper
                name="itemType"
                // size="small"
                label="Typ materiálu ..."
                //options={productOptions}
                required
              > 
                </ItemTypesWrapper>              
              {/* <Field name="itemType" as="select" className="select">
                <option value={""}>Vyberte ze seznamu...</option>
                {productOptions}
              </Field> */}
            </Grid>
            <Grid item xs={2}>
              <AddButton.AddButton fontSize="large" color="success" link="#itemTypeForm" />              
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <SelectWrapper
                  //id="unit" 
                  name="unit" 
                  //value={unit}
                  label="Jednotka"
                  options={optionsUnit}
                >
                </SelectWrapper>
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
              <TextField id="supplier" name="supplier" label="Dodavatel / Obchod" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="link" name="link" label="Odkaz na materiál" helperText="Zadejte prosím platný odkaz" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="note" name="note" label="Poznámka" multiline rows={6} variant="outlined" />
            </Grid>

            <Grid item xs={12}>
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

            
            {/* <JPinput
                name="name"
                type="name"
                className="input"
                placeholder="Název"
              /> */}
              {/* <ErrorMessage name="name" render={renderError} /> */}
            {/* </div>
        
          </div> */}
         
        
          {/* <div className="field">
            <JPLabel className="label" htmlFor="itemType">
              Typ produktu*
            </JPLabel>
            <div className="control">
              <Field name="itemType" style={selectStyle} as="select" className="select">
                <option value={""}>Vyberte ze seznamu...</option>
                {productOptions}
              </Field>
              <ErrorMessage name="itemType" render={renderError} />
            </div>
          </div> */}
        
        
        </Grid>
        </Box>
      </Form>
      
      )}
    </Formik>
    
  );
};
export default AddItemForm