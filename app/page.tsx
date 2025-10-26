import AuthButtons from "@/components/auth/authButtons";

export default function HomePage() {
  return (
    <div className="home-container flex flex-col items-center justify-center min-h-screen ">
      <div className="text-2xl md:text-4xl lg:text-6xl font-bold text-center p-4">
        Bigs Payments
      </div>
      <div className="flex justify-center gap-4">
        <AuthButtons variant="home" />
      </div>
    </div>
  );
}
