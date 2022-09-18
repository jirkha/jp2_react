import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

// vysvětlení kódu: https://www.youtube.com/watch?v=MV9NC3FoCmM&ab_channel=SimpleTut

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: false,
    variant: "outlined",
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;