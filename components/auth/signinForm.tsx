"use client";

import { FormField } from "../form/formField";
import { FormButton } from "../form/formButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignin } from "@/src/hooks/useAuth";
import Link from "next/link";

export const SigninSchema = z.object({
  username: z.string().email("유효한 이메일을 입력해주세요."),
  password: z.string().min(8, "비밀번호는 최소 8자리 이상이어야 합니다."),
});

export default function SigninForm() {
  const { mutate } = useSignin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
  });
  const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
    mutate(data);
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-black font-bold mb-4 text-center">로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="이메일"
          type="text"
          placeholder="abc@example.com"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
        <FormField
          label="비밀번호"
          type="password"
          placeholder="********"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <FormButton
          type="submit"
          variant="primary"
          size="medium"
          className="w-full"
        >
          로그인
        </FormButton>
      </form>

      <div className="text-center text-sm text-gray-500 mt-4">
        아직 회원이 아니신가요?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
}
