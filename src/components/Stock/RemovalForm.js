import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Axios from "axios";
import TextField from "../Global/Textfield";
import DateTimePicker from "../Global/DateTimePicker";

import ItemWrapper from "../Global/Select/ItemWrapper";

import {
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";

const RemovalForm = () => {
  const [item, setItem] = useState("");

  useEffect(() => {
    Axios.get("/api/items/")
      .then((res) => {
        console.log("Items: ", res.data);
        setItem(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const validationSchema = Yup.object({
    day_of_removal: "",
    item: Yup.string().required("Prosím vyberte materiál"),
    quantity_of_material: Yup.number()
      .min(1)
      .max(1000000)
      .required(
        "Prosím zadejte vyskladněné množství ( celé číslo - minimálně 1 a maximálně 1 000 000)"
      ),
    note: Yup.string(),
  });

  const initialValues = {
    day_of_removal: "",
    item: "",
    quantity_of_material: "",
    note: "",
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    const { day_of_removal, item, quantity_of_material, note } = values;
    console.log("storage: ", values);
    Axios.post("/api/removal_add/", {
      day_of_removal,
      item,
      quantity_of_material,
      note,
    })
      .then((res) => {
        console.log("Adding Removal: ", res);
        console.log("item: ", res.day_of_removal);
        //navigate("/material");
      })
      .catch((err) => console.log(err));
  };

  // fce "showUnit" načte "data" příslušného "item", který uživatel zvolil selectem "ItemWrapper"
  // pak přiřadí "data", tedy "id" z načteného API seznamu Items příslučnému "item"
  // nakonec u nalezeného item zobrazí atribut "unit", tedy jednotku přiřazenou danému item
  function showUnit(data) {
    // console.log("doIt:",data);
    var filtered = Object.fromEntries(
      Object.entries(item).filter(([k, v]) => v.id === data)
    );
    // console.log(
    //   "filtered",(filtered)
    // );
    var filteredUnit = Object.keys(filtered).map((key) => (
      <>{filtered[key].unit} </>
    ));
    console.log("filteredUnit", filteredUnit);
    return <Typography>{filteredUnit}</Typography>;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        //enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values);
          resetForm();
          //navigate("/");
        }}
      >
        {({ isValid, values }) => (
          console.log("values", values),
          (
            <Form>
              <Box sx={{ flexWrap: "wrap" }}>
                <Grid
                  container
                  spacing={2}
                  maxWidth="430px"
                  alignItems="flex-start"
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      //color="textPrimary"
                      //align="center" //zarovná doprostřed
                      gutterBottom //vytvoří mezeru pod textem
                    >
                      Povinné údaje
                    </Typography>
                    <DateTimePicker
                      id="day_of_removal"
                      name="day_of_removal"
                      label="Datum vyskladnění"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ItemWrapper
                      name="item"
                      // size="small"
                      label="Materiál ..."
                      //options={productOptions}
                      required
                    ></ItemWrapper>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="quantity_of_material"
                      name="quantity_of_material"
                      // size="small"
                      label="Množství materiálu"
                      helperText="Zadejte prosím pouze celé číslo"
                      required
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {showUnit(values.item)}
                            {/* načte a zobrazí jednotku dle vybrané "item" ze komponenty ItemWrapper */}
                          </InputAdornment>
                        ),
                      }}
                      //ukáže měrnou jednotku příslušné "item" (ks/kg atd.)
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      //color="textPrimary"
                      //align="center" //zarovná doprostřed
                      gutterBottom //vytvoří mezeru pod textem
                    >
                      Nepovinné údaje
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="note"
                      name="note"
                      label="Poznámka"
                      multiline
                      rows={4}
                      variant="outlined"
                    />
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
                </Grid>
              </Box>
            </Form>
          )
        )}
      </Formik>
    </>
  );
};
export default RemovalForm;
