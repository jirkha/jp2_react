import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
// import ItemForm from '../components/ItemForm'
import { AddButton } from '../components/AddButton'
import Axios from 'axios'
import AsyncSelect from 'react-select/async'

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
  import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

  const schema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    costs: yup.number().positive().integer().required(),
    supplier: yup.string(),
    link: yup.string(),
    note: yup.string()
});

export default function TestPage() {

  // const onSubmit = data => console.log(data);
  const onSubmit = (data) => {
    console.log(data);
    //postItem(data);
  };

  const [inputValue, setValue] = useState('');
    const [type, setSelectedValue] = useState(null);

    let [name, setName] = useState('')
    //let [type, setType] = useState('')
    let [costs, setCosts] = useState(0)
    let [supplier, setSupplier] = useState('')
    let [link, setLink] = useState('')
    let [note, setNote] = useState('')

    const [isValid, setIsValid] = useState(false);

    // This effect runs when 'data' changes
    useEffect(() => {
      // If there is data, the form is valid
      setIsValid(type ? true : false);
    }, [type]);

    // handle input change event
  const handleInputChange = value => {
    setValue(value);
    console.log("handleInputChange: ",value)
  };

  // handle selection
  // const handleChange = value => {
  //   //setSelectedValue(value.id);
  //   if (value.type === "---") {console.log("no selection")}
  //    else {setSelectedValue(value)};
  //   console.log("handleChange: ",value);
  // }

    // handle selection
  const handleChange = value => {
    //setSelectedValue(value.id);
    setSelectedValue(value);
    console.log("handleChange: ",value)
  }

  const fetchItemTypes = () => {
    return  Axios.get('/api/item_types/')
    .then(result => {
      const res =  result.data;
      return res;
    }).catch(err => console.log(err));
  }

  const postItem = (e) => {
      e.preventDefault();
      Axios.post('/api/item_add/', {
        name,
        type,
        costs,
        supplier,
        link,
        note
      }).then(res => {
        console.log("Adding Item: : ", res)
        console.log("type: ",res.data.type)
    }).catch(err => console.log(err))
  }

  const handleClick = event => {
    handleSubmit(onSubmit);
    postItem(event)
  }


// ...
const { register, handleSubmit, formState: { errors }, control } = useForm({
  // use mode to specify the event that triggers each input field 
  resolver: yupResolver(schema)
});

const selectOptions = [
  { value: "student", label: "Student" },
  { value: "developer", label: "Developer" },
  { value: "manager", label: "Manager" }
];

const registerOptions = {
  // ...
  role: { required: "Role is required" }
};

const onChange = value => {
        setSelectedValue(value);
        console.log("handleChange: ",value)
    }
  const default_value = '---'


  return (
    <form id="formName" onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register("name")}
        value={name}
        id="name"
        onChange={(e) => setName(e.target.value)}
        />
      <p>{errors.name?.message}</p>
      {errors.name && errors.name.message}

      <Controller
        name="type"
        
        control={control}
        rules={{ required: true }}
        //defaultValue={default_value}
        render={({ field: { onChange, handleInputChange, value, type, ref } }) => (
          <AsyncSelect
        //render={({ field }) => (<AsyncSelect
            //{...field}
            {...register("type")}
            cacheOptions
            
            //defaultValue={default_value}
            defaultOptions
            placeholder={"Vyberte možnost..."}
            loadOptions={fetchItemTypes}
            onInputChange={handleInputChange}
            value={type}
            getOptionLabel={e => e.name}
            getOptionValue={e => e.id}
            // onChange={val => onChange(val.value)}
            onChange={handleChange}
            //onChange={setSelectedValue}
            // styles={customStyles}
        />
    )}
/>
        {/* <AsyncSelect
      cacheOptions
      defaultOptions
      placeholder="Vyberte možnost..."
      name='type'
      {...register('type')}
      value={type}
      getOptionLabel={e => e.name}
      getOptionValue={e => e.id}
      loadOptions={fetchUsers}
      onInputChange={handleInputChange}
      onChange={val => {
                        onChange(val.type);
                        handleChange(val);
      }}
        />
      )}
    /> */}
    <small className="text-danger">
      {errors?.type && errors.type.message}
    </small>

      
      {!isValid && <p>Vyberte typ materiálu</p>}
      <p>{ errors.type?.message }</p>

      {/* nekontroluje name ani type */}
      <Button 
        type='submit'
        form="formName"
        //disabled={!isValid}
        onClick={postItem}
        //onSubmit={postItem}
        >
            Uložit
      </Button>

      {/* kontroluje name
      nevnímá type (bere pole jako nevyplněné a nepustí dál) */}
      {/* <Button 
        type='submit'
        form="formName"
        disabled={!isValid}
        //onClick={postItem}
        onSubmit={postItem}
        >
            Uložit
      </Button> */}
      
      {/* nevnímá type (bere pole jako nevyplněné a nepustí dál)
      kontrolje name */}
      {/* <input 
        type="submit"
        disabled={!isValid}
        form="formName"
        onSubmit={postItem}
        //onClick={postItem}
         /> */}

      {/* nekontroluje name ani type */}
      {/* <input 
        type="submit"
        //disabled={!isValid}
        form="formName"
        //onSubmit={postItem}
        onClick={postItem}
         /> */}
    </form >
  );
}
// return (
//     // <div className="item">
//     //   <FormContainer>
//     //       <h1>Vložení materiálu</h1>
//     //       <div>
//     //         {/* <Form onSubmit={submitHandler}> */}
//     //         <Form>
//     //             <Form.Group controlId='name'>
//     //                 <Form.Label>Název</Form.Label>
//     //                 <Form.Control
//     //                     type='name'
//     //                     required
//     //                     // isrequired='true'
//     //                     placeholder='Vložte název položky'
//     //                     value={name}
//     //                     onChange={(e) => setName(e.target.value)}
//     //                 >
//     //                 </Form.Control>
//     //             </Form.Group>
//     //             <Form.Group controlId='materialType'>
//     //                 <Form.Label>Typ materiálu</Form.Label>
//     //                 {/* <Form.Select as="select" 
//     //                     required
//     //                     isrequired='true'
//     //                     value={type}
//     //                     onChange={(e) => setType(e.target.value).bind(e.target.value)}>
//     //                   {materialType.map((opt, index) => (<option key={index} value={opt.id}>
//     //                     {opt.name}
//     //                     </option>
//     //                   ))}
//     //                 </Form.Select> */}
//     //                 <AsyncSelect
//     //                   cacheOptions
//     //                   defaultOptions
//     //                   value={type}
//     //                   getOptionLabel={e => e.name}
//     //                   getOptionValue={e => e.id}
//     //                   loadOptions={fetchUsers}
//     //                   onInputChange={handleInputChange}
//     //                   onChange={handleChange}
//     //                 />
//     //             </Form.Group>
//     //             {/* <AsyncSelect loadOptions={loadOptions} defaultOptions isSearchable onChange={handleChange} /> */}
//     //             <Form.Group controlId='costs'>
//     //                 <Form.Label>Cena</Form.Label>
//     //                 <Form.Control
//     //                     type='number'
//     //                     required
//     //                     placeholder='Cena za 1 ks/jednotku (např.kg)'
//     //                     value={costs}
//     //                     onChange={(e) => setCosts(e.target.value)}
//     //                 >
//     //                 </Form.Control>
//     //             </Form.Group>
//     //             <Form.Group controlId='supplier'>
//     //                 <Form.Label>Dodavatel</Form.Label>
//     //                 <Form.Control
//     //                     type='text'
//     //                     placeholder='Název dodavatele nebo obchodu'
//     //                     value={supplier}
//     //                     custom="true"
//     //                     onChange={(e) => setSupplier(e.target.value)}
//     //                 >
//     //                 </Form.Control>
//     //             </Form.Group>
//     //             <Form.Group controlId='link'>
//     //                 <Form.Label>Odkaz</Form.Label>
//     //                 <Form.Control
//     //                     type='url'
//     //                     placeholder='Odkaz na výrobek'
//     //                     value={link}
//     //                     custom="true"
//     //                     onChange={(e) => setLink(e.target.value)}
//     //                 >
//     //                 </Form.Control>
//     //             </Form.Group>
//     //             {/* <Form.Group controlId='note'>
//     //                 <Form.Label>Poznámka</Form.Label>
//     //                 <Form.Control
//     //                     type='textarea'
//     //                     placeholder=''
//     //                     value={note}
//     //                     custom
//     //                     onChange={(e) => setNote(e.target.value)}
//     //                 >
//     //                 </Form.Control>
//     //             </Form.Group> */}
//     //             <textarea className="form-control" placeholder='Poznámka' value={note} rows="5" id="comment" custom="true" onChange={(e) => setNote(e.target.value)}>
//     //             </textarea>
//     //             <Button type='submit' variant='primary' onClick={postItem}>
//     //                               Uložit
//     //                       </Button>
//     //             <AddButton type='submit'/>
//     //         {/* </Form> */}
//     //         </Form>
//     //       </div>
//     //   </FormContainer>
//     // </div>

//      <div className="item-form">
//       <FormContainer>
//           <h1>Vložení materiálu</h1>
//           <div>
//             <form onSubmit={handleSubmit(submitForm)}>
//             {/* <Form> */}
//               <input 
//                 {...register("name")}
//                 value={name}
//                 id="name"
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <p>{errors.name?.message}</p>
//               {/* {errors.name && errors.name.message} */}
//                 {/* <Form.Group controlId='name'>
//                     <Form.Label>Název</Form.Label>
//                     <Form.Control
//                         name='name'
//                         type='name'
//                         {...register("name", {
//                     required: "Required",
//                   })}
//                         placeholder='Vložte název položky'
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     >
//                     </Form.Control>
//                     <p>{ errors.name?.message }</p>
//                     {errors.name && errors.name.message}
//                 </Form.Group>
//                 <p>{ errors.name?.message }</p> */}
//                 <Form.Group controlId='materialType'>
//                     <Form.Label>Typ materiálu</Form.Label>
//                     {/* <Form.Select as="select" 
//                         required
//                         isrequired='true'
//                         value={type}
//                         onChange={(e) => setType(e.target.value).bind(e.target.value)}>
//                       {materialType.map((opt, index) => (<option key={index} value={opt.id}>
//                         {opt.name}
//                         </option>
//                       ))}
//                     </Form.Select> */}
//                     <AsyncSelect
//                       cacheOptions
//                       defaultOptions
//                       {...register('type')}
//                       placeholder="Vyberte možnost..."
//                       // name='materialType'
//                       // {...register('materialType')}
//                       value={type}
//                       getOptionLabel={e => e.name}
//                       getOptionValue={e => e.id}
//                       loadOptions={fetchUsers}
//                       onInputChange={handleInputChange}
//                       onChange={handleChange}
//                       // onChange={val => {
//                       //   onChange(val.value);
//                       //   handleChange(val);
//                       // }}
//                     />
//                     {/* {!isValid && <p>Vyberte typ materiálu</p>} */}
//                     <p>{ errors.type?.message }</p>
//                 </Form.Group>
//                 {/* <AsyncSelect loadOptions={loadOptions} defaultOptions isSearchable onChange={handleChange} /> */}
//                 <Form.Group controlId='costs'>
//                     <Form.Label>Cena</Form.Label>
//                     <Form.Control
//                         name='costs'
//                         type='number'
//                         {...register('costs')}
//                         placeholder='Cena za 1 ks/jednotku (např.kg)'
//                         value={costs}
//                         onChange={(e) => setCosts(e.target.value)}
//                     >
//                     </Form.Control>
//                     <p>{ errors.costs?.message }</p>
//                 </Form.Group>
//                 <Form.Group controlId='supplier'>
//                     <Form.Label>Dodavatel</Form.Label>
//                     <Form.Control
//                         name='supplier'
//                         type='text'
//                         {...register('supplier')}
//                         placeholder='Název dodavatele nebo obchodu'
//                         value={supplier}
//                         custom="true"
//                         onChange={(e) => setSupplier(e.target.value)}
//                     >
//                     </Form.Control>
//                     <p>{ errors.supplier?.message }</p>
//                 </Form.Group>
//                 <Form.Group controlId='link'>
//                     <Form.Label>Odkaz</Form.Label>
//                     <Form.Control
//                         name='link'
//                         type='url'
//                         {...register('link')}
//                         placeholder='Odkaz na výrobek'
//                         value={link}
//                         custom="true"
//                         onChange={(e) => setLink(e.target.value)}
//                     >
//                     </Form.Control>
//                     <p>{ errors.link?.message }</p>
//                 </Form.Group>
//                 {/* <Form.Group controlId='note'>
//                     <Form.Label>Poznámka</Form.Label>
//                     <Form.Control
//                         type='textarea'
//                         placeholder=''
//                         value={note}
//                         custom
//                         onChange={(e) => setNote(e.target.value)}
//                     >
//                     </Form.Control>
//                 </Form.Group> */}
//                 <textarea className="form-control" name="note" {...register('note')} placeholder='Poznámka' value={note} rows="5" id="comment" custom="true" onChange={(e) => setNote(e.target.value)}>
//                 </textarea>
//                 <p>{ errors.note?.message }</p>
//                 {/* <Button 
//                   type='submit'
//                   variant='primary'
//                   onClick={postItem}
                  
//                   >
//                                   Uložit
//                           </Button> */}
//                 {/* <AddButton type='submit'/> */}
                
//                 {/* <Button 
//                   type='submit'
//                   form="formName"
//                   //disabled={!isValid}
//                   onSubmit={postItem}
//                   >
//                       Uložit
//                 </Button> */}
//                 <input 
//                   type="submit"
//                   //disabled={!isValid}
//                   form="formName"
//                   onSubmit={postItem}
//                   />
//             {/* </Form> */}
//             </form>
//           </div>
//       </FormContainer>
//     </div>
//   )
// }

// export default AddItemPage