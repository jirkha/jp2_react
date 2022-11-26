import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Axios from 'axios'
import TextField from "../Global/Textfield"
import Notification from '../Global/Notifications/Notification';
import { Popup2 } from "../Global/Other/Popup2";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SelectArrayWrapper from '../Global/Select/SelectArrayWrapper';
import { useDispatch, useSelector } from "react-redux";
import { getSale } from "../Store/Features/Products/saleSlice";
import { getSaleType } from "../Store/Features/Products/saleTypeSlice";

import { 
  Typography,
  Grid,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
} from "@mui/material";
import AddSaleTypeForm from './AddSaleTypeForm';


const AddSaleForm = (props) => {

const dispatch = useDispatch();

const saleType = useSelector((state) => state.saleType.data)
const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
const editedSale = props.editedSale
const { setOpenPopup } = props;
const [openPopup2, setOpenPopup2] = useState(false);

useEffect(() => {
  dispatch(getSaleType());
  console.log("saleType: ",saleType)
}, [SelectArrayWrapper]);

  const handleClose = () => {
    setOpenPopup2(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Prosím zadejte název prodejního kanálu"),//.oneOf(itemType),
    type: Yup.string().required("Prosím vyberte typ prodejního kanálu"),
    brand: Yup.bool(), //JPcandles A/N
    note: Yup.string()
  });

  const initialValues = {
    name: editedSale?.name ?? "",
    type: editedSale?.type?.id ?? "",
    brand: editedSale?.brand ?? true,
    note: editedSale?.note ?? "",
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { 
        name,
        type,
        brand,
        note
    } = values;
    console.log("values: : ", values);

    if (editedSale) {
      Axios.put(`/api/sale_update/${editedSale.id}/`, {
                    name,
                    type,
                    brand,
                    note
                })
                .then(res => {
                    console.log("Updating Sale: ", res);
                    dispatch(getSale()); //aktualizuje seznam prodejních kanálů
                    setNotify({
                      isOpen: true,
                      message: 'Prodejní kanál byl úspěšně upraven',
                      type: 'info'
                    })
                }).catch(err => console.log(err))
    }

    else {
      Axios.post('/api/sale_add/', {
              name,
              type,
              brand,
              note
          })
          .then(res => {
              console.log("Adding Sale: ", res);
              dispatch(getSale()); //aktualizuje seznam prodejních kanálů
              setNotify({
                isOpen: true,
                message: 'Prodejní kanál byl úspěšně uložen',
                type: 'info'
              })
          }).catch(err => console.log(err))
    }
    
  }


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
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                //color="textPrimary"
                //align="center" //zarovná doprostřed
                gutterBottom //vytvoří mezeru pod textem
                >Povinné údaje
              </Typography>
              <TextField name="name" label="Název" variant="outlined" required />
            </Grid>
            <Grid item xs={10}>
              <SelectArrayWrapper
                //id="unit" 
                name="type" 
                label="Druh prodejního kanálu"
                options={saleType}
                required
              >
              </SelectArrayWrapper>
            </Grid>
            <Grid item xs={2}>
              <Button sx={{height: "55px", maxWidth: "10px"}} variant="outlined" size="inherit" color="primary" onClick={() => setOpenPopup2(true)}>
                <AddOutlinedIcon />
              </Button> 
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

            <Grid item xs={3}>
              {/* <Link to="#itemList"> */}
               <Button 
                type="submit" 
                className="button"
                variant="contained"
                onClick={() => isValid && setOpenPopup(false)}
                >
                {editedSale ? "Změnit" : "Přidat"}
                </Button> 
              {/* </Link> */}
             
            </Grid>
            <Grid item xs={9}>
              <Field
              as={FormControlLabel}
              type="checkbox"
              name="brand"
              control={<Checkbox />}
              label="Prodejní kanál pod značkou J&P"
            />
            </Grid>
          </Grid>
        </Box>
      </Form>
      
      )}
    </Formik>
    <Popup2 title="Vložení druhu prodejního kanálu"
      openPopup2={openPopup2}
      setOpenPopup2={setOpenPopup2}
      >
        <AddSaleTypeForm handleClose={handleClose} />
    </Popup2>
    <Notification
      notify={notify}
      setNotify={setNotify}
      />
    </>
    
  );
};
export default AddSaleForm