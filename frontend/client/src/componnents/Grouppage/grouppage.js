/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import SideNavbar from '../Commonpage/SideNavbar';
import UpperNavbar from '../Commonpage/upperNavbar';
import TablePage from './grouppagetable';
import '../../styles/grouppage.css';
import Example from './grouppagemodal';
import Usersummary from './grouptableusersummary';
import {
  getGroupSummary, addExpense, showExpense, getNote, createNote, deleteNote,
} from '../../redux/actions/individualGroupAction';

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      usersummary: [],
    };
  }

  componentDidMount = async () => {
    console.log('group id', this.props);
    const msg = {};
    msg.groupId = this.props.location.state.group;
    console.log('group id', msg);
    let token = JSON.parse(localStorage.getItem('token'));
    token = token.split(' ');
    // token = token[1];
    console.log(token[1]);
    const config = {
      headers: { Authorization: `Bearer ${token[1]}` },
    };
    const resForExpenseList = await axios.post('http://localhost:3002/individualgroup/showExpanse', msg, config);
    console.log('Expanse', resForExpenseList.data.data.data);
    this.setState({ expenses: resForExpenseList.data.data });
    const resForUserSummary = await axios.post('http://localhost:3002/individualgroup/Groupsummary', msg, config);
    console.log('summary', resForUserSummary.data.data.body);
    this.setState({ usersummary: resForUserSummary.data.data });
  }

  render() {
    // name={this.props.location.state.name});
    console.log(this.props.expenses, 'expenses');
    console.log(this.state.usersummary, 'summary');
    return (
      <div>
        <UpperNavbar />
        <SideNavbar />
        <Example groupId={this.props.location.state.group}/>
        <TablePage data={this.state.expenses}/>
        <Usersummary data={this.state.usersummary}/>

        <TablePage />
        <Usersummary />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   notes: state.individualGroup.notes,
//   expense: state.individualGroup.expense,
//   groupsummary: state.individualGroup.groupsummary,
// });

// const mapDispatchToProps = (dispatch) => ({
//   showExpense: (payload) => dispatch(showExpense(payload)),
//   getGroupSummary: (payload) => dispatch(getGroupSummary(payload)),
//   addExpense: (payload) => dispatch(addExpense(payload)),
//   getNote: (payload) => dispatch(getNote(payload)),
//   createNote: (payload) => dispatch(createNote(payload)),
//   deleteNote: (payload) => dispatch(deleteNote(payload)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
export default GroupPage;
