import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios'

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
        //navigate('/')
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

  const renderError = (message) => <p className="help is-danger">{message}</p>;

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
      <Form>
        {/* <div
          className="container"
          style={{
            width: "60%",
          }}
        > */}
          <div className="field">
            <label className="label" htmlFor="name">
              Název materiálu
            </label>
            <div className="control">
              <Field
                name="name"
                type="text"
                className="input"
                placeholder="Název"
              />
              <ErrorMessage name="name" render={renderError} />
            </div>
          </div>
        
          <div className="field">
            <label className="label" htmlFor="itemType">
              Typ produktu
            </label>
            <div className="control">
              <Field name="itemType" as="select" className="select is-fullwidth">
                <option value={""}>Vyberte ze seznamu...</option>
                {productOptions}
              </Field>
              <ErrorMessage name="itemType" render={renderError} />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="costs">
              Cena materiálu
            </label>
            <div className="control">
              <Field
                name="costs"
                type="number"
                className="input"
                placeholder="Cena"
              />
              <ErrorMessage name="costs" render={renderError} />
            </div>
          </div>
        
          <button type="submit" className="button is-primary">
            Přidat
          </button>
        {/* </div> */}
      </Form>
    </Formik>
  );
};
export default AddItemForm;