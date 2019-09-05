import React, { Component } from 'react';
import axios from "axios"

class SignupForm extends Component {

  state={
    email:"",
    emailError:[],
    password1:"",
    password1Error:[],
    password2:"",
    password2Error:[],
    non_field_errors:[],
  }


  onChageHandle = (e) =>{
    this.setState({
      ...this.state,
      [e.target.name] : e.target.value,
    });
  }

  register = (e) =>{
    e.preventDefault();
    axios({
      method: 'POST',
      url: "http://127.0.0.1:8000/rest-auth/registration/",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data:{
        username:this.state.email,
        email: this.state.email,
        password1: this.state.password1,
        password2:this.state.password2,
      }
    }).then(res=>{
      console.log(res)
      if(res.status===201){
        this.setState({
          email:"",
          emailError:[],
          password1:"",
          password1Error:[],
          password2:"",
          password2Error:[],
          non_field_errors:[],
        })
      }
    }).catch(err=>{
      console.error(err.response)
      if(err.response.status===400){
        this.setState({
          non_field_errors : err.response.data.non_field_errors ? err.response.data.non_field_errors : [],
          emailError: err.response.data.email? err.response.data.email : [],
        })
      }

    })
  }

  render(){
    return(
      <form onSubmit={this.register} className="form">
        <h1>Register</h1>
        {
          this.state.non_field_errors.length > 0 ? 
            <div className="error">
              {this.state.non_field_errors[0]}
            </div> 
          : null
        }
        <div>
          <label htmlFor="email-login-input">email</label>
          <input type="email" id="email-login-input" onChange={this.onChageHandle}
            name="email" email={this.state.email}/>
          {
            this.state.emailError.length > 0 ? 
              <div className="error">
                {this.state.emailError[0]}
              </div> 
            : null
          }
        </div>
        <div>
          <label htmlFor="password1-login-input">password</label>
          <input type="password" id="password1-login-input" onChange={this.onChageHandle}
            name="password1" value={this.state.password1}/>
        </div>
        <div>
          <label htmlFor="password2-login-input">confirm-password</label>
          <input type="password" id="password2-login-input" onChange={this.onChageHandle} 
            name="password2" value={this.state.password2}/>
        </div>
        <button type="submit">submit</button>
      </form>
    )
  }
}

export default SignupForm;
