/* eslint-disable no-console */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
import { UPDATEPROFILE, SETPROFILE } from '../constants/types';

const initState = {
  user: {},
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATEPROFILE: {
      console.log('action PL inside profi reducer: ', action.payload);
      localStorage.setItem('user', JSON.stringify(action.payload.body));
      return {
        user: action.payload.body,
      };
    }
    case SETPROFILE: {
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

export default profileReducer;
