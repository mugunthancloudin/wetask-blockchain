import React , {useEffect} from "react";
import { getAuth, signInWithPopup, TwitterAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function TwitterAuth({ twitterConnected, setTwitterConnected }) {

  
    const firebaseConfig = {
        apiKey: "AIzaSyAJDl6dWb5YcMjImrfeiLvvwf4nYxSc4Ns",
        authDomain: "wetask-17e40.firebaseapp.com",
        projectId: "wetask-17e40",
        storageBucket: "wetask-17e40.appspot.com",
        messagingSenderId: "228070378497",
        appId: "1:228070378497:web:2341b5d5b0a6c7be888400",
        measurementId: "G-B6XYBR5MZS"
      };
    
      const app = initializeApp(firebaseConfig);
      
      useEffect(() => {
        const auth = getAuth();
        // Check if a user is already signed in (Twitter connection status)
        if (auth.currentUser) {
          setTwitterConnected(true);
        }
      }, []);


  const handleTwitterAuth = () => {
    const auth = getAuth();
    const provider = new TwitterAuthProvider();
    if (!twitterConnected) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setTwitterConnected(true);
        })
        .catch((error) => {
          console.error("Twitter Auth Error:", error);
        });
    } else {
      signOut(auth)
        .then(() => {
          setTwitterConnected(false);
        })
        .catch((error) => {
          console.error("Twitter Sign Out Error:", error);
        });
    }
  };

  return (
    <button className="task-button" onClick={handleTwitterAuth}>
      {twitterConnected ? "Disconnect Twitter" : "Connect Twitter"}
    </button>
  );
}
