/* eslint-disable no-alert */
/* eslint-disable no-console */
import axios from 'axios';
import { GETACTIVITIES } from '../constants/types';
import API from '../../config';
import getDataForRecentActivity from '../../utils/recentActivityUtils';

const recentActivityDispatcher = (payload) => ({
  type: GETACTIVITIES, payload,
});

const getRecentActivity = (payload) => (dispatch) => {
  console.log('inside recent activity action: ', payload);
  let token = JSON.parse(localStorage.getItem('token'));
  token = token.split(' ');
  // token = token[1];
  console.log(token[1]);
  const config = {
    headers: { Authorization: `Bearer ${token[1]}` },
  };
  axios.post(`${API.host}/RecentActivity/getRecentActivity`, payload, config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        const activities = res.data.data;
        const cleanActivities = [];
        for (let i = 0; i < activities.length; i += 1) {
          console.log(activities[i]);
          for (let j = 0; j < activities[i].length; j += 1) {
            cleanActivities.push(activities[i][j]);
          }
        }
        const tableData = getDataForRecentActivity(cleanActivities);
        dispatch(recentActivityDispatcher(tableData));
      }
    })
    .catch((errors) => {
      console.log(errors);
    });
};

export {
  getRecentActivity, recentActivityDispatcher,
};
