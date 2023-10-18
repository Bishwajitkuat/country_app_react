// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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

// adding name of the country to the users/uid/favourites table
export const addFavouriteToFirebase = async (uid, name) => {
  try {
    await addDoc(collection(db, `users/${uid}/favourites`), { name });
    console.log("Favourite added to Firebase database");
  } catch (err) {
    console.error("Error adding favourite to Firebase database: ", err);
  }
};

// removing favourites from firebase database
export const removeFavouriteFromFirebase = async (uid, name) => {
  try {
    if (!name) {
      console.error(
        "Error removing favourite from Firebase database: name parameter is undefined"
      );
      return;
    }
    // creating a quary to users/uid/favourites table in firestor where parameter name === database name
    const q = query(
      collection(db, `users/${uid}/favourites`),
      where("name", "==", name)
    );
    // exicuting the quary and returning matching objects in an array
    const querySnapshot = await getDocs(q);
    // going throw each object and deleting each object from db with deleteDoc() method from firestor by passing ref of each object
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Favourite removed from Firebase database");
    });
  } catch (err) {
    console.error("Error removing favourite from Firebase database: ", err);
  }
};

// removing all objects from favourites table in firestore
export const clearFavouritesFromFirebase = async (uid) => {
  try {
    // creating a quary to get all objects from favourites table of a particular user
    const q = query(collection(db, `users/${uid}/favourites`));
    // getting all objects as an array
    const querySnapshot = await getDocs(q);
    // deleting each object by passing ref of each object into deleteDoc() method from firestore
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Favourites removed from Firebase database");
    });
  } catch (err) {
    console.error("Error removing favourites from Firebase database: ", err);
  }
};

export { auth, db, loginWithEmailAndPassword, registerWithAndPassword, logout };
