/* eslint-disable no-console */
import {
  login, signup, unauthenticated, logout,
} from '../constants/types';

const initialState = {
  authenticated: false,
  error: '',
  tempUser: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case login: {
      console.log('login', action.payload);
      localStorage.setItem('token', JSON.stringify(action.payload.body.token));
      localStorage.setItem('user', JSON.stringify(action.payload.body.data));
      return {
        authenticated: true, // after update user formsubmition reset
        tempUser: action.payload,
      };
    }
    case signup: {
      console.log('InsideSignup', action.payload);
      localStorage.setItem('token', JSON.stringify(action.payload.body.token));
      localStorage.setItem('user', JSON.stringify(action.payload.body.data));
      return {
        authenticated: true, // after update user formsubmition reset
        tempUser: action.payload,
      };
    }
    case unauthenticated: {
      console.log(action.payload);
      return {
        authenticated: false,
      };
    }
    case logout: {
      console.log('Inside logout');
      localStorage.removeItem('token');
      return {
        authenticated: false, // after update user formsubmition reset
      };
    }
    default:
      return state;
  }
};

export default reducer;
