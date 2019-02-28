import firebase from "firebase";

var devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER
};

var prodConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER
};

// The Node environment is checked for production or development mode and the correct Firebase config is selected
const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

// Firebase class can be instantiated once and then passed to multiple components
class Firebase {
  constructor() {
    // Initialize firebase app with configuration
    firebase.initializeApp(config);
    // Get the auth instance
    this.auth = firebase.auth();
    // Get firestore instance
    this.db = firebase.firestore();
  }

  // Auth User "API"/Interface
  doCreateUserWithEmailAndPassword = (email, password) => {
    console.log(email)
    console.log(password)
    return this.auth.createUserWithEmailAndPassword(email, password)
  };

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // Merge auth and database user objects 
  // Params: callback functions to run if user is signed in || not signed in
  onAuthUserListener = (next, fallback) => 
    this.auth.onAuthStateChanged(authUser => {
      if (authUser){
        this.user(authUser.uid).get()
        .then((doc) => {
            const dbUser = doc.data();

            // Default roles
            if (!dbUser.roles) {
                dbUser.roles = [];
            }
            
            // Merge auth user with firestore user
            authUser = {
                uid: authUser.uid,
                email: authUser.email,
                ...dbUser
            };
            console.log("onAuthUserListener:", authUser);
            next(authUser);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    else{
      fallback();
    }
    });
  

  // User API

  user = uid => this.db.collection('users').doc(uid);
  users = () => this.db.collection('users');

}

export default Firebase;
