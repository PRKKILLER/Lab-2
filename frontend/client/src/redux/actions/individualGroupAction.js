/* eslint-disable no-console */
/* eslint-disable no-alert */
import axios from 'axios';
import {
  DELETENOTE, CREATENOTE, GETNOTE, SHOWEXPANSE, ADDEXPENSE, GETGROUPSUMMARY,
} from '../constants/types';
import API from '../../config';

const deletenoteDispatcher = (payload) => ({
  type: DELETENOTE, payload,
});
const createnoteDispatcher = (payload) => ({
  type: CREATENOTE, payload,
});
const getnoteDispatcher = (payload) => ({
  type: GETNOTE, payload,
});
const showexpenseDispatcher = (payload) => ({
  type: SHOWEXPANSE, payload,
});
const addexpenseDispatcher = (payload) => ({
  type: ADDEXPENSE, payload,
});

const getgroupsumaryDispatcher = (payload) => ({
  type: GETGROUPSUMMARY, payload,
});

const getGroupSummary = (payload) => (dispatch) => {
  console.log('PL for getGroupSummary action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/individualgroup/Groupsummary`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch(getgroupsumaryDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const addExpense = (payload) => (dispatch) => {
  console.log('PL for addExpense action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/individualgroup/addExpense`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        alert('Expense Added successfuly!');
        console.log(res.data);
        dispatch(addexpenseDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const showExpense = (payload) => (dispatch) => {
  console.log('PL for show expense action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/individualgroup/showExpanse`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch(showexpenseDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const createNote = (payload) => (dispatch) => {
  console.log('PL for createNote action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/individualgroup/addExpense`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        alert('createnote successfuly!');
        console.log(res.data);
        dispatch(addexpenseDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};
const deleteNote = (payload) => (dispatch) => {
  console.log('PL for delete note action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/individualgroup/addExpense`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        alert('note deleted successfuly!');
        console.log(res.data);
        dispatch(addexpenseDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

const getNote = (payload) => (dispatch) => {
  console.log('PL for get note action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/individualgroup/showExpanse`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        dispatch(showexpenseDispatcher(res.data));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

export {
  deletenoteDispatcher, createnoteDispatcher, getnoteDispatcher, addexpenseDispatcher,
  showexpenseDispatcher, getgroupsumaryDispatcher,
  getGroupSummary, addExpense, showExpense, getNote, createNote, deleteNote,
};
