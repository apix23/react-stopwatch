export const initialState = {
  isRunning: false,
  timeStamp: 0,
  laps: [],
  best: Infinity,
  worst: -Infinity,
};

export const Actions = {
  TOGGLE_RUNNING: "TOGGLE_RUNNING",
  RESET_TIME: "RESET_TIME",
  UPDATE_TIMESTAMP: "UPDATE_TIMESTAMP",
  ADD_NEW_LAP: "ADD_NEW_LAP",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_RUNNING":
      return { ...state, isRunning: !state.isRunning };

    case "UPDATE_TIMESTAMP":
      return { ...state, timeStamp: action.payload };

    case "RESET_TIME":
      return initialState;

    case "ADD_NEW_LAP":
      return {
        ...state,
        worst: action.payload > state.worst ? action.payload : state.worst,
        best: action.payload < state.best ? action.payload : state.best,
        laps: [action.payload, ...state.laps],
      };

    default:
      throw Error;
  }
};
