/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import '../../styles/mygroups.css';

class Usersummary extends Component {
  render() {
    console.log('this user summary props data', this.props.data);
    if (this.props.data === undefined) {
      return (
        <div className="UserSummaryTable">
          <ul className="list-group list-group-item-success">
            <li>blah</li>
            <li>blah</li>
          </ul>
        </div>

      );
    }
    return (
      <div className="UserSummaryTable">
        <ul className="list-group list-group-item-success">
          {/* {this.props.data.body.map((usersummary) => (
            <li className="list-group-item">
              {usersummary.userthatowes}
              {' '}
              Owes
              {' '}
              {usersummary.userthatowns}
              {' '}
              {usersummary.owes}
              $
            </li>
          ))} */}
          <li>blah</li>
          <li>blah</li>
        </ul>
      </div>
    );
  }
}

export default Usersummary;
