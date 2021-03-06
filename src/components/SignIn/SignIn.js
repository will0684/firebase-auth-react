import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const SignInPage = () => (
    <div>
      SignIn
      <SignInForm/>
    </div>
);

// Used to reset state after user signs in
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  };

  onSubmit = event => {
    event.preventDefault();
    
    const { email, password } = this.state;
    this.props.firebase.doSignInWithEmailAndPassword(email, password)
    .then((msg) => {
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);
    })
    .catch((error)=>{
      this.setState({error});
    })
  };

  // Update state with current text field values
  onChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = email === '' || password === '';

    return(
      <form onSubmit={this.onSubmit}>
        <input
          name = "email"
          type = "text"
          value = {email}
          onChange = {this.onChange}
          placeholder = "Email Address"
        />
        <input
          name = "password"
          type = "password"
          value = {password}
          onChange = {this.onChange}
          placeholder = "Password"
        />
        <button
          type = "submit"
          disabled = {isInvalid}>
        Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

// SignInForm with firebase and react-router context
const SignInForm = withFirebase(withRouter(SignInFormBase));

export default SignInPage;

//export { SignInForm };
