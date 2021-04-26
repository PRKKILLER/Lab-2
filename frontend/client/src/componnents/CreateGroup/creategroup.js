/* eslint-disable import/order */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-alert */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import UpperNavbar from '../Commonpage/upperNavbar';
import '../../App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../styles/creategroup.css';
import Select from 'react-select';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getUsers, createGroup, setGroupPicture } from '../../redux/actions/createGroupAction';

// eslint-disable-next-line react/prefer-stateless-function
class Creategroup extends Component {
  constructor(props) { // Call the constrictor of Super class i.e The Component
    super(props);
    // maintain the state required for this component
    this.state = {
      users: [],
      selected: [],
      emailId: '',
      // selectedUser:'',
      memberSelect: [],
    };
  }

  // handleChange(e) {
  //   this.setState({ value: event.target.value });
  // }

  // handleSubmit(e) {
  //   event.preventDefault();
  // }

  addMoreUsers = () => {
    this.setState({
      memberSelect: [...this.state.memberSelect,
        <div className=" d-flex flex-row bd-highlight mb-3 fields ">
          <Select
            className="names"
            options={this.state.users}
            onChange={(opt) => this.handleSelect(opt)}
          />
        </div>,
      ],
    });
  }

  componentDidMount = async () => {
    const profile = localStorage.getItem('user');
    const currentUser = JSON.parse(profile);
    const { emailId } = currentUser;
    this.props.getUsers({ emailId });
    console.log(emailId);
    let token = JSON.parse(localStorage.getItem('token'));
    token = token.split(' ');
    console.log(token[1]);
    const config = {
      headers: { Authorization: `Bearer ${token[1]}` },
    };
    let userListRes = await axios.post('http://localhost:3002/group/getAllUsersExceptCurrent', { emailId }, config);
    console.log(userListRes.data.data.data);
    userListRes = userListRes.data.data.data;
    const options = [];
    userListRes.forEach((user) => {
      options.push({
        label: user.emailId,
        value: user.emailId,
      });
    });
    console.log(options);
    this.setState({ users: options });
  }

  handleSelect = (opt) => {
    let newOpts = this.state.selected.concat({ emailId: opt.value });
    newOpts = _.uniqBy(newOpts, 'emailId');
    this.setState({ selected: newOpts });
  }

   editSearchTerm=(e) => {
     this.setState({ searchTerm: e.target.value });
   }

  dynamicSearch=(e) => {
    this.state.names.filter((name) => name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log('target', e.target.groupName.value);
    const profile = localStorage.getItem('user');
    const currentUser = JSON.parse(profile);
    const selUsers = this.state.selected;
    console.log('selected ', selUsers);
    const reqForCreate = {
      name: e.target.groupName.value,
      creatorId: currentUser.emailId,
      users: selUsers,
    };
    console.log(reqForCreate);
    console.log(selUsers);
    try {
      // console.log('selected list', this.state.selected);
      let token = JSON.parse(localStorage.getItem('token'));
      token = token.split(' ');
      // token = token[1];
      console.log(token[1]);
      const config = {
        headers: { Authorization: `Bearer ${token[1]}` },
      };
      const groupCreateRes = await axios.post('http://localhost:3002/group/creategroup', reqForCreate, config);
      console.log('id: ', groupCreateRes);
      if (groupCreateRes.status === 200) {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      alert(err);
    }
  }

  render() {
    // console.log(this.state.selected);
    console.log(this.props.group);
    console.log(this.props.users);
    const token = localStorage.getItem('token');
    let redirectVar = null;
    if (token === false || token === undefined || token === null) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <UpperNavbar />
        <div className="content-block">
          <img className="envelope" name="grouppic" src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg" alt="No img" width="200" height="200" />
          <h2>Start a new group</h2>
          <form id="new_group" className="form" onSubmit={this.handleSubmit}>
            <div id="group_avatar_upload">
              <input type="file" id="group_avatar" />
            </div>
            <div className="Mygroupshallbe">
              My group shall be called…
            </div>
            <input tabIndex="1" placeholder="Home Expenses" name="groupName" autoComplete="off" type="text" id="group_name" />
            <hr />
            <h2>Group Memebers</h2>
            {/* <div className=" d-flex flex-row bd-highlight mb-3 fields ">
              <Select
                className="names"
                options={this.state.users}
                onChange={(opt) => this.handleSelect(opt)}
              />
    </div> */}
            <div className=" d-flex flex-row bd-highlight mb-3 fields ">
              <Select
                className="names"
                options={this.state.users}
                onChange={(opt) => this.handleSelect(opt)}
              />
            </div>
            <div className=" d-flex flex-row bd-highlight mb-3 fields ">
              <Select
                className="names"
                options={this.state.users}
                onChange={(opt) => this.handleSelect(opt)}
              />
            </div>
            <div className=" d-flex flex-row bd-highlight mb-3 fields ">
              <Select
                className="names"
                options={this.state.users}
                onChange={(opt) => this.handleSelect(opt)}
              />
            </div>
            {this.state.memberSelect}
            <Button type="submit" className="btn-outline-info" onClick={this.addMoreUsers}> + Add more users </Button>
            <br />
            <br />
            <br />
            <Button type="submit" value="Submit" style={{ backgroundColor: '#ff652f' }} className="btn btn-secondary btn-lg">SAVE</Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  group: state.createGroup.group,
  users: state.createGroup.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: (payload) => dispatch(getUsers(payload)),
  createGroup: (payload) => dispatch(createGroup(payload)),
  setGroupPicture: (payload) => dispatch(setGroupPicture(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Creategroup);
