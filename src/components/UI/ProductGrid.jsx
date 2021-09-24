import React from "react";
import style from "./ProductGrid.module.css";

const ProductGrid = (props) => {
  return <div className={style.grid}>{props.children}</div>;
};

export default ProductGrid;
