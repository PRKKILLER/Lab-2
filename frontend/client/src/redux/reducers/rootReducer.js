import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import myGroupReducer from './mygroupReducer';
import recentActivitiesReducer from './recentActivityReducer';
import individualGroupReducer from './individualGroupReducer';
import dashboardReducer from './dashboardReducer';
import createGroupReducer from './createGroupReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  group: myGroupReducer,
  recentActivity: recentActivitiesReducer,
  individualGroup: individualGroupReducer,
  dashboard: dashboardReducer,
  createGroup: createGroupReducer,
});

export default rootReducer;
