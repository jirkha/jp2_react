import React, {useState} from 'react'
import { format } from 'date-fns';
import {Popup} from "../Global/Other/Popup"
import EditIcon from '@mui/icons-material/Edit';
import {
  Container,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import UpdateMadeProduct from './UpdateMadeProduct';
import open from "./ProductColumns"


function ProductDetail(props) {

const product = props.data;
const [openPopup, setOpenPopup] = useState(false)

  return (
    <>
    <Container>
          <Grid
            container
            spacing={2}
            //direction={"row"}
            alignContent={"center"}
            //xs={12}
          >
            <Grid
              //container
              item
              xs={3}
              //justifyContent={"start"}
            >
              <Typography variant="subtitle1" color="primary">
                Identifikační číslo
              </Typography>
            </Grid>
            <Grid
              //container
              item
              xs={9}
              //justifyContent={"start"}
            >
              <Typography variant="subtitle1">{product?.p_ser.id}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Typ produktu
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                {product?.p_ser.product_type.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Prodejní cena
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                {product?.p_ser.price} Kč za ks
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Náklady na výrobu
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                {product?.p_ser.costs} Kč za ks
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Vyrobeno
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="subtitle1">
                {product?.p_ser.made} ks
                <IconButton color="primary" 
                onClick={() => setOpenPopup(true)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Skladem
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                {product?.p_ser.stocked} ks
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Prodáno
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                {product?.p_ser.sold} ks
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                J&P
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                {product?.p_ser.brand ? "ANO" : "NE"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Vytvořeno
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle1">
                {/* {format(new Date(product?.p_ser.created), 'dd.MM.yyyy kk:mm:ss')} */}
                {product?.p_ser.created}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="primary">
                Upraveno
              </Typography>
            </Grid>
            <Grid item xs={9} sx={{ mb: 5 }}>
              <Typography variant="subtitle1">
                 {/* {format(new Date(product?.p_ser.updated), 'dd.MM.yyyy kk:mm:ss')} */}
                 {product?.p_ser.updated}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary">
              Obsah produktu
            </Typography>
          </Grid>
        </Container>
        <Popup
        title = "Úprava počtu naskladněných výrobků"
        openPopup = {openPopup}
        setOpenPopup = {setOpenPopup}
        >
          <UpdateMadeProduct id={product?.p_ser.id} getProduct={props.getProduct} setOpenPopup={setOpenPopup} />
        </Popup>
        </>
  )
}

export default ProductDetail