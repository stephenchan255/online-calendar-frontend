import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { postData } from '../services/postData';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this)
  }

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'} />)
    }

    return (
      <div className="container mt-5 col-sm-8 col-md-6 col-lg-4 text-center">
        <div className="form-group">
          <input type="text" name="username" placeholder="Username"
            onChange={this.handleInputChange} className="form-control" />
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password"
            onChange={this.handleInputChange} className="form-control" />
        </div>
        <input type="submit" value="Login" onClick={this.login}
          className="btn btn-success col-12 font-weight-bold my-2 py-2" />
        <div className="text-center my-3">
          <a href="/signup">Signup</a>
        </div>
      </div>
    );
  }

  login() {
    if (this.state.username && this.state.password) {
      postData('login', this.state).then((result) => {
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