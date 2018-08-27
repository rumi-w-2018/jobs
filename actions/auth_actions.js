import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';
import { facebookAppId } from '../config/config';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

// This is async action creator. So '= () => async dispatch =>' is necessary
export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch); // Pass dispatch to helper function
  }
};

// This is Not action creator, an async helper function.
// dispatch is just passed so that helper function can use dispatch.
const doFacebookLogin = async dispatch => {
  // result object includes token and type properties -> destructure
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(facebookAppId, {
    permissions: ['public_profile']
  });

  // type - tells if authentication was successful
  // type=cancel means something went wrong.
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
