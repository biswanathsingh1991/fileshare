import React, { Component } from 'react';
import './App.css';
import LoginSingup from "./component/login_singup";
import File from "./component/file"


class App extends Component {


  render() {
    return (
      <div className="App">
        {
          localStorage.getItem("login-key")?
           <File /> : <LoginSingup />
        }
      </div>
    )
  }
}

export default App;
