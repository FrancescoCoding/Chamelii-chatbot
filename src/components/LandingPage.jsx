import React from "react";
import { WindupChildren, Pause } from "windups";
import Grin from "../assets/Designs/Chameleon_Grin.png";

import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles["content-wrapper"]}>
      <div className="loader-wrapper">
        <img src={Grin} alt="Chameleon" className={styles.loader} />
      </div>
      <WindupChildren>
        <h4>Welcome to the Chamelii Chatbot Prototype...</h4>
        <Pause ms={800} />
        <h1>
          Developed and designed by the{" "}
          <span className={styles.karma}>Karma</span> team!
        </h1>
      </WindupChildren>
    </div>
  );
};

export default LandingPage;
