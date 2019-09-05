import React, { Component } from 'react';
import axios from "axios";


class LoginForm extends Component {

  state={
    email: "",
    emailError:[],
    password: "",
    passwordError: [],
    non_field_errors: []
  }

  onChageHandle = (e) =>{
    this.setState({
      ...this.state,
      [e.target.name] : e.target.value,
    });
  }

  doLogin = (e) =>{
    e.preventDefault();
    axios({
      method: 'POST',
      url: "http://127.0.0.1:8000/rest-auth/login/",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data:{
        username:this.state.email,
        email: this.state.email,
        password: this.state.password,
      }
    }).then(res=>{
      console.log(res)
      if(res.status===200){
        localStorage.setItem("login-key", res.data.key);
        window.location = "http://localhost:3000/";
      }
    }).catch(err=>{
      console.log(err.response)
      if(err.response.status===400){
        this.setState({
          non_field_errors : err.response.data.non_field_errors ? err.response.data.non_field_errors : [],
        })
      }
    })
  }

  render(){
    return(
      <form className="form" onSubmit={this.doLogin}>
        <h1>Login</h1>
        {
          this.state.non_field_errors.length > 0 ? 
            <div className="error">
              {this.state.non_field_errors[0]}
            </div> 
          : null
        }
        <div>
          <label htmlFor="email-login-input">email</label>
          <input type="email" id="email-login-input" name="email" value={this.state.email}
            onChange={this.onChageHandle}/>
        </div>
        <div>
          <label htmlFor="password-login-input">password</label>
          <input type="password" id="password-login-input" name="password" value={this.state.password}
            onChange={this.onChageHandle}/>
        </div>
        <button type="submit">submit</button>
      </form>
    )
  }
}

export default LoginForm;

