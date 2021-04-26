/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/order */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import Jumbotron from 'react-bootstrap/Jumbotron';
import React, { Component } from 'react';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import '../../App.css';
import UpperNavbar from '../Commonpage/upperNavbar';
import '../../styles/recentactivity.css';
import SideNavbar from '../Commonpage/SideNavbar';
import TablePage from './recentactivitytable';
import { getRecentActivity } from '../../redux/actions/recentActivityAction';
import { connect } from 'react-redux';

class recentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      activities: {},
      groupName: [],
      displayActivitie: [],
      data: {
        columns: [
          {
            label: 'Group Name',
            field: 'Name',
            sort: 'asc',
          },
          {
            label: 'Recent Activity',
            field: 'status',
            sort: 'asc',
          },
        ],
        rows: [
          {
            id: '1',
            Name: ' Harry ',
            status: '',
          },
          {
            id: '2',
            Name: 'Tom',
            status: '',
          },
          {
            id: '3',
            Name: 'Dick',
            status: '',
          },
        ],
      },
    };
  }

  componentDidMount = async () => {
    console.log('inside did mount');
    const profile = localStorage.getItem('user');
    if (profile !== null) {
      this.state.loggedIn = true;
      const currentUser = JSON.parse(profile);
      console.log('46', currentUser);
      const msg = {
        emailId: currentUser.emailId,
      };
      this.props.getRecentActivity(msg);
    }
  }

  render() {
    console.log(this.props.activities);
    // console.log('state', this.state.activities);
    return (
      <div>
        {/* {redirectVar} */}
        <UpperNavbar />
        <SideNavbar />
        <Jumbotron className="justify-content-md-center Title">
          <h3>Recent Acitivity </h3>
        </Jumbotron>
        <TablePage data={this.props.activities} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.authenticated,
  activities: state.recentActivity.activities,
});

const mapDispatchToProps = (dispatch) => ({
  getRecentActivity: (payload) => dispatch(getRecentActivity(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(recentActivity);
