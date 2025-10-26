import AuthButtons from "@/components/auth/authButtons";

export default function HomePage() {
  return (
    <div className="home-container flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold text-center p-4">Bigs Payments</div>
      <div className="flex justify-center gap-4">
        <AuthButtons variant="home" />
      </div>
    </div>
  );
}
