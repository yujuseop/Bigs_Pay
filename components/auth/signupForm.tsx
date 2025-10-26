"use client";

import { FormField } from "../form/formField";
import { FormButton } from "../form/formButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "@/src/hooks/useAuth";
import Link from "next/link";

export const SignupSchema = z.object({
  username: z.string().email("유효한 이메일을 입력해주세요."),
  name: z.string().min(1, "이름을 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자리 이상이어야 합니다.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "비밀번호는 특수문자를 포함해야 합니다."),
  confirmPassword: z
    .string()
    .min(8, "비밀번호는 최소 8자리 이상이어야 합니다.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "비밀번호는 특수문자를 포함해야 합니다."),
});

export default function SignupForm() {
  const { mutate } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
    mutate(data);
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md text-sm md:text-base lg:text-lg">
      <h2 className="text-xl text-black text-center font-bold mb-4  md:text-2xl lg:text-3xl">
        회원가입
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="이메일"
          type="text"
          placeholder="abc@example.com"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-sm ">{errors.username.message}</p>
        )}
        <FormField
          label="이름"
          type="text"
          placeholder="name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm ">{errors.name.message}</p>
        )}
        <FormField
          label="비밀번호"
          type="password"
          placeholder="********"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm ">{errors.password.message}</p>
        )}
        <FormField
          label="비밀번호 확인"
          type="password"
          placeholder="********"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm ">
            {errors.confirmPassword.message}
          </p>
        )}
        <FormButton
          type="submit"
          variant="primary"
          size="medium"
          className="w-full"
        >
          회원가입
        </FormButton>
      </form>
      <div className="text-center text-sm text-gray-500 mt-4">
        이미 회원이신가요?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          로그인
        </Link>
      </div>
    </div>
  );
}
