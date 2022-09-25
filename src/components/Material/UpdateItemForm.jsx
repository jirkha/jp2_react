import React, {useState, useEffect, useField} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios'
//import { FormikTextField } from 'formik-material-fields';
import TextField from "../Global/Textfield"
import Select from "../Global/Select"
import DateTimePicker from "../Global/DateTimePicker"

import { 
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";

//function AddItemForm () {
const UpdateItemForm = () => {
  
  let { materialId } = useParams();

  let [material, setMaterial] = useState([])
  let [materialType, setMaterialType] = useState([])

  useEffect(() => {
    getMaterial();
    getMaterialType();
  }, [materialId]);

    let getMaterial = async () => {
      let response = await fetch(`/api/item_detail/${materialId}`);
      let data = await response.json();
      console.log("načtená data:",data.m_ser)
      setMaterial(data.m_ser);
    };
  
  let getMaterialType = async () => {
    let response = await fetch('/api/item_types/')
    let data = await response.json()
    //console.log(data)
    setMaterialType(data)
  }

    const re = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

  const validationSchema = Yup.object({
    itemType: Yup.string().required("Prosím vyberte typ materiálu"),//.oneOf(itemType),
    name: Yup.string().required("Prosím zadejte název položky"),
    costs: Yup.number().min(0).max(1000000000).required("Prosím zadejte cenu položky (minimálně 0 a maximálně 1 000 000 000 Kč)"),
    supplier: Yup.string(),
    link: Yup.string().matches(re,'Zadejte prosím platný odkaz'),
    note: Yup.string()
  });

  const initialValues = {
    name: material?.name ?? "",
    itemType: "Vyberte typ...", //material.type.name,
    costs: material?.costs ?? "",
    supplier: material?.supplier ?? "",
    link: material?.link ?? "",
    note: material?.note ?? "",
  };

  // const initialValues = (material)

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { name,
        itemType,
        costs,
        supplier,
        link,
        note
    } = values;
    console.log("values: : ", values);
    Axios.put(`/api/item_update/${materialId}/`, {
        name,
        itemType,
        costs,
        supplier,
        link,
        note
    })
    .then(res => {
        console.log("Updating Item: : ", res);
        console.log("type: ",res.data.type);
        navigate('/material')
    }).catch(err => console.log(err))
  }


  //declaration of products
  //declaration of validationSchema
  //declaration of initialValues
  //declaration of onSubmit callback

//   const productOptions = itemType.map((opt, index) => (<option key={index} value={opt.id}>
//  {opt.name}
//  </option>
// ));

  // const renderError = (message) => <p style={errorStyle}>{message}</p>;
  

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      // values={material}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
        navigate('/');
      }}
    >
      {({ isValid }) => (
      <Form>
        <Box sx={{  flexWrap: "wrap", }}>
        <Grid 
          container 
          spacing={2}
          // justifyContent="center"
          direction="column"
          maxWidth="550px"
          //alignItems="baseline"
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
              <TextField id="name" InputLabelProps={{
            shrink: true,
          }} name="name" label="Název" variant="outlined" required />
            </Grid>
            <Grid item xs={12}>
               <Select
                name="itemType"
                // size="small"
                label="Typ materiálu ..."
                InputLabelProps={{
            shrink: true,
          }}
                //options={productOptions}
                required
              > 
                </Select>               
              {/* <Field name="itemType" as="select" className="select">
                <option value={""}>Vyberte ze seznamu...</option>
                {productOptions}
              </Field> */}
            </Grid>
            <Grid item xs={12}>
              <TextField 
                id="costs" 
                name="costs" 
                InputLabelProps={{
            shrink: true,
          }}
                // size="small"
                label="Cena materiálu (za kus/jednotku)" 
                helperText="Zadejte prosím pouze celé číslo (bez haléřů)"
                InputProps={{
                  endAdornment: <InputAdornment position='end'>Kč / ks (jednotka)</InputAdornment>
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
              <TextField id="supplier" InputLabelProps={{
            shrink: true,
          }} name="supplier" label="Dodavatel / Obchod" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="link" name="link" InputLabelProps={{
            shrink: true,
          }} label="Odkaz na materiál" helperText="Zadejte prosím platný odkaz" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="note" name="note" InputLabelProps={{
            shrink: true,
          }} label="Poznámka" multiline rows={6} variant="outlined" />
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
export default UpdateItemForm