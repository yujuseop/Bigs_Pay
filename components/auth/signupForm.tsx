"use client";

import { FormField } from "../form/formField";
import { FormButton } from "../form/formButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "@/src/hooks/useAuth";

export const SignupSchema = z.object({
  username: z.string().email("유효한 이메일을 입력해주세요."),
  name: z.string().min(1, "이름을 입력해주세요."),
  password: z.string().min(8, "비밀번호는 최소 8자리 이상이어야 합니다."),
  confirmPassword: z.string(),
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
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-black text-center font-bold mb-4">
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
          <p className="text-red-500">{errors.username.message}</p>
        )}
        <FormField
          label="이름"
          type="text"
          placeholder="name"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <FormField
          label="비밀번호"
          type="password"
          placeholder="********"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <FormField
          label="비밀번호 확인"
          type="password"
          placeholder="********"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
        <FormButton type="submit" variant="primary" size="medium">
          회원가입
        </FormButton>
      </form>
    </div>
  );
}
