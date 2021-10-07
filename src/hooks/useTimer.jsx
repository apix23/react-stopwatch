import { useEffect } from "react";
import { Actions } from "../utils/reducer";

export const useTimer = (timer, dispatch) => {
  useEffect(() => {
    if (timer.isRunning) {
      const startTime = Date.now() - timer.timeStamp;
      const interval = setInterval(() => {
        const currentTime = Date.now();
        dispatch({
          type: Actions.UPDATE_TIMESTAMP,
          payload: currentTime - startTime,
        });
      }, 16);
      return () => {
        clearInterval(interval);
      };
    }
  }, [timer.isRunning]);
};
