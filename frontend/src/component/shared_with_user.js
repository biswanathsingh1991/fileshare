import React, { Component } from 'react';

class ShareWithUser extends Component {

  render(){
    return(
      <div className="file-container">
        <ol>
        {
          this.props.shareWithUser.length > 0 ?
            this.props.shareWithUser.map((u, index) =>{
              return(
                <li key={index}>
                  <span>{u.file.split("/").pop()}</span>
                  <br/>
                  <span>{u.owner.email}</span>
                  <hr/>
                </li>
              )
            })
          :
            null
        }
        </ol>
      </div>
    )
  }
}

export default ShareWithUser;