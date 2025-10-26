import { useMutation } from "@tanstack/react-query";
import { signup, signin } from "../api/auth";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("회원가입 성공", data);
      router.push("/login");
    },
    onError: (error) => {
      console.log("회원가입 실패", error);
    },
  });
};

export const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signin,
    onSuccess: (user) => {
      console.log("로그인 성공", user);
      window.dispatchEvent(new Event("loginStateChange"));
      router.push("/boards");
    },
    onError: (error) => {
      console.log("로그인 실패", error);
    },
  });
};
