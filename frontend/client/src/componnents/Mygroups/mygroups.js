/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import {
//   MDBBtn, MDBTable, MDBTableBody, MDBTableHead,
// } from 'mdbreact';
// import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import axios from 'axios';
import Select from 'react-select';
import UpperNavbar from '../Commonpage/upperNavbar';
import '../../styles/mygroups.css';
import TablePage from './mygroupstable';
import { getGroups, leaveGroup, acceptInvitation } from '../../redux/actions/myGroupAction';
// import isEmpty from lodash;
import API from '../../config';

class Mygroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: [],
      redirect: false,
      options: [],
      selected: '',
      selectedName: '',
      isgrouplistnull: true,
      currentUser: {},
    };
  }

  componentDidMount = async () => {
    console.log('inside did mount');
    const profile = localStorage.getItem('user');
    this.state.currentUser = JSON.parse(profile);
    const msg = {};
    msg.emailId = this.state.currentUser.emailId;
    await this.props.getGroups(msg);
    let token = JSON.parse(localStorage.getItem('token'));
    token = token.split(' ');
    // token = token[1];
    console.log(token[1]);
    const config = {
      headers: { Authorization: `Bearer ${token[1]}` },
    };
    axios.post(`${API.host}/mygroup/groupsList`, msg, config)
      .then((res) => {
        if (res.status === 200) {
          console.log('group actioin:response from api', res.data);
          this.setState({ groupList: res.data });
          const options = [];
          res.data.data.map((group) => options.push({
            label: group.name,
            value: group._id,
          }));
          console.log(options);
          this.setState({ options });
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  handleChange = (option) => {
    // console.log(option.label);
    this.setState({ selected: option.value });
    localStorage.setItem('groupId', option.value);
    localStorage.setItem('groupName', option.label);
  }

  handleClick = () => {
    this.setState({ redirect: true });
  }

  render() {
    console.log(this.state.options);
    console.log(this.state.selected);
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/group/${this.state.selected}`,
            state: { group: this.state.selected },
          }}
        />
      );
    }
    if (// null and undefined check
      Object.keys(this.state.currentUser).length === 0
      && this.state.currentUser.constructor === Object) {
      return (
        <div>
          <UpperNavbar />
        </div>
      );
    }
    let redirectVar = null;
    const profile = localStorage.getItem('user');
    const currentUser = JSON.parse(profile);
    console.log('46', currentUser);
    if (currentUser === null && currentUser === undefined) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <UpperNavbar />
        <div className="GotoGroup">
          {alert}
          <button type="button" className="btn btn-outline-secondary" onClick={this.handleClick}>Go to group</button>
        </div>
        <Select
          className="sort"
          options={this.state.options}
          onChange={(opt) => this.handleChange(opt)}
        />
        <TablePage data={this.state.groupList} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mygroup: state.group.myGroups,
});

const mapDispatchToProps = (dispatch) => ({
  getGroups: (payload) => dispatch(getGroups(payload)),
  leaveGroup: (payload) => dispatch(leaveGroup(payload)),
  acceptInvitation: (payload) => dispatch(acceptInvitation(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mygroups);
