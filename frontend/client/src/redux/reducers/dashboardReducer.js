/* eslint-disable no-console */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
import { SETTLEUP, GETUSEROWES, GETUSEROWED } from '../constants/types';

const initState = {
  userOwes: {},
  userOwed: {},
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case GETUSEROWES: {
      console.log('action PL userowes reducer: ', action.payload.body);
      return {
        userOwes: action.payload.body,
      };
    }
    case GETUSEROWED: {
      console.log('action PL userowed reducer ', action.payload.body);
      return {
        userOwed: action.payload.body,
      };
    }
    case SETTLEUP: {
      console.log('action PL SETTLEUP reducer ', action.payload.body);
      return {
        settleup: action.payload.body,
      };
    }
    default:
      return state;
  }
};

export default profileReducer;
