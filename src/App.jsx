import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import "./App.css";
import { timeFormatter } from "./utils/functions";
import EmptyLap from "./components/EmptyLap";
import Lap from "./components/Lap";

const { log: c } = console;

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [timing, setTiming] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - timing;
      const interval = setInterval(() => {
        const currentTime = Date.now();
        setTiming(currentTime - startTime);
      }, 16);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning]);

  const handleLeft = () => {
    if (!isRunning) {
      setTiming(0);
      setLaps([]);
    } else {
      setLaps([timing, ...laps]);
    }
    c(laps);
  };
  const handleRight = () => {
    setIsRunning(!isRunning);
  };

  const drawEmptyLaps = () => {
    const emptyLaps = 6 - laps.length;
    if (emptyLaps > 0) {
      return Array(emptyLaps)
        .fill("")
        .map((_, i) => <EmptyLap key={i} />);
    }
  };

  const drawLaps = () => {
    return laps.map((lap, i) => {
      const lapNumber = laps.length - i;
      return <Lap key={lapNumber} numberLap={lapNumber} time={lap}></Lap>;
    });
  };

  const classRightButton = `controllers__${isRunning ? "stop" : "start"}`;
  const classLeftButton = `controllers__${isRunning ? "disabled" : "lap"}`;

  return (
    <div className="main">
      <p className="timer">{timeFormatter(timing)}</p>

      <div className="controllers">
        <button
          onClick={handleLeft}
          // disabled={!timing}
          className={classLeftButton}
        >
          {isRunning ? "Lap" : "Reset"}
        </button>

        <button onClick={handleRight} className={classRightButton}>
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>

      <div className="lap-container">
        <ul>
          {drawLaps()}
          {drawEmptyLaps()}
        </ul>
      </div>
    </div>
  );
}

export default App;
