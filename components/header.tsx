import Link from "next/link";
import AuthButtons from "./auth/authButtons";

export default function Header() {
  return (
    <header className="px-4 py-2 border-b">
      <div className="flex justify-between items-center">
        <Link href="/">
          <h1>Bigs Payments</h1>
        </Link>
        <div className="flex items-center gap-4">
          <AuthButtons variant="header" />
        </div>
      </div>
    </header>
  );
}
