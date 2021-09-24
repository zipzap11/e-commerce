import React from "react";
import style from "./Button.module.css";

const Button = (props) => {
  const theme = props.theme;
  let btnStyle = {};

  if (theme === "light") {
    btnStyle = {
      backgroundColor: "whitesmoke",
      color: "rgb(37, 37, 44)",
    };
  }

  if (theme === "ori") {
    btnStyle = {
      backgroundColor: "rgb(62, 57, 97)",
      color: "whitesmoke",
    };
  }
  return (
    <button
      onClick={props.onClick}
      style={btnStyle}
      className={`${style.btn} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
