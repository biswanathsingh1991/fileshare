import React, { Component } from 'react';
import axios from "axios";

class FileShare extends Component {
  
  state = {
    email:"",
    shareError:[]
  }

  fileShare = (e) =>{
    e.preventDefault();
    axios({
      method: 'POST',
      url: "http://127.0.0.1:8000/file/share/",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Authorization" : "Token " + localStorage.getItem("login-key")
      },
      data:{
        file_id:this.props.fileId,
        email:this.state.email
      }
    }).then(res=>{
      console.log(res)

      if(res.status === 200){
        console.log(res)
        this.setState({
          ...this.state,
          email:""
        })
      }
    }).catch(err=>{
      if(err.response.status===404){
        this.setState({
          ...this.state,
          shareError:[...this.state.shareError, "email not registerd"]
        })
      }
      console.log(err)
    })
  }

  updateEmail = (e) =>{
    this.setState({
      ...this.state,
      email: e.target.value
    })
  }

  clearError = (e) =>{
    this.setState({
      ...this.state,
      shareError:[]
    })
  }

  render(){
    return(
      <form onSubmit={this.fileShare}>
        <label htmlFor="share-email-input">email id here</label>
        <input type="email" value={this.state.email} onChange={this.updateEmail} onFocus={this.clearError}/>
        <div className="error">{this.state.shareError[0]}</div>
        <button >submit</button>
      </form>
    )
  }
}

export default FileShare;