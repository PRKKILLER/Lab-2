/* eslint-disable no-console */
import Types from '../constants/authActionTypes';

const initialState = {
  authenticated: false,
  error: '',
  currentUser: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.login: {
      console.log('login', action.payload);
      localStorage.setItem('token', action.payload.body.token);
      return {
        authenticated: true, // after update user formsubmition reset
        currentUser: action.payload.body.data,
      };
    }
    case Types.signup: {
      console.log('InsideSignup', action.payload);
      localStorage.setItem('token', action.payload.body.token);
      return {
        authenticated: true, // after update user formsubmition reset
        currentUser: action.payload.body.data,
      };
    }
    case Types.unauthenticated: {
      console.log(action.payload);
      return {
        authenticated: false,
      };
    }
    case Types.logout: {
      console.log('Inside logout');
      localStorage.removeItem('EmailId');
      return {
        authenticated: false, // after update user formsubmition reset
      };
    }
    default:
      return state;
  }
};

export default reducer;
