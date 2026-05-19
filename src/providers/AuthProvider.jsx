"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axiosPublic from "@/lib/axiosPublic";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const registerUser = async (userData) => {
    const res = await axiosPublic.post("/auth/register", userData);

    if (res.data?.success && res.data?.user) {
      setUser(res.data.user);
    }

    return res.data;
  };

  const loginUser = async (loginData) => {
    const res = await axiosPublic.post("/auth/login", loginData);

    if (res.data?.success && res.data?.user) {
      setUser(res.data.user);
    }

    return res.data;
  };

  const googleLogin = async (credential) => {
    const res = await axiosPublic.post("/auth/google", {
      credential,
    });

    if (res.data?.success && res.data?.user) {
      setUser(res.data.user);
    }

    return res.data;
  };

  const logoutUser = async () => {
    const res = await axiosPublic.post("/logout");

    if (res.data?.success) {
      setUser(null);
    }

    return res.data;
  };

  const checkLoggedInUser = async () => {
    try {
      const res = await axiosPublic.get("/me");

      if (res.data?.success && res.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
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
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};