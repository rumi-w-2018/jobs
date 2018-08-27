import axios from 'axios';
import qs from 'qs';
import reverseGeocode from 'latlng-to-zip';
import { FETCH_JOBS, CLEAR_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types';
import { indeedApiKey } from '../config/config';
import JOB_DATA from './IndeedJobData.json';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const JOB_QUERY_PARAMS = {
  publisher: indeedApiKey,
  format: 'json',
  v: '2',
  latlong: 1, // include latlong in the results
  radius: 10,
  q: 'javascript'
};

const buildJobsUrl = zip => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip }); // l=location
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async dispatch => {
  dispatch({ type: CLEAR_JOBS });
  try {
    let zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    // let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: JOB_DATA });
    callback();
  } catch (error) {
    console.log('error');
  }
};

export const likeJob = job => {
  return {
    type: LIKE_JOB,
    payload: job
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
