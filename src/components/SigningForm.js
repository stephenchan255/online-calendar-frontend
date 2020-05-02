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
      <div className="form">

        {/* email input */}
        {isSignup &&
          <input type="text" name="email" placeholder="Email" className="form-control"
            onChange={e => handleInputChange(setEmail, e)}
            onKeyDown={handleKeyDown}
          />
        }

        {/* username input */}
        <div className="input-box">
          <input type="text" name="username" placeholder="Username" className="form-control"
            onChange={e => handleInputChange(setUsername, e)}
            onKeyDown={handleKeyDown}
          />
          {isSignup &&
            <small>Username must contains at least 4 characters, which can be letters, digits and underscore.</small>
          }
        </div>

        {/* password input */}
        <div className="input-box">
          <input type="password" name="password" placeholder="Password" className="form-control"
            onChange={e => handleInputChange(setPassword, e)}
            onKeyDown={handleKeyDown}
          />
          {isSignup &&
            <small>Password must contains at least 8 characters, including a uppercase letter, a lowercase letter, a digit and a special character.</small>
          }
        </div>

        {/* submit btn */}
        <input type="submit" className="btn" value={isSignup ? "Sign Up" : "Login"}
          onClick={handleAuth}
        />

        {/* redirect btn */}
        <div className="btn2" onClick={handleRedirect}>{isSignup ? "Login" : "Sign up"}</div >
      </div>
    </div>
  );

  function handleInputChange(setState, e) {
    setState(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      let form = document.querySelector(".form");
      switch (e.target.name) {
        case "email":
          form.querySelector("[name = 'username']").focus();
          break;
        case "username":
          form.querySelector("[name = 'password']").focus();
          break;
        case "password":
          handleAuth();
          break;
        default:
          form.querySelector("[name = 'email']").focus();
      }
    }
  }

  function handleAuth() {
    isSignup ? auth(email, username, password, setRedirect, 'signup') :
      auth('emptyEmail', username, password, setRedirect, 'login');
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