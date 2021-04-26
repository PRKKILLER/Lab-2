/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import '../../styles/mygroups.css';
import '../../styles/grouppage.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import {
  showExpense, getNote, createNote, deleteNote,
} from '../../redux/actions/individualGroupAction';

class TablePage extends Component {
  componentDidMount=async () => {
    const msg = {};
    msg.groupId = localStorage.getItem('groupId');
    this.props.showExpense(msg);
    // let token = JSON.parse(localStorage.getItem('token'));
    // token = token.split(' ');
    // // token = token[1];
    // console.log(token[1]);
    // const config = {
    //   headers: { Authorization: `Bearer ${token[1]}` },
    // };
    // const resForExpenseList = await axios.post('http://localhost:3002/individualgroup/showExpanse', msg, config);
    // console.log('Expanse', resForExpenseList.data.data.data);
    // this.setState({ expenses: resForExpenseList.data.data });
    // const resForUserSummary = await axios.post('http://localhost:3002/individualgroup/Groupsummary', msg, config);
    // console.log('summary', resForUserSummary.data.data.body);
    // this.setState({ usersummary: resForUserSummary.data.data });
  }

  handleDeleteNote = async (transactioinId, NoteId) => {
    let token = JSON.parse(localStorage.getItem('token'));
    token = token.split(' ');
    // token = token[1];
    console.log(token[1]);
    const config = {
      headers: { Authorization: `Bearer ${token[1]}` },
    };
    const profile = localStorage.getItem('user');
    const currentUser = JSON.parse(profile);
    const { emailId } = currentUser;
    const msg = { transactioinId, NoteId, emailId };
    const deleteres = await axios.post('http://localhost:3002/individualgroup/deleteNote', msg, config);
    if (deleteres.status === 204) {
      alert(deleteres);
      console.log(deleteres);
    }
    console.log('delete response', deleteres);
  }

  handleCreateNote = async (transactioinId, note) => {
    let token = JSON.parse(localStorage.getItem('token'));
    token = token.split(' ');
    // token = token[1];
    console.log(token[1]);
    const config = {
      headers: { Authorization: `Bearer ${token[1]}` },
    };
    const profile = localStorage.getItem('user');
    const currentUser = JSON.parse(profile);
    const { name } = currentUser;
    const { emailId } = currentUser;
    const msg = {
      transactioinId, note, emailId, name,
    };
    const createres = await axios.post('http://localhost:3002/individualgroup/createNote', msg, config);
    console.log('create note response', createres);
  }

  render() {
    console.log(this.props.data, 'prop data');
    if (this.props.data === null && this.props.data === undefined) {
      console.log('emptyadfacasdvadsvkjdsvjklsbdvoiuab');
      return (
        <table className="table" id="grouppagetable">
          <thead>
            <tr>
              <th>Expense description</th>
              <th>Paid By</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Add Note</th>
            </tr>
          </thead>
        </table>
      );
    }
    return (
      <table className="table" id="grouppagetable">
        <thead>
          <tr>
            <th>Expense description</th>
            <th>Paid By</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Notes</th>
            <th>Add Note</th>
          </tr>
        </thead>
        {/* <tbody>
          {this.props.data.map((expense) => (
            <tr>
              <td>{expense.description}</td>
              <td>{expense.paidByName}</td>
              <td>{expense.amount}</td>
              <td>{expense.date.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody> */}
        <tbody>
          <tr>
            <td className="Description">Expense description</td>
            <td className="PaidBy">Paid By</td>
            <td>Amount</td>
            <td>Date</td>
            <td>
              <ul className="list-group noteslist">
                <li className="list-group-item notes">
                  Maine daru nahi piya be
                  <button type="button" className="btn btn-warning btn-sm deletenote">Delete</button>
                </li>
                <li className="list-group-item notes">
                  Maine daru nahi piya be
                  <button type="button" className="btn btn-warning btn-sm deletenote">Delete</button>
                </li>
                <li className="list-group-item notes">
                  Maine daru nahi piya be
                  <button type="button" className="btn btn-warning btn-sm deletenote">Delete</button>
                </li>
              </ul>
            </td>
            <td>
              <textarea placeholder="Add your comments"> </textarea>
              <button className="btn btn-small btn-orange post">Post</button>
            </td>
          </tr>
        </tbody>
      </table>

    );
  }
}

// const mapStateToProps = (state) => ({
//   notes: state.individualGroup.notes,
//   expense: state.individualGroup.expense,
// });

// const mapDispatchToProps = (dispatch) => ({
//   showExpense: (payload) => dispatch(showExpense(payload)),
//   getNote: (payload) => dispatch(getNote(payload)),
//   createNote: (payload) => dispatch(createNote(payload)),
//   deleteNote: (payload) => dispatch(deleteNote(payload)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TablePage);
export default TablePage;
