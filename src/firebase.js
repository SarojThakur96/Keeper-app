import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCYDpRZKLWwU1qwn7er6QD8hCV7aHntDxs",
  authDomain: "keeper-app-afe20.firebaseapp.com",
  projectId: "keeper-app-afe20",
  storageBucket: "keeper-app-afe20.appspot.com",
  messagingSenderId: "1049823036257",
  appId: "1:1049823036257:web:7d919813abfa1b0e56bb20",
  measurementId: "G-E4P6XXCQRR"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth, provider};
  export default db;