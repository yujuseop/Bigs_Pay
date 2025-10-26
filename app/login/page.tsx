import SigninForm from "@/components/auth/signinForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-md p-4">
        <SigninForm />
      </div>
    </div>
  );
}
