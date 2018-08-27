import uniqueBy from 'lodash/uniqBy';
import { LIKE_JOB, CLEAR_LIKED_JOBS } from '../actions/types';

const likeReducer = (state = [], action) => {
  switch (action.type) {
    case LIKE_JOB:
      return uniqueBy([action.payload, ...state], 'jobkey');

    case CLEAR_LIKED_JOBS:
      return [];

    default:
      return state;
  }
};

export default likeReducer;
