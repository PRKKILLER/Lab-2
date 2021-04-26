/* eslint-disable no-alert */
/* eslint-disable no-console */
import axios from 'axios';
import { GETUSERS, CREATEGROUP, GROUPEPICTURE } from '../constants/types';
import API from '../../config';

const getUserDispatcher = (payload) => ({
  type: GETUSERS, payload,
});

const createGroupDispatcher = (payload) => ({
  type: CREATEGROUP, payload,
});
const setGroupPictureDispatcher = (payload) => ({
  type: GROUPEPICTURE, payload,
});

const getUsers = (payload) => (dispatch) => {
  console.log('PL for get users action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/group/getAllUsersExceptCurrent`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch(getUserDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const createGroup = (payload) => (dispatch) => {
  console.log('PL create group  action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/group/creategroup`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch(createGroupDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const setGroupPicture = (payload) => (dispatch) => {
  console.log('PL for set group picture action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/group/getAllUsersExceptCurrent`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch(setGroupPictureDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

export {
  getUsers, createGroup, setGroupPicture, createGroupDispatcher,
  setGroupPictureDispatcher, getUserDispatcher,
};
