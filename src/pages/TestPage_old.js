import React, {useState, useEffect} from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios'

const ProductReviewForm = () => {
  
  const [itemType, setItemType] = useState([]);

    useEffect(() => {
      Axios.get('/api/item_types/')
      .then(res => {
        console.log("MaterialTypes: ", res.data)
        setItemType(res.data)      
      }).catch(err => console.log(err))
    }, [])

  const validationSchema = Yup.object({
    itemType: Yup.string().required("Please select a product"),//.oneOf(itemType),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    title: Yup.string().required(),
    review: Yup.string().required(),
    costs: Yup.number().min(1).max(10).required(),
    date: Yup.date().default(() => new Date()),
    wouldRecommend: Yup.boolean().default(false),
  });

  const initialValues = {
    name: "",
    email: "",
    title: "",
    review: "",
    costs: "",
    date: new Date(),
    wouldRecommend: false,
    itemType: "",
  };

    const onSubmit = (values)  => {
      values.preventDefault();
      Axios.post('/api/item_add/', {
        // name,
        // itemType,
        // costs,
        // supplier,
        // link,
        // note
      }).then(res => {
        console.log("Adding Item: : ", res)
        console.log("type: ",res.data.type)
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
      }}
    >
      <Form>
        <div
          className="container"
          style={{
            width: "60%",
          }}
        >
          <div className="field">
            <label className="label" htmlFor="name">
              Full name
            </label>
            <div className="control">
              <Field
                name="name"
                type="text"
                className="input"
                placeholder="Full name"
              />
              <ErrorMessage name="name" render={renderError} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              Email address
            </label>
            <div className="control">
              <Field
                name="email"
                type="text"
                className="input"
                placeholder="Email address"
              />
              <ErrorMessage name="email" render={renderError} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="itemType">
              Product
            </label>
            <div className="control">
              <Field name="itemType" as="select" className="select is-fullwidth">
                <option value={""}>Select a product</option>
                {productOptions}
              </Field>
              <ErrorMessage name="itemType" render={renderError} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="title">
              Title
            </label>
            <div className="control">
              <Field
                name="title"
                type="text"
                className="input"
                placeholder="Title"
              />
              <ErrorMessage name="title" render={renderError} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="review">
              Review
            </label>
            <div className="control">
              <Field
                name="review"
                as="textarea"
                className="textarea"
                placeholder="Review"
              />
              <ErrorMessage name="review" render={renderError} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="costs">
              Rating
            </label>
            <div className="control">
              <Field
                name="costs"
                type="number"
                className="input"
                placeholder="Costs"
              />
              <ErrorMessage name="costs" render={renderError} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox label" htmlFor="wouldRecommend">
                <Field
                  name="wouldRecommend"
                  type="checkbox"
                  className="checkbox"
                />
                Would recommend
              </label>
            </div>
          </div>
          <button type="submit" className="button is-primary">
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default ProductReviewForm;