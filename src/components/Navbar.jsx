import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <img src={Logo} alt="" />
      <h1 style={{ color: "white" }}>Dashboard</h1>
    </div>
  );
};

export default Navbar;
