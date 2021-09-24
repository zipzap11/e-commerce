import React, { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
import Container from "../UI/Container";
import { CssBaseline } from "@material-ui/core";
import Card from "../UI/Card";
import style from "./Checkout.module.css";
import AddressForm from "./Form/AddressForm";
import PaymentForm from "./Form/PaymentForm";
import Confirmation from "./Form/Confirmation";

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState();
  const steps = ["Shipping address", "Payment details"];
  console.log("ERROR IN CHECKOUT ++>>", error);
  const nextStep = () => setActiveStep((last) => last + 1);
  const backStep = () =>
    setActiveStep((last) => {
      console.log("LAST := ", last);
      return last - 1;
    });

  const addressFormSubmitHandler = (data) => {
    setShippingData(data);
    console.log("SHIPPING DATA : ", data);
    nextStep();
  };
  console.log("CHECKOUT TOKEN FROM CHECKOUT>JSX >>", checkoutToken);
  const Form = () => {
    return activeStep === 0 ? (
      checkoutToken && (
        <AddressForm
          onSubmit={addressFormSubmitHandler}
          token={checkoutToken}
        />
      )
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        onBack={backStep}
        nextStep={nextStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );
  };

  useEffect(() => {
    if (cart && cart.total_items > 0) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          setCheckoutToken(token);
        } catch (error) {
          console.log("fail to generate token");
        }
      };
      generateToken();
    }
  }, [cart]);

  const roundedStepClassName = (step) => {
    let classes;
    if (activeStep === step) {
      classes = `${style["step-num"]} ${style["active"]}`;
    } else if (activeStep > step) {
      classes = `${style["step-num"]} ${style["finished"]}`;
    } else if (activeStep < step) {
      classes = style["step-num"];
    }
    return classes;
  };

  return (
    <Container>
      <Card className={style.paper}>
        <CssBaseline />
        <h2>Checkout</h2>
        <div className={style.step}>
          <p>
            <span className={roundedStepClassName(0)}>
              {activeStep === 0 ? (
                "1"
              ) : (
                <i className={`fas fa-check ${style.check}`}></i>
              )}
            </span>
            Shipping Address
          </p>
          <span className={style.line}></span>
          <p>
            <span className={roundedStepClassName(1)}>
              {activeStep > 1 ? (
                <i className={`fas fa-check ${style.check}`}></i>
              ) : (
                "2"
              )}
            </span>
            Payment Details
          </p>
        </div>
        {activeStep === steps.length ? (
          <Confirmation error={error} order={order} />
        ) : (
          <Form />
        )}
      </Card>
    </Container>
  );
};

export default Checkout;
