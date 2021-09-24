import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import style from "./Product.module.css";

const Product = (props) => {
  const { product } = props;

  return (
    <Card className={style.card}>
      <div>
        <div className={style.wrapper}>
          <img
            className={style["product-img"]}
            src={product.media.source}
            alt="productImg"
          />
        </div>
        <div className={style["product-content"]}>
          <div className={style.left}>
            <p className={style.primary}>{product.name}</p>
            <p
              dangerouslySetInnerHTML={{ __html: product.description }}
              className={style.secondary}
            ></p>
          </div>
          <div className={style.right}>
            <p className={style.price}>Rp. {product.price.formatted}</p>
          </div>
        </div>
        <div className={style.action}>
          <Button onClick={() => props.onAddToCart(product.id, 1)}>
            <i className="fas fa-cart-arrow-down"></i>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Product;
