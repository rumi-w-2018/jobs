import { FETCH_JOBS, CLEAR_JOBS } from '../actions/types';

const INITIAL_STATE = {
  results: []
};

const jobReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload; // Completely replace old results with new

    // Needed to clear results using fake data. Otherwise Swipe didn't redraw.
    case CLEAR_JOBS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default jobReducer;
