import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./../firebase/firebase.config.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
let token = null;
export const getToken = () => token;
const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState();
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const profileUpdate = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setLoginUser(user);
      setLoading(false);
      if (user) {
        user.getIdToken().then((idtoken) => {
          token = idtoken;
        });
      } else {
        token = null;
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const AuthData = {
    createUser,
    signInUser,
    loginUser,
    signOutUser,
    profileUpdate,
    loading,
    setLoading,
    setLoginUser,
    signInWithGoogle,
  };

  return (
    <div>
      <AuthContext value={AuthData}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
