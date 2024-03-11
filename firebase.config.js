// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJDl6dWb5YcMjImrfeiLvvwf4nYxSc4Ns",
  authDomain: "wetask-17e40.firebaseapp.com",
  projectId: "wetask-17e40",
  storageBucket: "wetask-17e40.appspot.com",
  messagingSenderId: "228070378497",
  appId: "1:228070378497:web:2341b5d5b0a6c7be888400",
  measurementId: "G-B6XYBR5MZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);