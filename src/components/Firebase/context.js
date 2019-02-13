import React from "react";

// Create Firebase Context
const FirebaseContext = React.createContext(null);

export default FirebaseContext


// HOC renders a component within a firebase consumer
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase}/>}
    </FirebaseContext.Consumer>
)

