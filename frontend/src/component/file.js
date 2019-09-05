import React, { Component } from 'react';
import  FileUploadForm from "./fileupload_form";
import UserFile from "./user_file";
import ShareWithUser from "./shared_with_user";
import axios from "axios";
import { restElement } from '@babel/types';

class File extends Component {
  state={
    fileUpload:{},
    userfile:[],
    shareWithUser:[]
  }

  updateFileUpload = (fileName, file) =>{
    this.setState({
      ...this.state,
      fileUpload:{
        ...this.state.fileUpload, 
        [fileName]: file
      }
    })
  }

  getUserfile = () =>{
    axios({
      method: 'get',
      url: "http://127.0.0.1:8000/file/list/",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Authorization" : "Token " + localStorage.getItem("login-key")
      },
    }).then(res=>{
      if (res.status===200){
        this.setState({
          ...this.state,
          userfile:res.data
        })
      }
    }).catch(err=>{
      console.error(err.response)
    })
  }

  getUsershareAccessfile = () =>{
    axios({
      method: 'get',
      url: "http://127.0.0.1:8000/file/share/access/",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Authorization" : "Token " + localStorage.getItem("login-key")
      },
    }).then(res=>{
      console.log(res)
      if (res.status===200){
        this.setState({
          ...this.state,
          shareWithUser:res.data
        })
      }
    }).catch(err=>{
      console.error(err.response)
    })
  }

  componentDidMount (){
    this.getUserfile();
    this.getUsershareAccessfile()
  }

  render(){
    return(
      <div className="file-container">
         <FileUploadForm  updateFileUpload={this.updateFileUpload} 
          fileUpload={this.state.fileUpload}/>
        <div className="user-files-container">
          <UserFile userfile={this.state.userfile}/>
          <ShareWithUser shareWithUser={this.state.shareWithUser}/>
        </div>
      </div>
    )
  }
}

export default File;

