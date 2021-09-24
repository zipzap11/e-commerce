import React from "react";
import {
  Divider,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Confirmation = ({ order, error, resetConfirmation }) => {
  if (error) {
    return (
      <>
        <Typography variant="h5">Error : {error}</Typography>
        <br />
        <Button
          onClick={resetConfirmation}
          component={Link}
          to="/"
          variant="outlined"
          type="button"
        >
          Back to home
        </Button>
      </>
    );
  }
  return order.customer ? (
    <>
      <div>
        <Typography gutterBottom variant="h6">
          Thank you for your purchase, {order.customer.firstname}{" "}
          {order.customer.lastname}
        </Typography>
        <Divider />
        <Typography style={{ marginTop: ".5rem" }} variant="subtitle2">
          Order ref : {order.customer_reference}
        </Typography>
      </div>
      <br />
      <Button
        onClick={resetConfirmation}
        component={Link}
        to="/"
        variant="outlined"
        type="button"
      >
        Back to home
      </Button>
    </>
  ) : (
    <div style={{ textAlign: "center" }}>
      <CircularProgress />
    </div>
  );
};

export default Confirmation;
