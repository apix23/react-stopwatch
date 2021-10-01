import React, { useState, useEffect, useMemo } from "react";
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
  const DEFAULT_EMPTY_VALUE = 6;
  const lapSum = useMemo(
    () => laps.reduce((acc, curr) => acc + curr, 0),
    [laps]
  );

  const lapTime = timing - lapSum;

  const [bestWorstLap, setBestWorstLap] = useState({
    best: Infinity,
    worst: -Infinity,
  });

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

  const handleLapReset = () => {
    if (!isRunning) {
      setTiming(0);
      setLaps([]);
      setBestWorstLap({
        best: Infinity,
        worst: -Infinity,
      });
    } else {
      setLaps([lapTime, ...laps]);

      setBestWorstLap({
        worst: lapTime > bestWorstLap.worst ? lapTime : bestWorstLap.worst,
        best: lapTime < bestWorstLap.best ? lapTime : bestWorstLap.best,
      });
    }
  };

  const handleStartStop = () => {
    if (!timing) {
    }
    setIsRunning(!isRunning);
  };

  const drawEmptyLaps = (numberOfLaps) => {
    if (timing && isRunning) {
      numberOfLaps -= 1;
    }
    const emptyLaps = numberOfLaps - laps.length;
    if (emptyLaps > 0) {
      return Array(emptyLaps)
        .fill("")
        .map((_, i) => <EmptyLap key={i} />);
    }
  };

  const drawLaps = () => {
    return laps.map((lap, i) => {
      let lapClass = "";
      const lapNumber = laps.length - i;
      if (laps.length > 1) {
        if (lap === bestWorstLap.best) {
          lapClass = "lap-container__letter-green";
        } else if (lap === bestWorstLap.worst) {
          lapClass = "lap-container__letter-red";
        }
      }
      return (
        <Lap
          key={lapNumber}
          lapClass={lapClass}
          numberLap={lapNumber}
          time={lap}
        />
      );
    });
  };

  const timingLap =
    timing > 0 ? (
      <Lap numberLap={laps.length + 1} time={lapTime} clapClass="" />
    ) : null;

  const classRightButton = `controllers__${isRunning ? "stop" : "start"}`;
  const classLeftButton = `controllers__${
    isRunning || laps.length > 0 ? "lap" : "disabled"
  }`;

  return (
    <div className="main">
      <p className="timer">{timeFormatter(timing)}</p>

      <div className="controllers">
        <button
          onClick={handleLapReset}
          disabled={!timing}
          className={classLeftButton}
        >
          {isRunning && laps.length >= 0 ? "Lap" : "Reset"}
        </button>

        <button onClick={handleStartStop} className={classRightButton}>
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>

      <div className="lap-container">
        <ul>
          {timingLap}

          {drawLaps()}
          {drawEmptyLaps(DEFAULT_EMPTY_VALUE)}
        </ul>
      </div>
    </div>
  );
}

export default App;
