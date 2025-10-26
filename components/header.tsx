import Link from "next/link";
import AuthButtons from "./auth/authButtons";

export default function Header() {
  return (
    <header className="px-4 py-2 border-b-2 border-gray-200 layout-container flex justify-between items-center">
      <Link href="/">
        <h1>Bigs Payments</h1>
      </Link>
      <AuthButtons variant="header" />
    </header>
  );
}
