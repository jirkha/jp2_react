import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Axios from "axios";
import TextField from "../components/Global/Textfield";
import SelectArrayWrapper from "../components/Global/Select/SelectArrayWrapper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../components/Global/Notifications/Notification";

import {
  Button,
  IconButton,
  Stack,
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  InputAdornment,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getMaterial } from "../components/Store/Features/Material/materialSlice";
import ProductDetail from "../components/Product/ProductDetail";


// není rozděleno na komponnety z důvodu potřeby aktualizace produktu vždy po přidání/odebrání item
function ProductDetailPage() {
  let { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const material = useSelector((state) => state.material.data);
  let [product, setProduct] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    getProduct();
    dispatch(getMaterial());
    // console.log("getProduct: ", product);
    // console.log("material: ", material);
  }, [SelectArrayWrapper]);

  const getProduct = async () => {
    Axios.get(`/api/product_detail/${productId}`).then((res) => {
      setProduct(res.data);
      console.log("Data načtena", res.data);
    });
  };

  const postDelete = (id, e) => {
    e.preventDefault();
    Axios.delete(`/api/product_delete/${id}`)
      .then(() => {
        console.log("Deleted!");
        getProduct();
        navigate("/product");
      })
      .catch((err) => console.log(err));
  };

  const postItemDelete = (id, e) => {
    let data = { data: productId }; //uloží do správného formátu productId, u kterého mažu daný materiál
    e.preventDefault();
    Axios.delete(`/api/product_item_delete/${id}`, { data: data }) // "data" se pošlou spolu s akcí "delete", aby se v DJangu mohly následně u produktu odečít výrobní náklady
      .then((data) => {
        console.log("Deleted!");
        //console.log("productId", productId);
        //console.log("res.data", res.data);
        getProduct();
        setNotify({
          isOpen: true,
          message: "Materiál byl odstraněn",
          type: "warning",
        });
      })
      .catch((err) => console.log(err));
  };

  const validationSchema = Yup.object({
    item: Yup.string().required("Prosím zadejte položku"),
    quantity: Yup.number()
      .min(0.01)
      .max(1000000)
      .required(
        "Prosím zadejte počet (minimálně 0.01 a maximálně 1 000 000)"
      )
      .typeError(
        "Zadejte prosím číslo ve správném formátu (k oddělení desetinného čísla používejte tečku)"
      ),
  });

  const initialValues = {
    item: "",
    quantity: "",
  };

  const onSubmit = (values) => {
    const { item, quantity } = values;
    console.log("values: : ", values);
    Axios.patch(`/api/product_item_patch/${productId}`, {
      item,
      quantity,
    })
      .then((res) => {
        console.log("Adding Item ", res);
        getProduct();
      })
      .catch((err) => console.log(err));
  };

  // fce "showUnit" načte "data" příslušného "item", který uživatel zvolil selectem "ItemWrapper"
  // pak přiřadí "data", tedy "id" z načteného API seznamu Items příslučnému "item"
  // nakonec u nalezeného item zobrazí atribut "unit", tedy jednotku přiřazenou danému item
  function showUnit(data) {
    var filtered = Object.fromEntries(
      Object.entries(material).filter(([k, v]) => v.id === data)
    );
    var filteredUnit = Object.keys(filtered).map((key) => (
      <>{filtered[key].unit} </>
    ));
    //console.log("filteredUnit", filteredUnit);
    return <Typography>{filteredUnit}</Typography>;
  }

  return (
    <>
      {/* <ProductDetail id={productId} />
      <AddProductItemsForm id={productId} /> */}
      <Container sx={{ mt: 2 }}>
        <Link to="/product">
          <ArrowBackIcon color="primary" />
        </Link>
        <Typography
          variant="h3"
          color="primary"
          gutterBottom //vytvoří mezeru pod textem
        >
          {product?.p_ser.name}
        </Typography>
        
        <ProductDetail data={product} /> 

        <Stack
          sx={{
            marginBottom: "20px",
            marginTop: "10px",
            justifyContent: "center",
            border: "1px solid gray",
            p: "20px",
          }}
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
          mb={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Container>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Seznam</Typography>
            </Grid>
            {product?.p_ser.items.map((item, index) => {
              return (
                <Box
                  sx={{
                    maxWidth: 300,
                    minHeight: 50,
                    backgroundColor: "primary.dark",
                    textAlign: "left", //zarovnání textu
                    borderRadius: "8px", //zaoblení
                    flexItem: "true",
                    pl: "10px", //odsazení textu vlevo
                    pt: "5px",
                    flexWrap: "wrap", // zalomí položky, pokud by přetékaly okraj
                    //border: 1, //černé okraje
                    mt: 0.5, //mezera pod
                  }}
                  key={index}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {" "}
                    <Link
                      to={`/material/${item.item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          "&:hover": {
                            backgroundColor: "primary.main",
                            opacity: [0.9, 0.8, 0.7],
                          },
                        }}
                      >
                        <Typography variant="subtitle1" color="whitesmoke">
                          {item.item.name}
                        </Typography>
                        <Typography variant="subtitle2" color="whitesmoke">
                          {item.quantity} {item.item.unit}
                        </Typography>
                      </Box>
                    </Link>
                    <Box
                      sx={{
                        pr: "10px",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    >
                      <IconButton
                        type="delete"
                        onClick={(e) => postItemDelete(item.id, e)}
                        color="warning"
                      >
                        <DeleteIcon color="warning" />
                      </IconButton>
                    </Box>
                  </Grid>
                </Box>
              );
            })}
          </Container>
          <Container>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                await onSubmit(values);
                resetForm();
                //navigate('/');
              }}
            >
              {({ isValid, values }) => (
                <Form>
                  <Stack
                    //sx={{ justifyContent: "center" }}
                    direction="row"
                    spacing={2}
                  >
                    <Grid
                      container
                      spacing={2}
                      alignItems="flex-start"
                      maxWidth="250px"
                    >
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          Přidat obsah produktu
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <SelectArrayWrapper
                          name="item"
                          label="Materiál ..."
                          options={material}
                          size="small"
                          required
                        ></SelectArrayWrapper>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          id="quantity"
                          name="quantity"
                          label="Množství"
                          variant="standard"
                          helperText="Max. 2 desetinná čísla oddělená tečkou (např. 1.20)"
                          required
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {showUnit(values.item)}
                                {/* načte a zobrazí jednotku dle vybrané "item" ze komponenty ItemWrapper */}
         </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          type="submit"
                          color="success"
                          className="button"
                          variant="contained"
                        >
                          Přidat
                        </Button>
                      </Grid>
                    </Grid>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Container>
        </Stack>

        {/* /////////////////////////////////////////////////////////////////// */}

        <Button
          type="delete"
          variant="contained"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={(e) => postDelete(product?.p_ser.id, e)}
        >
          Vymazat
        </Button>
        <Button
          variant="contained"
          href={`/edit_product/${product?.p_ser.id}`}
          color="info"
        >
          Upravit produkt
        </Button>
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default ProductDetailPage