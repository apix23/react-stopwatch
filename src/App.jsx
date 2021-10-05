import React, { useState, useEffect, useMemo } from "react";
import Button from "./components/Button";
import "./App.css";
import { timeFormatter, checkLapClass } from "./utils/functions";
import EmptyLap from "./components/EmptyLap";
import Lap from "./components/Lap";
import { useTimer } from "./hooks/useTimer";

function App() {
  const [laps, setLaps] = useState([]);

  const [bestWorstLap, setBestWorstLap] = useState({
    best: Infinity,
    worst: -Infinity,
  });

  const [timer, handleStartStop, resetTimeStamp] = useTimer();

  const DEFAULT_EMPTY_VALUE = 6;

  const lapSum = useMemo(
    () => laps.reduce((acc, curr) => acc + curr, 0),
    [laps]
  );

  const lapTime = timer.timeStamp - lapSum;

  const reset = () => {
    resetTimeStamp();
    setLaps([]);
    setBestWorstLap({
      best: Infinity,
      worst: -Infinity,
    });
  };

  const createNewLap = () => {
    setLaps([lapTime, ...laps]);

    setBestWorstLap({
      worst: lapTime > bestWorstLap.worst ? lapTime : bestWorstLap.worst,
      best: lapTime < bestWorstLap.best ? lapTime : bestWorstLap.best,
    });
  };

  const handleLapReset = !timer.isRunning ? reset : createNewLap;

  const drawEmptyLaps = (numberOfLaps) => {
    if (timer.timeStamp) {
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
    return laps.map((lap, index) => {
      const { lapClass } = checkLapClass(laps, lap, bestWorstLap);
      const lapNumber = laps?.length - index;
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
    timer.timeStamp > 0 ? (
      <Lap numberLap={laps.length + 1} time={lapTime} clapClass="" />
    ) : null;

  const classRightButton = `controllers__${timer.isRunning ? "stop" : "start"}`;
  const classLeftButton = `controllers__${
    timer.isRunning || laps.length > 0 ? "lap" : "disabled"
  }`;

  const lapResetText = timer.isRunning || laps.length === 0 ? "Lap" : "Reset";
  const startStopText = timer.isRunning ? "Stop" : "Start";

  return (
    <div className="main">
      <p className="timer">{timeFormatter(timer.timeStamp)}</p>

      <div className="controllers">
        <button
          onClick={handleLapReset}
          disabled={!timer.timeStamp}
          className={classLeftButton}
        >
          {lapResetText}
        </button>

        <button onClick={handleStartStop} className={classRightButton}>
          {startStopText}
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
