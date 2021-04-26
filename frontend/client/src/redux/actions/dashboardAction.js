/* eslint-disable no-alert */
/* eslint-disable no-console */
import axios from 'axios';
import { SETTLEUP, GETUSEROWES, GETUSEROWED } from '../constants/types';
import API from '../../config';

const userOwesDispatcher = (payload) => ({
  type: GETUSEROWES, payload,
});

const userOwedDispatcher = (payload) => ({
  type: GETUSEROWED, payload,
});
const settleupDispatcher = (payload) => ({
  type: SETTLEUP, payload,
});

const userOwed = (payload) => (dispatch) => {
  console.log('PL for userowed  action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/dashboard/userOwed`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch(userOwedDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const userOwes = (payload) => (dispatch) => {
  console.log('PL for userowes action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/dashboard/userOwes`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch(userOwesDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};
const settleUp = (payload) => (dispatch) => {
  console.log('PL for settleUp action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/dashboard/settleup`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        alert('SettleUP successfuly!');
        console.log('SettleUP successfuly!', res.data);
        dispatch(userOwesDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};
export {
  userOwesDispatcher, userOwedDispatcher, settleupDispatcher, settleUp, userOwes, userOwed,
};
