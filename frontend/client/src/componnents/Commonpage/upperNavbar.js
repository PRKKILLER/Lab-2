/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import '../../App.css';
import { Link, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import '../../styles/commonpage.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';
import { logoutDispatcher } from '../../redux/actions/authAction';

// eslint-disable-next-line react/prefer-stateless-function
class UpperNavbar extends Component {
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props);
    this.state = {
      authFlag: true,
      currentURL: '',
    };
  }

  renderRedirect = () => {
    if (this.state.authFlag === false) {
      return <Redirect to="/" />;
    }
  }

  render() {
    const profile = localStorage.getItem('user');
    const currentUser = JSON.parse(profile);
    const emailId = currentUser.emailId.charAt(0).toLowerCase() + currentUser.emailId.slice(1);
    const urlstring = emailId.replace('@', '%40');
    // eslint-disable-next-line no-underscore-dangle
    this.state.currentURL = `https://splitwisebucket.s3.us-east-2.amazonaws.com/${urlstring}`;

    return (
      <Container className="upperNavbar">
        <div>
          {' '}
          <img id="logosplit" className="rounded-cirlce" src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg" />

          <img id="profilepic" src={this.state.currentURL} />
          <a
            href="/dashboard"
            id="dashboardlink"
          >
            Dashboard

          </a>
          <a
            href="/mygroups"
            id="mygroups"
          >
            Mygroup

          </a>
          <a href="/recentactivity" className="hover-overlay" id="notificatonlink">
            <i className="icon-flag" />
            Recent Activity
          </a>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {currentUser.name}
&nbsp;
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profilepage">Your Profile</Dropdown.Item>
              <Dropdown.Item href="/creategroup">Create Group</Dropdown.Item>
              <Dropdown.Item
                href="/login"
                onClick={() => {
                  this.props.logoutDispatcher();
                }}
              >
                LOGOUT
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </Container>

    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  logoutDispatcher: () => dispatch(logoutDispatcher()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UpperNavbar);
