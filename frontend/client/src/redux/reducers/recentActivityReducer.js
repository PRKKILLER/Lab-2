import { GETACTIVITIES } from '../constants/types';

const initState = {
  activities: {},
};

const recentActivitiesReducer = (state = initState, action) => {
  switch (action.type) {
    case GETACTIVITIES: {
      console.log('action PL inside recent activity reducer: ', action.payload);
      return {
        activities: action.payload,
      };
    }
    default:
      return state;
  }
};

export default recentActivitiesReducer;
