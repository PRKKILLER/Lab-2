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
import ExpenseModal from './grouppagemodal';
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
    console.log(this.state.expenses, 'expenses');
    console.log(this.state.usersummary, 'summary');
    return (
      <div>
        <UpperNavbar />
        <SideNavbar />
        <ExpenseModal groupId={this.props.location.state.group}/>
        <TablePage data={this.state.expenses}/>
        <Usersummary data={this.state.usersummary}/>
      </div>
    );
  }
}

export default GroupPage;
