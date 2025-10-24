import { APIClient } from "./client";

interface SignupPayload {
  username: string;
  password: string;
  name: string;
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
  localStorage.setItem("token", response.data.accessToken);
  return response.data.user;
};

export const logout = async () => {
  localStorage.removeItem("token");
};
