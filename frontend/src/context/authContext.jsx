/*
NOTE: serUserInfo
*/

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.post(
        "/api/auth/verify",
        {},
        { withCredentials: true }
      );
      data.success
        ? (setIsLoggedIn(true),
          setUserInfo({ username: data.username, _id: data._id }))
        : (setIsLoggedIn(false), setUserInfo(null));
    } catch (err) {
      setIsLoggedIn(false);
      setUserInfo(null);
      console.error(err);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, checkAuth, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
