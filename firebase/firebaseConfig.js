// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv6Q7N8WjvhH5JhOv5swPMIz_8s0aEYFY",
  authDomain: "smart-office-7791d.firebaseapp.com",
  projectId: "smart-office-7791d",
  storageBucket: "smart-office-7791d.appspot.com",
  messagingSenderId: "1010418725496",
  appId: "1:1010418725496:web:a26da3b300b14ef7b6f38d",
  measurementId: "G-QPCLTW1GNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

auth.onAuthStateChanged(() => {
  auth.currentUser = auth.currentUser;
});
