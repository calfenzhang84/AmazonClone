import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDQ1gS_hJr7Qox7f-QBmNiN1DYLozxpwLc",
    authDomain: "challenge-ccbb3.firebaseapp.com",
    projectId: "challenge-ccbb3",
    storageBucket: "challenge-ccbb3.appspot.com",
    messagingSenderId: "418943353203",
    appId: "1:418943353203:web:82a5ad6f3b7dd76b584506",
    measurementId: "G-YY6V1NGY3R"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};
