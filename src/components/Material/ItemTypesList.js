import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterialType } from "../Store/Features/Material/materialTypeSlice";
import Axios from "axios";

import BasicCard from '../Global/Other/BasicCard';

import { Button, Container, Grid, CardActionArea } from "@mui/material";
import { Popup2 } from "../Global/Other/Popup2";
import AddItemTypeForm from "./AddItemTypeForm";
import { Stack } from "@mui/system";
import Notification from "../Global/Notifications/Notification";

function ItemTypesList() {

    const dispatch = useDispatch();
    const materialType = useSelector((state) => state.materialType.data);
    const [openPopup2, setOpenPopup2] = useState(false);
    const [materialTypeId, setMaterialTypeId] = useState("")
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });

    useEffect(() => {
      dispatch(getMaterialType());
      //console.log("materialType", materialType);
    }, []);

    const editAction = (id) => {
        setMaterialTypeId(id);
        setOpenPopup2(true);
    }

    const itemTypeDelete = (id, e) => {
    e.preventDefault();
    Axios.delete(`/api/itemType_delete/${id}`)
      .then(() => {
        console.log("Deleted!");
        //console.log("productId", productId);
        dispatch(getMaterialType());
        setNotify({
          isOpen: true,
          message: "Typ materiálu byl odstraněn",
          type: "warning",
        });
      })
      .catch((err) => {
        console.log(err);
        setNotify({
          isOpen: true,
          message: "Není možno odstranit typ materiálu, protože by pravděpodobně došlo k odstranění všech produktů tohoto typu! Typ materiálu lze upravit.",
          type: "error",
        });
      });
  };

  return (
    <>
      <Container>
        <Stack direction="row" justifyContent="center" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenPopup2(true)}
          >
            Přidat nový typ materiálu
          </Button>
        </Stack>
        <Grid container spacing={{ xs: 2, md: 2 }}>
          {materialType.map((type) => (
            <Grid item xs={6} sm={5} md={3} lg={2} key={type.id}>
              {/* <Paper elevation={2}> */}
              <BasicCard
                typeItem="Typ materiálu"
                item={type.name}
                count={type.material_count}
                note={type.note}
                id={type.id} //místo posílání id zabudovat useRef
                delete={itemTypeDelete} //využít useRef, aby se nemuselo id posílat tam a zpět
                edit={editAction}
              />
              {/* </Paper> */}
            </Grid>
          ))}
        </Grid>
        <Popup2
          title="Vložení typu materiálu"
          openPopup2={openPopup2}
          setOpenPopup2={setOpenPopup2}
        >
          <AddItemTypeForm materialTypeId={materialTypeId} />
        </Popup2>
      </Container>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

export default ItemTypesList