/* eslint-disable no-alert */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable import/named */
import axios from 'axios';
import {
  login, signup, unauthenticated, logout,
} from '../constants/types';

import API from '../../config';

const loginDispatcher = (payload) => ({
  type: login, payload,
});

const unauthDispatcher = (payload) => ({
  type: unauthenticated, payload,
});

const logoutDispatcher = (payload) => ({
  type: logout, payload,
});

const createUserDispatcher = (payload) => ({
  type: signup, payload,
});

const loginUser = (payload) => (dispatch) => {
  axios.post(`${API.host}/userauth/login`, payload)
    .then((response) => {
      console.log('Status Code : ', response);
      if (response.status === 200) {
        console.log('Response data', response);
        dispatch(loginDispatcher(response.data));
      } else {
        alert('An error occured', response.data);
      }
    })
    .catch((err) => {
      if (err) {
        console.log('error', err);
      } else if (err.response.data.errors.body === 'Unauth User') {
        alert('Wrong Email Or Password');
        console.log(err.response.data.errors);
        dispatch(unauthDispatcher(err.response.data));
      } else {
        dispatch(unauthDispatcher('Server error'));
      }
    });
};

const createUser = (payload) => async (dispatch) => {
  console.log(payload);
  try {
    const response = await axios.post(`${API.host}/userauth/signup`, payload);
    console.log('Status Code : ', response);
    if (response.status === 200) {
      console.log(response);
      dispatch(createUserDispatcher(response.data));
    } else if (response.status === 204) {
      alert(response.body);
    } else if (response.status === 205) {
      alert('user already exist');
    }
  } catch (err) {
    console.log(err);
    dispatch(unauthDispatcher('Server error'));
  }
};

export {
  loginDispatcher, unauthDispatcher, loginUser, createUser, logoutDispatcher, createUserDispatcher,
};
