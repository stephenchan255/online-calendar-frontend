import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { postData } from '../services/postData';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRedirected, setIsRedirected] = useState(false);

  if (isRedirected) {
    return (<Redirect to={'/home'} />)
  }

  return (
    <div className="content">
      <div className="form">
        <div className="form-group">
          <input type="text" name="username" placeholder="Username"
            onChange={(e) => handleInputChange(setUsername, e)} className="form-control" />
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password"
            onChange={(e) => handleInputChange(setPassword, e)} className="form-control" />
        </div>
        <input type="submit" value="Login" onClick={() => loginCheck(username, password, setIsRedirected)} className="btn" />
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

function loginCheck(username, password, setIsRedirected) {
  if (username && password) {
    postData('login', { username, password }).then((result) => {
      let responseJson = result;
      if (responseJson.userData) {
        sessionStorage.setItem('userData', JSON.stringify(responseJson));
        setIsRedirected(true);
      } else {
        alert(result.error);
      }
    });
  }
}

function handleInputChange(setState, e) {
  setState(e.target.value);
}