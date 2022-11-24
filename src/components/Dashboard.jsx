import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { PieChart } from "react-minimal-pie-chart";

import SadOpenMouth from "../assets/Designs/Chameleon_Sad (Open).png";
import Confused from "../assets/Designs/Chameleon_Confused.png";
import Excited from "../assets/Designs/Chameleon_Excited.png";
import Neutral from "../assets/Designs/Chameleon_Neutral.png";

import { WindupChildren } from "windups";

const Dashboard = ({ dashboard, data }) => {
  const [selected, setSelected] = useState();

  const [hovered, setHovered] = useState(undefined);
  const [emotion, setEmotion] = useState(Neutral);
  const [emotionString, setEmotionString] = useState("");

  const biggestValue = Math.max(...Object.values(data));

  const biggestKey = Object.keys(data).find(
    (key) => data[key] === biggestValue
  );

  let chartData = [
    { title: "Confused", value: data.confused, color: "#29a7aa" },
    { title: "Happy", value: data.happy, color: "#3cae3c" },
    { title: "Sad", value: data.sad, color: "#3935a8" },
  ];

  const isNotNull = emotionString !== "";

  useEffect(() => {
    if (selected === undefined) {
      setEmotion(Neutral);
      setEmotionString("");
    } else if (selected === 0) {
      setEmotion(Confused);
      setEmotionString(
        <WindupChildren>Are you sure your staff is ok?</WindupChildren>
      );
    } else if (selected === 1) {
      setEmotion(Excited);
      setEmotionString(<WindupChildren>Your staff are Happy</WindupChildren>);
    } else {
      setEmotion(SadOpenMouth);
      setEmotionString(<WindupChildren>Your staff are Sad</WindupChildren>);
    }
  }, [selected]);

  useEffect(() => {
    if (biggestKey === "confused") {
      setSelected(0);
    } else if (biggestKey === "happy") {
      setSelected(1);
    } else {
      setSelected(2);
    }
  }, []);

  console.log(selected);

  chartData = chartData.map((entry, i) => {
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
            data={chartData}
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
        <h2 style={{ marginTop: "6rem", fontSize: "3rem" }}>{emotionString}</h2>
      )}
    </>
  );
};

export default Dashboard;
