import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Container, Typography, Divider, Grid } from "@mui/material";
import { format } from "date-fns";
import Axios from 'axios'

const MaterialPage = () => {

    let {materialId} = useParams();
    
    let [material, setMaterial] = useState(null)
    // console.log({material.updated})

    useEffect(()=> {
        getMaterial()
    }, [materialId])

    let getMaterial = async () => {
        let response = await fetch(`/api/item_detail/${materialId}`)
        let data = await response.json()
        setMaterial(data)
    }


    const postDelete = (id, e) => {
      e.preventDefault();
      Axios.delete(`/api/item_delete/${id}`)
      .then(res => console.log("Deleted!", res)
    ).catch(err => console.log(err))
  }
    
    return (
      <Container sx={{ mt: 2 }}>
        <Link to="/material">
          <ArrowBackIcon color="primary" />
        </Link>
        <Typography
          variant="h3"
          color="primary"
          gutterBottom //vytvoří mezeru pod textem
        >
          {material?.m_ser.name}
        </Typography>
        {/* <Typography variant="subtitle1">ID: {material?.m_ser.id}</Typography>
        <Typography variant="h6">Typ: {material?.m_ser.type.name}</Typography> */}

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
            <Typography variant="subtitle1">{material?.m_ser.id}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" color="primary">
              Typ materiálu
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">
              {material?.m_ser.type.name}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" color="primary">
              Cena materiálu
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">
              {material?.m_ser.costs} Kč za ks / jednotku
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" color="primary">
              Dodavatel
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">
              {material?.m_ser.supplier}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" color="primary">
              Odkaz
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">
              <a href={material?.m_ser.link}>{material?.m_ser.link}</a>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" color="primary">
              Vytvořeno
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1">
              {material?.m_ser.created}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle1" color="primary">
              Upraveno
            </Typography>
          </Grid>
          <Grid item xs={9} sx={{ mb: 5 }}>
            <Typography variant="subtitle1">
              {material?.m_ser.updated}
            </Typography>
          </Grid>
        </Grid>

        <Button
          type="delete"
          variant="outlined"
          color="error"
          onClick={(e) => postDelete(material?.m_ser.id, e)}
        >
          Vymazat
        </Button>
        <Button variant="outlined" color="primary">
          <Link to={`/edit_material/${material?.m_ser.id}`}>Upravit</Link>
        </Button>
      </Container>
    );
}

export default MaterialPage