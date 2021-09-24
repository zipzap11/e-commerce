import React, { useEffect, useState } from "react";
import { Navbar, Products, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";
import { Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState();
  const [cart, setCart] = useState();
  const [order, setOrder] = useState({});
  const [error, setError] = useState(null);

  const resetConfirmation = () => {
    setOrder({});
    setError(null);
  };

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    console.log("CART FROM FETCH ===>", cart);
    setCart(cart);
  };

  const refreshCart = async () => {
    console.log("RESETING CART");
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const captureCheckoutHandler = async (checkoutTokenId, newOrder) => {
    console.log("CAPTURING ORDER...");
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
      console.log("BERHASIL BANGKE");
    } catch (error) {
      console.log("ERROR CAPTURING ORDER", error.data.error.message);
      setError(error.data.error.message);
    }
  };

  const addToCartHandler = async (productId, quantity) => {
    console.log("ADDING TO CART : ", productId, quantity);
    const response = await commerce.cart.add(productId, quantity);
    setCart(response.cart);
  };

  const updateCartQtyHandler = async (id, quantity) => {
    const response = await commerce.cart.update(id, { quantity });
    setCart(response.cart);
  };

  const removeCartItemHandler = async (id) => {
    const response = await commerce.cart.remove(id);
    setCart(response.cart);
  };

  const emptyCartHandler = async () => {
    console.log("EMPTING CART...");
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  useEffect(() => {
    console.log("FETCHING IN APP>JS");
    fetchProducts();
    fetchCart();
  }, []);

  let itemsQuantity = 0;
  if (cart) {
    itemsQuantity = cart.total_items;
  }
  console.log("ERROR IN APP>JS ++>>>>", error);
  return (
    <div>
      <Navbar quantity={itemsQuantity} />
      <Switch>
        <Route exact path="/">
          <Products products={products} onAddToCart={addToCartHandler} />
        </Route>
        <Route exact path="/cart">
          <Cart
            onUpdateQty={updateCartQtyHandler}
            onRemove={removeCartItemHandler}
            onEmpty={emptyCartHandler}
            cart={cart}
          />
        </Route>
        <Route exact path="/checkout">
          <Checkout
            order={order}
            onCaptureCheckout={captureCheckoutHandler}
            error={error}
            cart={cart}
            resetConfirmation={resetConfirmation}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
