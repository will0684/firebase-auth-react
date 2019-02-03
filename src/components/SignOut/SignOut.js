import React, { Component } from 'react'
import { FirebaseContext } from '../Firebase';


class SignOutButton extends Component {
  constructor(props){
    super(props);
  }

  onClick = () => {
    this.props.firebase.doSignOut()
    .then(()=>{
      console.log('Signed Out');
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  render(){
    return(
      <button type="button" onClick={this.onClick}>
      Sign Out
      </button>
    );
  }
}

export default SignOutButton
