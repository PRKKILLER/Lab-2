/* eslint-disable no-console */
import {
  DELETENOTE, CREATENOTE, GETNOTE, SHOWEXPANSE, ADDEXPENSE, GETGROUPSUMMARY,
} from '../constants/types';

const initState = {
  notes: {},
  expense: {},
  groupsummary: {},
};

const individualGroupReducer = (state = initState, action) => {
  switch (action.type) {
    case DELETENOTE: {
      console.log('action PL inside deletenote reducer: ', action.payload);
      return {
        notes: action.payload.data,
      };
    }
    case CREATENOTE: {
      console.log('action PL inside CREATENOTE reducer: ', action.payload);
      return {
        notes: action.payload,
      };
    }
    case GETNOTE: {
      console.log('action PL inside GETNOTE reducer: ', action.payload);
      return {
        notes: action.payload,
      };
    }
    case SHOWEXPANSE: {
      console.log('action PL inside SHOWEXPANSE reducer: ', action.payload);
      localStorage.setItem('expenses', JSON.stringify(action.payload.data));
      return {
        expense: action.payload.data,
      };
    }
    case ADDEXPENSE: {
      console.log('action PL inside ADDEXPENSE reducer: ', action.payload);
      return {
        expense: action.payload,
      };
    }
    case GETGROUPSUMMARY: {
      console.log('action PL inside GETGROUPSUMMARY reducer: ', action.payload);
      return {
        groupsummary: action.payload,
      };
    }
    default:
      return state;
  }
};

export default individualGroupReducer;
