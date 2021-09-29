import React from "react";
import { timeFormatter } from "../utils/functions";

const Lap = ({ numberLap, time }) => {
  return (
    <li className="lap-container_lap">
      <span>Lap {numberLap}</span>
      <span className="timer">{timeFormatter(time)}</span>
    </li>
  );
};

export default Lap;
