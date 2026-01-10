import FooterLegal from "./FooterLegal";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <FooterLegal />

      <footer className="bg-black py-4">
        <nav className="flex justify-center items-center gap-3 text-xs text-gray-300">
          <Link href="/terms" className="hover:underline">
            Terms & Conditions
          </Link>
          <span>|</span>
          <Link href="/complaints" className="hover:underline">
            Complaints Procedure
          </Link>
          <span>|</span>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </>
  );
}
