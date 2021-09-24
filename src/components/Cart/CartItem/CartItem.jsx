import React from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import style from "./CartItem.module.css";

const CartItem = (props) => {
  const item = props.item;
  console.log("Cart item :", item);
  return (
    <Card>
      <div>
        <div className={style["img-wrapper"]}>
          <img src={item.media.source} alt={item.name} />
        </div>
        <div className={style.info}>
          <h5>{item.name}</h5>
          <p>{item.price.formatted_with_code}</p>
        </div>
        <div className={style.actions}>
          <div className={style.quantity}>
            <Button
              onClick={() => props.onUpdateQty(item.id, item.quantity - 1)}
              theme="light"
            >
              -
            </Button>
            <p>{item.quantity}</p>
            <Button
              onClick={() => props.onUpdateQty(item.id, item.quantity + 1)}
              theme="light"
            >
              +
            </Button>
          </div>
          <div className={style.remove}>
            <Button onClick={() => props.onRemove(item.id)}>
              <i className="far fa-trash-alt"></i>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
