import React, { Component } from 'react'
import { FirebaseContext } from '../Firebase';



const SignOutButton = () => {
  return (
    <FirebaseContext.Consumer>
      {
        (firebase) => (
          <SignOutButtonTest firebase={firebase} />
        )
      }
    </FirebaseContext.Consumer>
  )
}

class SignOutButtonTest extends Component {
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
