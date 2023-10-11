// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALwiYAts7o-NslmMcTACw82GHcM7zQB_U",
  authDomain: "evernote-e546c.firebaseapp.com",
  projectId: "evernote-e546c",
  storageBucket: "evernote-e546c.appspot.com",
  messagingSenderId: "590475233571",
  appId: "1:590475233571:web:931cb97ce6411381f92496",
  measurementId: "G-JWTSEM4MZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
