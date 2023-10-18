// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9iAD7B7D6Lg0l4JS1FhPw1jGmOPlIbAo",
  authDomain: "countries-app-react-b97be.firebaseapp.com",
  projectId: "countries-app-react-b97be",
  storageBucket: "countries-app-react-b97be.appspot.com",
  messagingSenderId: "15765785621",
  appId: "1:15765785621:web:e35e861ec90badc118921c",
  measurementId: "G-ZVCZ2L4XCQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
};

const registerWithAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, loginWithEmailAndPassword, registerWithAndPassword, logout };
