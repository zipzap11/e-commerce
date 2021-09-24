import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../UI/ProductGrid";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import Container from "../UI/Container";
import CartItem from "./CartItem/CartItem";
import style from "./Cart.module.css";

const Cart = (props) => {
  const { cart } = props;
  if (!cart) {
    return (
      <div
        style={{
          width: "50%",
          height: "auto",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  const isEmpty = !cart.line_items.length;

  const EmptyCart = () => {
    return (
      <>
        <div className={style["no-item"]}>No Item here</div>
        <Button>
          <Link className={style.link} to="/">
            Go to Products page
          </Link>
        </Button>
      </>
    );
  };

  const FilledCart = () => {
    return (
      <React.Fragment>
        <ProductGrid>
          {cart.line_items.map((item) => {
            return (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQty={props.onUpdateQty}
                onRemove={props.onRemove}
              />
            );
          })}
        </ProductGrid>
        <div className={style.util}>
          <p>Subtotal : {cart.subtotal.formatted_with_code}</p>
          <div className={style.buttons}>
            <Button onClick={props.onEmpty} className={style.btn} theme="light">
              Empty Cart
            </Button>
            <Link to="/checkout">
              <Button className={style.btn} theme="ori">
                Checkout <i className="fas fa-arrow-right"></i>
              </Button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <Container>
      <h1 className={style.title}>Your Shopping Cart</h1>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
