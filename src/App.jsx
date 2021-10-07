import React, { useState, useReducer, useMemo } from "react";
import Button from "./components/Button";
import "./App.css";
import { timeFormatter, checkLapClass } from "./utils/functions";
import EmptyLap from "./components/EmptyLap";
import Lap from "./components/Lap";
import { useTimer } from "./hooks/useTimer";
import { Actions, initialState, reducer } from "./utils/reducer";

function App() {
  const [timer, dispatch] = useReducer(reducer, initialState);

  useTimer(timer, dispatch);

  const DEFAULT_EMPTY_VALUE = 6;

  const lapSum = useMemo(
    () => timer.laps.reduce((acc, curr) => acc + curr, 0),
    [timer.laps]
  );

  const lapTime = timer.timeStamp - lapSum;

  const reset = () => {
    dispatch({ type: Actions.RESET_TIME });
  };

  const createNewLap = () => {
    dispatch({ type: Actions.ADD_NEW_LAP, payload: lapTime });
  };

  const handleLapReset = !timer.isRunning ? reset : createNewLap;

  const handleStartStop = () => dispatch({ type: Actions.TOGGLE_RUNNING });

  const drawEmptyLaps = (numberOfLaps) => {
    if (timer.timeStamp) {
      numberOfLaps -= 1;
    }
    const emptyLaps = numberOfLaps - timer.laps.length;
    if (emptyLaps > 0) {
      return Array(emptyLaps)
        .fill("")
        .map((_, i) => <EmptyLap key={i} />);
    }
  };

  const drawLaps = () => {
    return timer.laps.map((lap, index) => {
      const lapClass =
        timer.laps.length > 1
          ? checkLapClass(lap, timer.best, timer.worst)
          : "";

      const lapNumber = timer.laps?.length - index;
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
      <Lap numberLap={timer.laps.length + 1} time={lapTime} lapClass="" />
    ) : null;

  const classRightButton = `controllers__${timer.isRunning ? "stop" : "start"}`;
  const classLeftButton = `controllers__${
    timer.isRunning || timer.laps.length > 0 ? "lap" : "disabled"
  }`;

  const lapResetText =
    timer.isRunning || timer.laps.length === 0 ? "Lap" : "Reset";
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
