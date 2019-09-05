import React, { Component } from 'react';
import _ from "lodash";
import axios from "axios";

class FileUploadForm extends Component {

  updateUploadFile = (e) =>{
    this.props.updateFileUpload(e.target.files[0].name, e.target.files[0])
  }

  uploadFile = (e) =>{
    e.preventDefault();
    if(!_.isEmpty(this.props.fileUpload)){
      let formData = new FormData();
      _.toPairs(this.props.fileUpload).forEach(u=>{
        formData.append(u[0], u[1], u[0]);
      })
      axios({
        method: 'POST',
        url: "http://127.0.0.1:8000/file/upload/",
        headers: {
          'Content-Type': 'multipart/form-data',
          "Accept": 'application/json',
          "Authorization" : "Token " + localStorage.getItem("login-key")
        },
        data:formData
      }).then(res=>{
        if(res.status===201){

        }
      }).catch(err=>{
        console.log(err.response)
      })
    }
  }

  render(){
    return(
      <form className="file-upload-form" onSubmit={this.uploadFile}>
        <div>
          <div>
            <label htmlFor="file-upload-input">select file</label>
            <input type="file" id="file-upload-input" onChange={this.updateUploadFile} value=""/>
          </div>
          <button type="submit">submit</button>
        </div>
        <div>
          <h2>Files will be upload</h2> 
        {
          !_.isEmpty(this.props.fileUpload) ?
          _.keys(this.props.fileUpload).map((u, index)=>{
            return <div key={index}>{u}</div>
          })
          :
          null
        }
        </div>
        
      </form>
    )
  }
}

export default FileUploadForm;

