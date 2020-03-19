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
      <div className="content">
        <div className="form">
          <div className="form-group">
            <input type="text" name="email" placeholder="Email" className="form-control" onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <input type="text" name="username" placeholder="Username" className="form-control" onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" className="form-control" onChange={this.handleInputChange} />
          </div>
          <input type="submit" className="btn" value="Sign Up" onClick={this.signup} />
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