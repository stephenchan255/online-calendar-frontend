import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { postData } from '../services/postData';

export default function Singup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null); // control whether redirect to the homepage

  if (redirect) {
    return (<Redirect to={redirect} />)
  }

  return (
    <div className="content">
      <div className="form">
        <input type="text" name="email" placeholder="Email" className="form-control"
          onChange={(e) => handleInputChange(setEmail, e)} />
        <div className="input-box">
          <input type="text" name="username" placeholder="Username" className="form-control"
            onChange={(e) => handleInputChange(setUsername, e)} />
          <span>Username must contains at least 4 characters, which can be letters, digits and underscore.</span>
        </div>
        <div className="input-box">
          <input type="password" name="password" placeholder="Password" className="form-control"
            onChange={(e) => handleInputChange(setPassword, e)} />
          <span>Password must contains at least 8 characters, including a uppercase letter, a lowercase letter,
            a digit and a special character.</span>
        </div>

        <input type="submit" className="btn" value="Sign Up"
          onClick={() => auth(email, username, password, setRedirect, 'signup')} />
        <div className="btn2" onClick={() => setRedirect('/')}>Login</div >
      </div>
    </div>
  );
}

export function auth(email, username, password, setRedirect, type) {
  if (!(email && username && password)) {
    alert('All fileds are required!')
  }

  postData(type, { email, username, password }).then((result) => {
    let responseJson = result;
    if (responseJson.userData) {
      sessionStorage.setItem('userData', JSON.stringify(responseJson));
      setRedirect('/home');
    } else {
      alert(result.error);
    }
  });
}

export function handleInputChange(setState, e) {
  setState(e.target.value);
}