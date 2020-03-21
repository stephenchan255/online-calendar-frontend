import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { postData } from '../services/postData';

export default function Singup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false); // control whether redirect to the homepage

  if (redirect) {
    return (<Redirect to={'/home'} />)
  }

  return (
    <div className="content">
      <div className="form">
        <input type="text" name="email" placeholder="Email" className="form-control"
          onChange={(e) => handleInputChange(setEmail, e)} />
        <input type="text" name="username" placeholder="Username" className="form-control"
          onChange={(e) => handleInputChange(setUsername, e)} />
        <input type="password" name="password" placeholder="Password" className="form-control"
          onChange={(e) => handleInputChange(setPassword, e)} />
        <input type="submit" className="btn" value="Sign Up"
          onClick={() => auth(email, username, password, setRedirect, 'signup')} />
        <a href="/">Login</a>
      </div>
    </div>
  );
}

export function auth(email, username, password, setRedirect, type) {
  if (email && username && password) {
    postData(type, { email, username, password }).then((result) => {
      let responseJson = result;
      if (responseJson.userData) {
        sessionStorage.setItem('userData', JSON.stringify(responseJson));
        setRedirect(true);
      } else {
        alert(result.error);
      }
    });
  }
}

export function handleInputChange(setState, e) {
  setState(e.target.value);
}