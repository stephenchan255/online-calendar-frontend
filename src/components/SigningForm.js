import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { postData } from '../services/postData';

export default function SigningForm(props) {
  let isSignup = props.isSignup;

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null); // ctrl whether redirect to the homepage

  if (redirect) {
    return (<Redirect to={redirect} />)
  }

  return (
    <div className="content">
      <form onSubmit={handleAuth}>
        {/* email input */}
        {isSignup &&
          <input type="text" name="email" placeholder="Email" className="form-control"
            onChange={e => handleInputChange(setEmail, e)} />
        }

        {/* username input */}
        <div className="input-box">
          <input type="text" name="username" placeholder="Username" className="form-control"
            onChange={e => handleInputChange(setUsername, e)}
          />
          {isSignup &&
            <small>At least 4 characters, e.g. letters, digits or underscore.</small>
          }
        </div>

        {/* password input */}
        <div className="input-box">
          <input type="password" name="password" placeholder="Password" className="form-control"
            onChange={e => handleInputChange(setPassword, e)}
          />
          {isSignup &&
            <small>At least 8 characters, including a uppercase letter, a lowercase letter, a digit and a special character.</small>
          }
        </div>

        {/* submit btn */}
        <input type="submit" className="btn" value={isSignup ? "Sign Up" : "Login"} />
      </form>

      {/* redirect link */}
      <div className="redirect-btn" onClick={handleRedirect}>{isSignup ? "Login" : "Sign up"}</div >
    </div>
  );

  function handleInputChange(setState, e) {
    setState(e.target.value);
  }

  function handleAuth(e) {
    isSignup ? auth(email, username, password, setRedirect, 'signup') :
      auth('emptyEmail', username, password, setRedirect, 'login');
    e.preventDefault();
  }

  function auth(email, username, password, setRedirect, type) {
    if (!(email && username && password)) {
      alert('All fileds are required!')
    }

    postData(type, { email, username, password })
      .then(result => {
        if (result.userData) {
          sessionStorage.setItem('userData', JSON.stringify(result));
          setRedirect('/home');
        } else {
          alert(result.error);
        }
      })
      .catch(alert);
  }

  function handleRedirect() {
    isSignup ? setRedirect('/') : setRedirect('/signup');
  }
}