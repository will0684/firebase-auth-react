import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import SignInPage from './components/SignIn/SignIn';
import SignUp from "./components/SignUp/SignUp";
import PasswordForget from "./components/PasswordForget/PasswordForget";
import Account from "./components/Account/Account"
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";

import * as ROUTES from './constants/routes';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        if (authUser) {
          this.setState({ authUser });
        }else {
          this.setState({ authUser: null});
        }
      }
    )
  }

  componentWillUnmount() {
    this.listener();
  }

  render(){

    return(
      <Router>
        <div>
          <Navigation  authUser={this.state.authUser}/>
          <Route exact path={'/'} component={SignInPage}/>
          <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
          <Route path={ROUTES.SIGN_UP} component={SignUp}/>
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget}/>
          <Route path={ROUTES.ACCOUNT} component={Account}/>
          <Route path={ROUTES.ADMIN} component={Admin}/>
          <Route path={ROUTES.HOME} component={Home}/>
        </div>
      </Router>
    );
  }
}

export default App;
