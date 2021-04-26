/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable max-len */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
// import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../../App.css';
import UpperNavbar from '../Commonpage/upperNavbar';
import '../../styles/profilepage.css';
import SideNavbar from '../Commonpage/SideNavbar';
import API from '../../config';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { setProfile, profileUpdate } from '../../redux/actions/profileAction';

class Profilepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      currentUser: {},
      loggedIn: false,
      currentURL: '',
    };
  }

  componentDidMount = () => {
    console.log('inside did mount');
    const profile = localStorage.getItem('user');
    const currentUser = JSON.parse(profile);
    console.log('46', currentUser);
    if (profile !== null && profile !== undefined) {
      this.state.loggedIn = true;
      this.props.setProfile(currentUser);
      this.setState({ currentUser });
      const emailId = currentUser.emailId.charAt(0).toLowerCase() + currentUser.emailId.slice(1);
      const urlstring = emailId.replace('@', '%40');
      // eslint-disable-next-line no-underscore-dangle
      this.state.currentURL = `https://splitwisebucket.s3.us-east-2.amazonaws.com/${urlstring}`;
    //
    }
    console.log('after did mount');
  }

  handleSubmit = async (e) => {
    const profile = localStorage.getItem('user');
    const currentUser = JSON.parse(profile);
    try {
      e.preventDefault();
      const currency = e.target.default_currency.value === '' ? this.props.profile.currency : e.target.default_currency.value;
      const timezone = e.target.timezone.value === '' ? this.props.profile.timezone : e.target.timezone.value;
      const language = e.target.language.value === '' ? this.props.profile.language : e.target.language.value;
      const name = e.target.name.value === '' ? this.props.profile.name : e.target.name.value;
      const { emailId } = currentUser;
      const number = e.target.phone_number.value === '' ? this.props.profile.phone : e.target.phone_number.value;
      // eslint-disable-next-line no-unused-vars
      const photo = e.target.photo_URL.files[0];
      const image = `https://splitwise-273.s3.us-east-2.amazonaws.com/${currentUser.emailId}`;
      const updateData = {
        currency,
        timezone,
        language,
        name,
        emailId,
        number,
        image,
      };
      console.log('form data: ', updateData);
      console.log(photo);
      if (photo !== '' && photo !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(photo);
        const bodyParameters = new FormData();
        bodyParameters.append('file', photo);
        bodyParameters.append('emailId', currentUser.emailId);
        for (const key of bodyParameters.entries()) {
          console.log(`${key[0]}, ${key[1]}`);
        }
        let token = JSON.parse(localStorage.getItem('token'));
        token = token.split(' ');
        // token = token[1];
        console.log(token[1]);
        const config = {
          headers: { Authorization: `Bearer ${token[1]}` },
        };
        // eslint-disable-next-line no-underscore-dangle
        const resPhotoUrl = await axios.post(`${API.host}/userProfile/addProfilePicture`, bodyParameters, config);
      }
      await this.props.profileUpdate(updateData);
    } catch (err) {
      console.log(err);
      alert('Could not update profile!');
    }
  }

  render() {
    if (// null and undefined check
      Object.keys(this.state.currentUser).length === 0
      && this.state.currentUser.constructor === Object) {
      return (
        <div>
          <SideNavbar />
          <UpperNavbar />
        </div>
      );
    }
    const currentUser = this.props.profile;
    let redirectVar = null;
    if (this.state.loggedIn === false) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        { redirectVar }
        <SideNavbar />
        <UpperNavbar />
        <div className="content-block-1">
          <img className="profile_picture" src={this.state.currentURL} alt="Your Photo" height="200" />
          <form id="new_profile" className="form" method="post" onSubmit={this.handleSubmit}>
            <div id="photo_avatar_upload">
              <input name="photo_URL" type="file" id="profile_picture" onChange={this.onFileChange} />
            </div>
            <div className="input_1">
              <label>Your default currency</label>
              <br />
              <select name="default_currency" defaultValue={currentUser.currency} className="form-select" id="currency">
                <option value="USD">USD </option>
                <option value="KWD">KWD </option>
                <option value="BHD">BHD </option>
                <option value="GPB">GPB </option>
                <option value="EUR">EUR </option>
                <option value="CAD">CAD </option>
              </select>
              <br />
              <label>Your Time Zone</label>
              <br />
              <select name="timezone" defaultValue={currentUser.timezone} className="form-select" id="Time Zone">
                <option value="PST">PST </option>
                <option value="EST">EST </option>
                <option value="IST">IST </option>
                <option value="PMT">PMT </option>
              </select>
              <br />
              <label>Language</label>
              <br />
              <select name="language" className="form-select" id="Language">
                <option value="English">English </option>
                <option value="Spanish">Spanish </option>
              </select>
            </div>
            <div className="input_2">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>User Name</Form.Label>
                <Form.Control name="name" placeholder={currentUser.name} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>
                  Email address : &nbsp;
                  {currentUser.emailId}
                  {' '}

                </Form.Label>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control name="phone_number" type="area" placeholder={currentUser.number} />
              </Form.Group>
            </div>
            <Button type="submit" style={{ backgroundColor: '#ff652f' }} className="btn btn-secondary btn-lg submit">SAVE</Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.auth.authenticated,
  profile: state.profile.user,
});

const mapDispatchToProps = (dispatch) => ({
  setProfile: (payload) => dispatch(setProfile(payload)),
  profileUpdate: (payload) => dispatch(profileUpdate(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profilepage);
