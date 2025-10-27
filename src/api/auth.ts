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

  const { accessToken, refreshToken } = response.data;

  if (accessToken) {
    const base64Url = accessToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);
    const userName = payload.name;
    const username = payload.username;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userName", userName || "");
    localStorage.setItem("username", username || "");

    return { name: userName, username };
  }

  return null;
};

export const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("username");
};
