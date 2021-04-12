import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCSEVVI-qjsE1UhWGgJHilICZlQGWupfYY",
    authDomain: "bookshelf-e9604.firebaseapp.com",
    projectId: "bookshelf-e9604",
    storageBucket: "bookshelf-e9604.appspot.com",
    messagingSenderId: "673630785806",
    appId: "1:673630785806:web:464ce225842f54b16f475f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
