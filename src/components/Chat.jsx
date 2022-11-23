import Angry from "../assets/Designs/Chameleon_Angry.png";
import Confused from "../assets/Designs/Chameleon_Confused.png";
import Excited from "../assets/Designs/Chameleon_Excited.png";
import Grin from "../assets/Designs/Chameleon_Grin.png";
import Neutral from "../assets/Designs/Chameleon_Neutral.png";
import Pressure from "../assets/Designs/Chameleon_Pressure.png";
import SadOpenMouth from "../assets/Designs/Chameleon_Sad (Open).png";
import Sad from "../assets/Designs/Chameleon_Sad.png";
import Shrug from "../assets/Designs/Chameleon_Shrug.png";

import styles from "./Chat.module.css";
import React, { useState, useEffect } from "react";
import { WindupChildren, Pause } from "windups";

import Ouch from "../assets/Sounds/ouch.mp3";

const Chat = () => {
  const determineTimeOfDay = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 17) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  const [emotion, setEmotion] = useState(Neutral);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(
    <WindupChildren>
      Good {determineTimeOfDay()}! How was your day?
    </WindupChildren>
  );

  useEffect(() => {
    let timer;

    const images = [
      Angry,
      Confused,
      Excited,
      Grin,
      Neutral,
      Pressure,
      SadOpenMouth,
      Sad,
      Shrug,
    ];
    images.forEach(image => {
      new Image().src = image;
    });

    if (emotion === SadOpenMouth) {
      timer = setTimeout(() => {
        setEmotion(Sad);
      }, 2000);
    } else if (emotion === Sad) {
      timer = setTimeout(() => {
        setEmotion(Neutral);
      }, 5000);
    } else {
      timer = setTimeout(() => {
        setEmotion(Neutral);
      }, 4000);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [emotion]);

  const ouch = new Audio(Ouch);
  const emotionsArray = [Angry, Shrug, Confused, Grin];

  const emotionHandler = () => {
    setEmotion(emotionsArray[Math.floor(Math.random() * emotionsArray.length)]);

    ouch.play();
  };

  const happyHandler = () => {
    setEmotion(Excited);

    setMessage(
      <WindupChildren>{"That's amazing! I'm so happy for you!"}</WindupChildren>
    );
  };

  const mehHandler = () => {
    setEmotion(Confused);

    setMessage(<WindupChildren>{"Why, what's up?"}</WindupChildren>);
  };

  const sadHandler = () => {
    setEmotion(SadOpenMouth);

    setMessage(
      <WindupChildren>{"Aw, you wanna talk about it?"}</WindupChildren>
    );

    setTimeout(() => {
      setMessage(<WindupChildren>{"What's wrong?"}</WindupChildren>);
    }, 2000);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading && (
        <>
          <img src={Grin} alt="Chameleon" className={styles.loader} />
          <WindupChildren>
            <h4>Welcome to the Chamelii Chatbot Prototype...</h4>
            <Pause ms={800} />
            <h1>
              Developed and designed by the{" "}
              <span className={styles.karma}>Karma</span> team!
            </h1>
          </WindupChildren>
        </>
      )}
      {!isLoading && (
        <>
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
            <h2 style={{ height: "60px" }}>{message}</h2>
            <button className={styles.btn} onClick={happyHandler}>
              My day was great!
            </button>
            <button className={styles.btn} onClick={mehHandler}>
              My day was fine.
            </button>
            <button className={styles.btn} onClick={sadHandler}>
              I had a really bad day.
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
