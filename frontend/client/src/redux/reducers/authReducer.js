/* eslint-disable no-console */
import Types from '../constants/authActionTypes';

const initialState = {
  authenticated: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.login: {
      console.log('login', action.payload);
      localStorage.setItem('EmailId', action.payload.body.data);
      return {
        authenticated: true, // after update user formsubmition reset
      };
    }
    case Types.signup: {
      console.log('InsideSignup', action.payload);
      localStorage.setItem('EmailId', action.payload.body.data);
      return {
        authenticated: true, // after update user formsubmition reset
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