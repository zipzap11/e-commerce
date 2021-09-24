import React from "react";
import style from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = (props) => {
  const location = useLocation();
  const path = location.pathname;

  let navLink = (
    <NavLink to="/cart" className={style.link}>
      <i className="fas fa-cart-arrow-down"></i>
      <span className={style.badge}>{props.quantity}</span>
    </NavLink>
  );

  if (path === "/cart") {
    navLink = (
      <NavLink to="/" className={style.link}>
        <i className="fas fa-home"></i>
      </NavLink>
    );
  }

  return (
    <div className={style.navbar}>
      <div className={style["logo-wrapper"]}>
        <p className={style.logo}>E-DOLS</p>
      </div>
      <div className={style.cart}>{navLink}</div>
    </div>
  );
};

export default Navbar;
