"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUserApi,
  googleLoginApi,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
} from "@/lib/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const registerUser = async (userData) => {
    const data = await registerUserApi(userData);

    if (data?.success && data?.user) {
      setUser(data.user);
    }

    return data;
  };

  const loginUser = async (loginData) => {
    const data = await loginUserApi(loginData);

    if (data?.success && data?.user) {
      setUser(data.user);
    }

    return data;
  };

  const googleLogin = async (credential) => {
    const data = await googleLoginApi(credential);

    if (data?.success && data?.user) {
      setUser(data.user);
    }

    return data;
  };

  const logoutUser = async () => {
    const data = await logoutUserApi();

    if (data?.success) {
      setUser(null);
    }

    return data;
  };

  const checkLoggedInUser = async () => {
    try {
      const data = await getCurrentUserApi();

      if (data?.success && data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const authInfo = {
    user,
    authLoading,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);