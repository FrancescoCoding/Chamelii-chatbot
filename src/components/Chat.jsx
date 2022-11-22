import styles from "./Chat.module.css";
import React from "react";

import Happy from "../assets/Chameleon - happy.png";
import Sad from "../assets/Chameleon - sad.png";

const Chat = () => {
  const buttonHandler = () => {
    console.log("Button clicked");
  };

  return (
    <div className={styles.wrapper}>
      <h2 style={{ marginBottom: "10px" }}>Hi, I'm a chamelii.</h2>

      <div className={styles.border}>
        <img src={Happy} alt="happy" />
      </div>
      <div className={styles.text}>
        <h2>Talk to me!</h2>
        <p>Click this button to continue'</p>
        <button
          type="button"
          className="btn btn-danger"
          id="send"
          onClick={buttonHandler}
          value="Reset Form"
        >
          test
        </button>
      </div>
    </div>
  );
};

export default Chat;
