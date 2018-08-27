import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './job_reducer';
import likedJobs from './like_reducer';

const combinedReducers = combineReducers({
  auth,
  jobs,
  likedJobs
});

export default combinedReducers;
