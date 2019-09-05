import React, { Component } from 'react';
import FileShare from "./fileshare_from";

class UserFile extends Component {

  render(){
    return(
      <div className="file-container">
        <h2>userfile list</h2>
        {
          this.props.userfile.length > 0 ?
            this.props.userfile.map((u, index)=>{
              return (
                <div key={index} className="user-files">
                  <button><a href={u.file} target="blank">{u.file.split("/").pop()}</a></button>
                  <div>
                    <h3>
                      share with
                    </h3>
                    <ol>
                    {
                      u.share_with.length > 0 ?
                        u.share_with.map((u, liindex) =>{
                          return <li className="share-user" key={liindex}>{u.email}</li>
                        })
                      :
                      null
                    }
                    </ol>
                  </div>
                  <FileShare fileId={u.id} />
                </div>
              )
            })
          :
            null
        }
      </div>
    )
  }
}

export default UserFile;

