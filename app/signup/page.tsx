import SignupForm from "@/components/auth/signupForm";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-4">
        <SignupForm />
      </div>
    </div>
  );
}
