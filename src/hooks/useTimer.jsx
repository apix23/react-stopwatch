import { useState, useEffect } from "react";

export const useTimer = () => {
  const [timer, setTimer] = useState({
    isRunning: false,
    timeStamp: 0,
  });

  useEffect(() => {
    if (timer.isRunning) {
      const startTime = Date.now() - timer.timeStamp;
      const interval = setInterval(() => {
        const currentTime = Date.now();
        setTimer({ ...timer, timeStamp: currentTime - startTime });
      }, 16);
      return () => {
        clearInterval(interval);
      };
    }
  }, [timer.isRunning]);

  const toggleIsRunning = () => {
    setTimer({ ...timer, isRunning: !timer.isRunning });
  };

  const resetTimeStamp = () => {
    setTimer({ ...timer, timeStamp: 0 });
  };

  return [timer, toggleIsRunning, resetTimeStamp];
};
