/* eslint-disable react/prop-types */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import ContextAPI from "../Context/ContextAPI";
import { auth } from "../Firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import useAxiosPublic from "../Hook/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();

  // state for users
  const [users, setUsers] = useState(null);
  // state for loading
  const [loading, setLoading] = useState(true);

  // register
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // profile update
  const profile = (updatedData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updatedData);
  };

  // google
  const google = (googleProvider) => {
    return signInWithPopup(auth, googleProvider);
  };

  // need to implement jwt here
  // observer
  useEffect(() => {
    const observer = onAuthStateChanged(auth, (usersData) => {
      setUsers(usersData);

      // set jwt token in local storage
      const email = usersData?.email;
      if (email) {
        axiosPublic.post("/jwt", { email }).then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
          }
          setLoading(false);
        });
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }
    });

    return () => {
      observer();
    };
  }, [axiosPublic]);

  // context value
  const contextValue = {
    users,
    setUsers,
    register,
    login,
    logout,
    profile,
    google,
    loading,
    setLoading,
  };
  return (
    <>
      <ContextAPI.Provider value={contextValue}>
        {children}

        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ContextAPI.Provider>
    </>
  );
};

export default AuthProvider;
