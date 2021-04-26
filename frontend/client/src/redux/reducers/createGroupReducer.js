import { GETUSERS, CREATEGROUP, GROUPEPICTURE } from '../constants/types';

const initState = {
  users: [],
  group: {},
};

const createGroupReducer = (state = initState, action) => {
  switch (action.type) {
    case GETUSERS: {
      console.log('action  get user createGroupReducer : ', action.payload);
      return {
        users: action.payload.data.data,
      };
    }
    case CREATEGROUP: {
      // const currentUser = localStorage.getItem('user');
      // console.log('inside prof reducer curr user from LS: ', JSON.parse(currentUser));
      // localStorage.removeItem('user');
      console.log('action  get creategroup createGroupReducer ', action.payload);
      return {
        group: action.payload,
      };
    }
    case GROUPEPICTURE: {
      // const currentUser = localStorage.getItem('user');
      // console.log('inside prof reducer curr user from LS: ', JSON.parse(currentUser));
      // localStorage.removeItem('user');
      console.log('action GROUPEPICTURE createGroupReducer  ', action.payload);
      return {
        group: action.payload,
      };
    }
    default:
      return state;
  }
};

export default createGroupReducer;
