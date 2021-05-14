import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC897DjvwWrXblABe7BwB9hZzPEWP62zxE",
  authDomain: "timeline-vue.firebaseapp.com",
  projectId: "timeline-vue",
  storageBucket: "timeline-vue.appspot.com",
  messagingSenderId: "537844020921",
  appId: "1:537844020921:web:ad7f7002fcccf68d9e8d68",
  measurementId: "G-PJ2CNHDJTS",
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// collection references
const usersCollection = db.collection("users");

// export utils/refs
export {
  auth,
  usersCollection,
  googleProvider
};
