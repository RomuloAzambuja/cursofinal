import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import  "@firebase/database";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzeew9JIua9ao1PiY482nSJX6FrG0bEnw",
  authDomain: "base1-bcd0a.firebaseapp.com",
  databaseURL: "https://base1-bcd0a-default-rtdb.firebaseio.com",
  projectId: "base1-bcd0a",
  storageBucket: "base1-bcd0a.appspot.com",
  messagingSenderId: "516721407484",
  appId: "1:516721407484:web:6e9f561f60642a670eae79",
  measurementId: "G-FEH81N2781"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);