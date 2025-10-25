import { APIClient } from "./client";

interface SignupPayload {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

export const signup = async (payload: SignupPayload) => {
  const response = await APIClient.post("/auth/signup", payload);
  return response.data;
};

export const signin = async (payload: LoginPayload) => {
  const response = await APIClient.post("/auth/signin", payload);
  const accessToken = response.data.accessToken;
  localStorage.setItem("accessToken", accessToken);
  return response.data.user;
};

export const logout = async () => {
  localStorage.removeItem("accessToken");
};
