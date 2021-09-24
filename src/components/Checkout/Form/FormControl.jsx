import React, { forwardRef } from "react";
import { Grid, TextField } from "@material-ui/core";

const FormControl = forwardRef((props, ref) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField inputRef={ref} label={props.label} required />
    </Grid>
  );
});

export default FormControl;
