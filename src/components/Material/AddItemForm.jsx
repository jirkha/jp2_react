import React, {useState, useEffect, useField} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TextField from "../Global/Textfield"
import SelectArrayWrapper from '../Global/Select/SelectArrayWrapper';
import SelectWrapper from '../Global/Select/SelectWrapper';
import { useDispatch, useSelector } from "react-redux";
import { getMaterial } from "../Store/Features/Material/materialSlice";
import { getMaterialType } from '../Store/Features/Material/materialTypeSlice';
import AddItemTypeForm from './AddItemTypeForm'

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
  IconButton,
} from "@mui/material";
import { Popup2 } from "../Global/Other/Popup2";


const AddItemForm = (props) => {
  
const dispatch = useDispatch();
const materialType = useSelector((state) => state.materialType.data)
const { setOpenPopup } = props;
const [openPopup2, setOpenPopup2] = useState(false);
    
useEffect(() => {
  dispatch(getMaterialType());
}, [SelectArrayWrapper]);

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
        dispatch(getMaterial()); //aktualizuje seznam materiálu
        dispatch(getMaterialType());
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
          spacing={1}
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
               <SelectArrayWrapper
                name="itemType"
                // size="small"
                label="Typ materiálu ..."
                options={materialType}
                required
              > 
                </SelectArrayWrapper>              
              {/* <Field name="itemType" as="select" className="select">
                <option value={""}>Vyberte ze seznamu...</option>
                {productOptions}
              </Field> */}
            </Grid>
            <Grid item xs={2}>
              {/* <AddButton.AddButton 
              fontSize="large" 
              color="success" 
              link="#itemTypeForm" 
              /> */}
              <Button sx={{height: "55px", maxWidth: "10px"}} variant="outlined" size="inherit" color="primary" onClick={() => setOpenPopup2(true)}>
                <AddOutlinedIcon />
              </Button>    
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
                onClick={() => setOpenPopup(false)}
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
  <Popup2 title="Vložení typu materiálu"
        openPopup2={openPopup2}
        setOpenPopup2={setOpenPopup2}
        >
          <AddItemTypeForm />
    
  </Popup2>
  </>
  );
};
export default AddItemForm