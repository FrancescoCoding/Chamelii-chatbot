import styles from "./Chat.module.css";
import React, { useState } from "react";

import Angry from "../assets/Designs/Chameleon_Angry.png";
import Confused from "../assets/Designs/Chameleon_Confused.png";
import Excited from "../assets/Designs/Chameleon_Excited.png";
import Grin from "../assets/Designs/Chameleon_Grin.png";
import Neutral from "../assets/Designs/Chameleon_Neutral.png";
import Pressure from "../assets/Designs/Chameleon_Pressure.png";
import SadOpenMouth from "../assets/Designs/Chameleon_Sad (Open).png";
import Sad from "../assets/Designs/Chameleon_Sad.png";
import Shrug from "../assets/Designs/Chameleon_Shrug.png";

import Ouch from "../assets/Sounds/ouch.mp3";

const Chat = () => {
  const [emotion, setEmotion] = useState(Neutral);

  const emotionsArray = [Angry, Shrug, Confused, Grin];

  const buttonHandler = () => {
    console.log("Button clicked");
  };

  const resetEmotion = () => {
    setTimeout(() => {
      setEmotion(Neutral);
    }, 3000);
  };

  const emotionHandler = () => {
    setEmotion(emotionsArray[Math.floor(Math.random() * emotionsArray.length)]);
    const audio = new Audio(Ouch);
    // audio.play();
  };

  const happyHandler = () => {
    setEmotion(Excited);

    resetEmotion();
  };

  const sadHandler = () => {
    setEmotion(SadOpenMouth);

    resetEmotion();
  };

  return (
    <div className={styles.wrapper}>
      <h2 style={{ marginBottom: "10px" }}>Hi, I'm a chamelii.</h2>

      <div className={styles.border}>
        <img
          src={emotion}
          alt={`${emotion}`}
          onMouseDown={emotionHandler}
          onMouseUp={() => setEmotion(Neutral)}
        />
      </div>
      <div className={styles.text}>
        <h2>How was your day?</h2>
        <button className={styles.btn} onClick={happyHandler}>
          My day was great!
        </button>
        <button className={styles.btn} onClick={buttonHandler}>
          My day was fine.
        </button>
        <button className={styles.btn} onClick={sadHandler}>
          I had a really bad day.
        </button>
      </div>
    </div>
  );
};

export default Chat;
