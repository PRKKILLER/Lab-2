/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable consistent-return */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from './dashboardUpper';
import Footer from './dashboardLower';
import UpperNavbar from '../Commonpage/upperNavbar';
import '../../styles/dashboard.css';
import SideNavbar from '../Commonpage/SideNavbar';
import { settleUp, userOwes, userOwed } from '../../redux/actions/dashboardAction';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserOwesRes: [],
      UserOwedRes: [],
      settleUpList: [],
    };
  }

  componentDidMount = async () => {
    const profile = localStorage.getItem('user');
    const currentUser = JSON.parse(profile);
    const { emailId } = currentUser;
    const UserOwesRes = await axios.post('http://localhost:3002/dashboard/userOwes', { emailId });
    const UserOwedRes = await axios.post('http://localhost:3002/dashboard/userOwed', { emailId });
    console.log('UserOwesRes', UserOwesRes.data.data.body);
    console.log('UserOwedRes', UserOwedRes.data.data.body);
    this.setState({ UserOwedRes: UserOwedRes.data.data.body });
    this.setState({ UserOwesRes: UserOwesRes.data.data.body });
    const UserOwesArray = UserOwedRes.data.data.body;
    const UserOwedArray = UserOwedRes.data.data.body;
    if (UserOwedArray !== undefined) {
    // const SettleupRes = await axios.post('http://localhost:3002/dashboard/settleup', {UserId1, UserId2,});
      const owedList = UserOwedArray.map((user) => user.userthatowes);
      // const owesList = UserOwesRes.map((user) => user.UserId1);
      const settleUpList = owedList.map((user) => ({
        label: user,
        value: user,
      }));
      this.setState({ settleUpList });
    }
  }

  render() {
    const token = localStorage.getItem('token');
    let redirectVar = null;
    if (token === false || token === undefined || token === null) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.UserOwedRes === null) {
      return (
        <div>
          {redirectVar}
          <UpperNavbar />
          <SideNavbar />
          <Header />
          <Footer owes={this.state.UserOwesRes} />
        </div>
      );
    } if (this.state.UserOwesRes === null) {
      return (
        <div>
          {redirectVar}
          <UpperNavbar />
          <SideNavbar />
          <Header />
          <Footer owed={this.state.UserOwedRes} />
        </div>
      );
    }
    return (
      <div>
        {redirectVar}
        <UpperNavbar />
        <SideNavbar />
        <Header settleList={this.state.settleUpList} />
        <Footer owed={this.state.UserOwedRes} owes={this.state.UserOwesRes} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.authenticated,
  userOwed: state.dashboard.userOwed,
  userOwes: state.dashboard.userOwes,
});

const mapDispatchToProps = (dispatch) => ({
  settleUp: (payload) => dispatch(settleUp(payload)),
  userOwes: (payload) => dispatch(userOwes(payload)),
  userOwed: (payload) => dispatch(userOwed(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
