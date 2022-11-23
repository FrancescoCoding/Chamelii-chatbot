import Angry from "../assets/Designs/Chameleon_Angry.png";
import Confused from "../assets/Designs/Chameleon_Confused.png";
import Excited from "../assets/Designs/Chameleon_Excited.png";
import Grin from "../assets/Designs/Chameleon_Grin.png";
import Neutral from "../assets/Designs/Chameleon_Neutral.png";
import Pressure from "../assets/Designs/Chameleon_pressure_big.png";
import SadOpenMouth from "../assets/Designs/Chameleon_Sad (Open).png";
import Sad from "../assets/Designs/Chameleon_Sad.png";
import Shrug from "../assets/Designs/Chameleon_Shrug.png";
import Ouch from "../assets/Sounds/ouch.mp3";
import Crying from "../assets/Sounds/crying.mp3";

import LandingPage from "./LandingPage";

import styles from "./Chat.module.css";
import React, { useState, useEffect } from "react";
import { WindupChildren } from "windups";

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
  const [pokeCounter, setPokeCounter] = useState(0);
  const [totalPokes, setTotalPokes] = useState(0);
  const [message, setMessage] = useState(
    <WindupChildren>
      Good {determineTimeOfDay()}! How was your day?
    </WindupChildren>
  );

  useEffect(() => {
    let timer;

    const images = [
      Grin,
      Angry,
      Confused,
      Excited,
      Neutral,
      Pressure,
      SadOpenMouth,
      Sad,
      Shrug,
    ];
    images.forEach(image => {
      new Image().src = image;
    });

    if (pokeCounter > 4) {
      setPokeCounter(0);
    }

    if (pokeCounter === 5) {
      setEmotion(Pressure);

      const audio = new Audio(Crying);
      audio.play();

      setMessage(
        <WindupChildren>I'm sorry, I'm not feeling well.</WindupChildren>
      );

      timer = setTimeout(() => {
        setEmotion(Sad);

        // stop audio
        audio.pause();

        setMessage(
          <WindupChildren>
            Please stop poking me! How was your day?
          </WindupChildren>
        );
      }, 3000);
    }

    if (emotion === SadOpenMouth) {
      timer = setTimeout(() => {
        setEmotion(Sad);
      }, 2000);
    } else {
      timer = setTimeout(() => {
        setEmotion(Neutral);
      }, 3000);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [emotion, pokeCounter]);

  const ouch = new Audio(Ouch);
  const emotionsArray = [Angry, Shrug, Confused, Grin];

  const emotionHandler = () => {
    setEmotion(emotionsArray[Math.floor(Math.random() * emotionsArray.length)]);

    setPokeCounter(pokeCounter + 1);
    setTotalPokes(totalPokes + 1);

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
      {isLoading && <LandingPage />}
      {!isLoading && (
        <>
          <h2 style={{ marginBottom: "10px" }}>Hi, I'm a chamelii.</h2>

          <div className={styles.border}>
            <img
              className={emotion === Pressure ? styles.pressure : ""}
              src={emotion}
              alt={`${String(emotion).split("/")[3].split(".")[0]}`}
              onMouseDown={
                emotion !== Pressure && emotion !== Sad ? emotionHandler : null
              }
              onMouseUp={() =>
                emotion !== Pressure && emotion !== Sad
                  ? setEmotion(Neutral)
                  : null
              }
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

          <p style={{ marginTop: "20px" }}>
            You poked me {totalPokes} times today.
          </p>
        </>
      )}
    </div>
  );
};

export default Chat;
