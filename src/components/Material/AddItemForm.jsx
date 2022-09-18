import React, {useState, useEffect, useField} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios'
//import { FormikTextField } from 'formik-material-fields';
import TextField from "../Global/Textfield"
import Select from "../Global/Select"

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import {
  JPinput,
  selectStyle,
  JPLabel,
  JPError,
  errorStyle,
} from '../../styles/styles.js'



//function AddItemForm () {
const AddItemForm = () => {
  
  const [itemType, setItemType] = useState([]);

    useEffect(() => {
        Axios.get('/api/item_types/')
        .then(res => {
        console.log("MaterialTypes: ", res.data)
        setItemType(res.data)      
        }).catch(err => console.log(err))
    }, [])

  const validationSchema = Yup.object({
    itemType: Yup.string().required("Prosím vyberte typ materiálu"),//.oneOf(itemType),
    name: Yup.string().required("Prosím zadejte název položky"),
    costs: Yup.number().min(0).max(1000000000).required("Prosím zadejte cenu položky (minimálně 0 a maximálně 1 000 000 000 Kč)"),
    supplier: Yup.string(),
    link: Yup.string().url(),
    note: Yup.string()
  });

  const initialValues = {
    name: "",
    itemType: "",
    costs: 0,
    supplier: "",
    link: "",
    note: ""
  };

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
    Axios.post('/api/item_add/', {
        name,
        itemType,
        costs,
        supplier,
        link,
        note
    })
    .then(res => {
        console.log("Adding Item: : ", res);
        console.log("type: ",res.data.type);
        navigate('/material')
    }).catch(err => console.log(err))
  }


  //declaration of products
  //declaration of validationSchema
  //declaration of initialValues
  //declaration of onSubmit callback

  const productOptions = itemType.map((opt, index) => (<option key={index} value={opt.id}>
 {opt.name}
 </option>
));

  const renderError = (message) => <p style={errorStyle}>{message}</p>;
  

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
        <Grid 
          container 
          spacing={0}
          direction="column"
          alignItems="center"
          >
        {/* <div
          className="container"
          style={{
            width: "50%",
          }}
        > */}
          {/* <div className="field"> */}
            
            {/* <JPLabel className="label" htmlFor="name">
            </JPLabel> */}
            <TextField id="name" name="name" label="Název*" variant="outlined" />
            {/* <JPinput
                name="name"
                type="name"
                className="input"
                placeholder="Název"
              /> */}
              {/* <ErrorMessage name="name" render={renderError} /> */}
            {/* </div>
        
          </div> */}
          <Select
            name="itemType"
            label="Typ materiálu ..."
            options={productOptions}
          />
        
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

          <div className="field">
            <JPLabel className="label" htmlFor="costs">
              Cena materiálu*
            </JPLabel>
            <div className="control">
              <JPinput
                name="costs"
                type="number"
                className="input"
                placeholder="Cena"
              />
              <ErrorMessage name="costs" render={renderError} />
            </div>
          </div>

          <div className="field">
            <JPLabel className="label" htmlFor="supplier">
              Dodavatel
            </JPLabel>
            <div className="control">
              <JPinput
                name="supplier"
                type="text"
                className="input"
                placeholder="Název dodavatele nebo obchodu"
              />
              <ErrorMessage name="supplier" render={renderError} />
            </div>
          </div>

          <div className="field">
            <JPLabel className="label" htmlFor="link">
              Odkaz na materiál
            </JPLabel>
            <div className="control">
              <JPinput
                name="link"
                type="url"
                className="input"
                placeholder="https://www.example.cz"
              />
              <ErrorMessage name="link" render={renderError} />
            </div>
          </div>

          <div className="field">
            <JPLabel className="label" htmlFor="note">
              Poznámka
            </JPLabel>
            <div className="control">
              <Field
                name="note"
                type="text"
                component="textarea"
                style={selectStyle}
                className="input"
                placeholder=""
              />
              <ErrorMessage name="note" render={renderError} />
            </div>
          </div>
        
          <Button 
            type="submit" 
            //className="button"
            variant="contained"
             >
            Přidat
          </Button>
        {/* </div> */}
        </Grid>
      </Form>
      )}
    </Formik>
  );
};
export default AddItemForm