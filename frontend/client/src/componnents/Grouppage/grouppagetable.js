/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
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
  constructor(props) {
    super(props);
    this.state = {
      note: '',
    };
  }

  componentDidMount=async () => {
    const msg = {};
    msg.groupId = localStorage.getItem('groupId');
  }

  handleTextChange = (e) => {
    this.setState({ note: e.target.value });
  };

  handleDeleteNote = async (transactionId, NoteId) => {
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
    const msg = { transactionId, NoteId, emailId };
    const deleteres = await axios.post('http://localhost:3002/individualgroup/deleteNote', msg, config);
    if (deleteres.status === 204) {
      alert(deleteres.data);
      console.log(deleteres.data);
    } else if (deleteres.status === 205) {
      alert(deleteres.data);
      console.log(deleteres.data);
    }
    alert('delete response', deleteres);
  }

  handleCreateNote = async (transactionId) => {
    console.log(transactionId);
    const { note } = this.state;
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
      transactionId, note, emailId, name,
    };
    console.log('req body', msg);
    const createres = await axios.post('http://localhost:3002/individualgroup/createNote', msg, config);
    console.log('create note response', createres);
  }

  render() {
    console.log(this.props.data.data, 'prop data');
    console.log(this.state.note);
    if (this.props.data.data === undefined) {
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
        <tbody>
          {this.props.data.data.map((expense) => (
            <tr>
              <td className="Description">{expense.description}</td>
              <td className="PaidBy">{expense.paidByName}</td>
              <td>{expense.amount}</td>
              <td>{expense.date}</td>
              <td>
                <ul className="list-group noteslist">
                  {expense.notes.map((note) => (
                    <li className="list-group-item notes">
                      {note.note}
                      :
                      {' '}
                      {note.name}
                      <button type="button" className="btn btn-warning btn-sm deletenote" onClick={() => this.handleDeleteNote(expense._id, note._id)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <textarea placeholder="Add your comments" onChange={(e) => this.handleTextChange(e)}> </textarea>
                <button className="btn btn-small btn-orange post" onClick={() => this.handleCreateNote(expense._id)}>Post</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    );
  }
}

export default TablePage;
