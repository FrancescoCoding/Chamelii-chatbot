import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { PieChart } from "react-minimal-pie-chart";

import SadOpenMouth from "../assets/Designs/Chameleon_Sad (Open).png";
import Confused from "../assets/Designs/Chameleon_Confused.png";
import Excited from "../assets/Designs/Chameleon_Excited.png";
import Neutral from "../assets/Designs/Chameleon_Neutral.png";

const Dashboard = () => {
  const [selected, setSelected] = useState(undefined);
  const [hovered, setHovered] = useState(undefined);
  const [isMount, setIsMount] = useState(true);

  const [emotion, setEmotion] = useState(Neutral);
  const [emotionString, setEmotionString] = useState("");

  const [pValues, setPValues] = useState(null);

  let data = [
    { title: "Confused", value: 100, color: "#29a7aa" },
    { title: "Happy", value: 50, color: "#3cae3c" },
    { title: "Sad", value: 100, color: "#3935a8" },
  ];

  const isNotNull = emotionString !== "";
  
  useEffect(() => {
    if(isMount){
      setIsMount(false);
      return;
  }
  
    if (selected === undefined) {
      setEmotion(Neutral);
      setEmotionString ("");
      
    } else if (selected === 0) {
        setEmotion(Confused);
        setEmotionString ("Your staff are Confused");
    } else if (selected === 1) {
      setEmotion(Excited);
      setEmotionString ("Your staff are Happy");
    } else {
      setEmotion(SadOpenMouth);
      setEmotionString ("Your staff are Sad");
    }
  }, [selected]);

  data = data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: "#333",
      };
    }
    return entry;
  });

  const defaultLabelStyle = {
    fontSize: "8px",
    fill: "#fff",
    fontFamily: "sans-serif",
  };

  return (
    <>
      <div className={styles["chart-wrapper"]}>
        <img
          src={emotion}
          alt={`${String(emotion).split("/")[3].split(".")[0]}`}
        />
        <div className={styles.chart}>
          <PieChart
            data={data}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            labelStyle={{
              ...defaultLabelStyle,
            }}
            radius={50 - 6}
            segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
            segmentsShift={(index) => (index === selected ? 6 : 1)}
            onClick={(event, index) => {
              setSelected(index === selected ? undefined : index);
            }}
            onMouseOver={(_, index) => {
              setHovered(index);
            }}
            onMouseOut={() => {
              setHovered(undefined);
            }}
          />
        </div>
      </div>
      {isNotNull && (
        <h2 style={{ marginBottom: "10px" }}>{emotionString}</h2>
      )}
    </>
  );
};

export default Dashboard;
