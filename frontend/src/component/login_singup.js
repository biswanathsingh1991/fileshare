import React, { Component } from 'react';
import SignupForm from "./signup_form";
import LoginForm from "./login_form";

class LoginSingup extends Component {

  render(){
    return(
      <div className="login-sign-container">
        <LoginForm />
        <SignupForm />
      </div>
    )
  }
}

export default LoginSingup;

