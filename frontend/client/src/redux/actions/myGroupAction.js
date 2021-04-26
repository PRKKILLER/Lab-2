/* eslint-disable no-console */
/* eslint-disable max-len */
import axios from 'axios';
import { ACCEPTINVITATION, LEAVEGROUP, GETGROUP } from '../constants/types';
import API from '../../config';

const acceptInvitationDispatcher = (payload) => ({
  type: ACCEPTINVITATION, payload,
});

const leaveGroupDispatcher = (payload) => ({
  type: LEAVEGROUP, payload,
});

const getGroupDispatcher = (payload) => ({
  type: GETGROUP, payload,
});

const acceptInvitation = (payload) => (dispatch) => {
  console.log('inside acceptinvitation action action: ', payload);
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
        dispatch(ACCEPTINVITATION(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const leaveGroup = (payload) => (dispatch) => {
  console.log('inside leavegrp action: ', payload);
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
        dispatch(leaveGroupDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};
const getGroups = (payload) => (dispatch) => {
  console.log('PL getGroups action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/mygroup/groupsList`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log('group actioin:response from api', res.data);
        dispatch(getGroupDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

export {
  getGroups, leaveGroup, acceptInvitation, getGroupDispatcher, leaveGroupDispatcher, acceptInvitationDispatcher,
};
