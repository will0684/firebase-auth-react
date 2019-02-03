import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut/SignOut";
import { FirebaseContext } from "../Firebase";

// Determine navigation items to show if user logged in or not
const Navigation = ({ authUser }) => (
<div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
)

const NavigationAuth = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li>
          <FirebaseContext.Consumer>
            {firebase => <SignOutButton firebase={firebase}/>}
          </FirebaseContext.Consumer>
        </li>
      </ul>
    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
