import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

// SignUp page component with FirebaseContext component to pass down firebase instance directly
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

// Component state variable used to reset state after succesful submit
const INITIAL_STATE = {
username: '',
  email: '',
  password: '',
  'confirm password': '',
  error: null
};

// The SignUpForm component is the only class-component because it must be able to track form state in local state
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    event.preventDefault();
    let c = this.state;
      
    this.props.firebase
      .doCreateUserWithEmailAndPassword(c.email, c.password)
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
    c.password == c['confirm password'] &&
    c.password &&
    c.email &&
    c.username);

    return (
      <form onSubmit={this.onSubmit}>
        {
        Object.keys(INITIAL_STATE).map((InputPrompt, i)=>( (InputPrompt != "error") && (
        <input key={i}
          name={InputPrompt}
          value={c[InputPrompt]}
          onChange={this.onChange}
          type={InputPrompt.includes("password")? ("password"): ("text")}
          placeholder={InputPrompt} 
        />  )
    ))
        }
        <button disabled={!isInvalid} type="submit">Sign Up</button>

        {c.error && <p>{c.error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm };