/* eslint-disable no-alert */
/* eslint-disable no-console */
import axios from 'axios';
import { UPDATEPROFILE, SETPROFILE } from '../constants/types';
import API from '../../config';

const profileUpdateDispatcher = (payload) => ({
  type: UPDATEPROFILE, payload,
});

const setProfileDispatcher = (payload) => ({
  type: SETPROFILE, payload,
});

const profileUpdate = (payload) => (dispatch) => {
  console.log('PL for prof update action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/userProfile/userDetails`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        alert('Profile updated successfuly!');
        console.log(res.data);
        dispatch(profileUpdateDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const setProfile = (payload) => (dispatch) => {
  console.log('PL for prof set action: ', payload);
  dispatch(setProfileDispatcher(payload));
};

export {
  profileUpdateDispatcher, profileUpdate, setProfileDispatcher, setProfile,
};
