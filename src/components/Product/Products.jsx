import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner.jsx";
import Product from "./Product.jsx";
import ProductGrid from "../UI/ProductGrid";
import style from "./Products.module.css";
import Container from "../UI/Container.jsx";

const Products = (props) => {
  const { products } = props;

  if (!products) {
    console.log("LOADING>>>>");
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

  return (
    <Container className={style.products}>
      <ProductGrid>
        {products.map((product) => {
          return (
            <Product
              onAddToCart={props.onAddToCart}
              key={product.id}
              product={product}
            />
          );
        })}
      </ProductGrid>
    </Container>
  );
};

export default Products;
