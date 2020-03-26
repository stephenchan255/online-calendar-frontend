import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { auth, handleInputChange } from './Signup';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null); // control whether redirect to the homepage

  if (redirect) {
    return (<Redirect to={redirect} />)
  }

  return (
    <div className="content">
      <div className="form">
        <input type="text" name="username" placeholder="Username" className="form-control"
          onChange={e => handleInputChange(setUsername, e)} />
        <input type="password" name="password" placeholder="Password" className="form-control"
          onChange={e => handleInputChange(setPassword, e)} />
        <input type="submit" value="Login" onClick={() => auth('emptyEmail', username, password, setRedirect, 'login')} className="btn" />
        <div className="btn2" onClick={() => setRedirect('/signup')}>Signup</div >
      </div>
    </div >
  );
}