import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    isLoadingUser: false,
    errorUser: "",
  },
  reducers: {
    logInUser(state, action) {
      state.user = action.payload;
    },
    logOutUser(state) {
      state.user = null;
    },
    setErrorUser(state, action) {
      state.errorUser = action.payload;
    },
    isLoadingUser(state, action) {
      state.isLoadingUser = action.payload;
    },
  },
});

// authenticate and sets the user into state
export const logIn = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(setErrorUser(""));
      dispatch(isLoadingUser(true));
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      dispatch(logInUser(user.email));
    } catch (err) {
      dispatch(setErrorUser(err.message));
    } finally {
      dispatch(isLoadingUser(false));
    }
  };
};

// register new user and set user into state
export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(setErrorUser(""));
      dispatch(isLoadingUser(true));
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        authProvider: "local",
        email,
      });
      const currentUser = auth.currentUser;
      dispatch(logInUser(currentUser.email));
    } catch (err) {
      dispatch(setErrorUser(err.message));
    } finally {
      dispatch(isLoadingUser(false));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(setErrorUser(""));
      dispatch(isLoadingUser(true));
      await signOut(auth);
      dispatch(logOutUser());
    } catch (err) {
      dispatch(setErrorUser(err.message));
    } finally {
      dispatch(isLoadingUser(false));
    }
  };
};

export const { logInUser, logOutUser, setErrorUser, isLoadingUser } =
  usersSlice.actions;
export default usersSlice.reducer;
