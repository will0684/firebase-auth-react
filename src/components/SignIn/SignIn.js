import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

// SignUp page component with FirebaseContext component to pass down firebase instance directly
const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />  
    <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
  </div>
);

// Component state variable used to reset state after succesful submit
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

// The SignUpForm component is the only class-component because it must be able to track form state in local state
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    event.preventDefault();
    let c = this.state;
      
    this.props.firebase
      .doSignInWithEmailAndPassword(c.email, c.password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
      let c = this.state;
  };

  render() {
      let c = this.state;

    const isInvalid = (
    c.password &&
    c.email);

    return (
      <form onSubmit={this.onSubmit}>
        {
        Object.keys(INITIAL_STATE).map((InputPrompt, i)=>( (InputPrompt != "error") && (
        <input key={i}
          name={InputPrompt}
          value={c[InputPrompt]}
          onChange={this.onChange}
          type="text"
          placeholder={InputPrompt} 
        />  )
    ))
        }
        <button disabled={!isInvalid} type="submit">Sign In</button>

        {c.error && <p>{c.error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };