import { useMutation } from "@tanstack/react-query";
import { signup, signin } from "../api/auth";
import { useRouter } from "next/navigation";
import { toast } from "js-toastify";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast("회원가입 성공", data);
      router.push("/login");
    },
    onError: () => {
      toast("회원가입 실패", { type: "error" });
    },
  });
};

export const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signin,
    onSuccess: (user) => {
      toast("로그인 성공", user?.name);
      window.dispatchEvent(new Event("loginStateChange"));
      router.push("/boards");
    },
    onError: () => {
      toast("로그인 실패", { type: "error" });
    },
  });
};
