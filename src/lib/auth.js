import { authClient } from "@/lib/auth-client";

export const registerUserApi = async (userData) => {
  return await authClient("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUserApi = async (loginData) => {
  return await authClient("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });
};

export const googleLoginApi = async (credential) => {
  return await authClient("/auth/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
};

export const getCurrentUserApi = async () => {
  return await authClient("/me", {
    method: "GET",
  });
};

export const logoutUserApi = async () => {
  return await authClient("/logout", {
    method: "POST",
  });
};