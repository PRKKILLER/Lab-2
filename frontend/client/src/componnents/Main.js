/* eslint-disable react/jsx-props-no-spreading *//* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable linebreak-style */
/* eslint-disable-next-line */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import signup from './signup/signup';
import dashboard from './Dashboard/dashboard';
import creategroup from './CreateGroup/creategroup';
import mygroups from './Mygroups/mygroups';
import GroupPage from './Grouppage/grouppage';
import Recentactivity from './Recent Activity/recentactivity';
import Profilepage from './Profile Page/Profilepage';
import landing from './Landing/landing';

// Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/* Render Different Component based on Route */}
        <Route path="/login" component={Login} />
        <Route exact path="/signup" component={signup} />
        <Route path="/dashboard" component={dashboard} />
        {/* <Route path="/group/creategroup" component={creategroup} />
        <Route path="/group/mygroups" component={mygroups} />  */}
        {/* <Route path="/group/" render={(props) => <GroupPage {...props} />} /> */}
        {/* <Route path="/group/individualgroup" component={GroupPage} />
        <Route path="/activity/recentactivity" component={Recentactivity} /> */}
        <Route path="/profilepage" component={Profilepage} />
        <Route path="/landing" component={landing} />
      </div>
    );
  }
}
// Export The Main Component
export default Main;
