"use client";

import { FormButton } from "../form/formButton";
import Link from "next/link";
import { useState, useEffect } from "react";
import { logout } from "@/src/api/auth";
import { useRouter } from "next/navigation";

interface AuthButtonsProps {
  variant?: "header" | "home";
}

export default function AuthButtons({ variant = "header" }: AuthButtonsProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    username: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      const name = localStorage.getItem("userName");
      const username = localStorage.getItem("username");

      setIsLoggedIn(!!token);

      if (token && name && username) {
        setUserInfo({ name, username });
      }
    };

    checkLoginStatus();

    window.addEventListener("loginStateChange", checkLoginStatus);

    return () => {
      window.removeEventListener("loginStateChange", checkLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    router.push("/login");
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        {variant === "header" && userInfo && (
          <span className="text-sm text-white">
            {userInfo.name} ({userInfo.username})
          </span>
        )}
        {variant === "home" && (
          <Link href="/boards">
            <FormButton variant="primary" size="medium">
              게시판으로 이동
            </FormButton>
          </Link>
        )}
        <FormButton variant="secondary" size="medium" onClick={handleLogout}>
          로그아웃
        </FormButton>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/login">
        <FormButton variant="secondary" size="medium">
          로그인
        </FormButton>
      </Link>
      <Link href="/signup">
        <FormButton variant="secondary" size="medium">
          회원가입
        </FormButton>
      </Link>
    </div>
  );
}
