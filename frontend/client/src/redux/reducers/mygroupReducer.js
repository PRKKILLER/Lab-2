/* eslint-disable no-console */
import { GETGROUP, ACCEPTINVITATION, LEAVEGROUP } from '../constants/types';

const initState = {
  myGroups: [],
};

const myGroupReducer = (state = initState, action) => {
  switch (action.type) {
    case GETGROUP: {
      console.log('action PL inside profi reducer: ', action.payload.data);
      return Object.assign(state, {
        myGroups: action.payload.data,
      });
    }
    case ACCEPTINVITATION: {
      // const currentUser = localStorage.getItem('user');
      // console.log('inside prof reducer curr user from LS: ', JSON.parse(currentUser));
      // localStorage.removeItem('user');
      console.log('action PL inside set profile: ', action.payload);
      return {
        user: action.payload,
      };
    }
    case LEAVEGROUP: {
      // const currentUser = localStorage.getItem('user');
      // console.log('inside prof reducer curr user from LS: ', JSON.parse(currentUser));
      // localStorage.removeItem('user');
      console.log('action PL inside set profile: ', action.payload);
      return {
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default myGroupReducer;
