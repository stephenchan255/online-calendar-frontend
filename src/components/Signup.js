import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { postData } from '../services/postData';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      redirectToReferrer: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'} />)
    }

    return (
      <div className="container mt-5 col-sm-8 col-md-6 col-lg-4 text-center">
        <div className="form-group">
          <input type="text" name="email" placeholder="Email" className="form-control" onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
          <input type="text" name="username" placeholder="Username" className="form-control" onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password" className="form-control" onChange={this.handleInputChange} />
        </div>
        <input type="submit" className="btn btn-success col-12 font-weight-bold my-2 py-2" value="Sign Up" onClick={this.signup} />
        <div className="text-center my-3">
          <a href="/">Login</a>
        </div>
      </div>
    );
  }

  signup() {
    if (this.state.username && this.state.password
      && this.state.email) {
      postData('signup', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        } else {
          alert(result.error);
        }
      });
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
}