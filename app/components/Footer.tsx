import FooterLegal from "./FooterLegal";

export default function Footer() {
  return (
    <>
      <FooterLegal />

      <footer className="bg-black py-4">
        <nav className="flex justify-center items-center gap-3 text-xs text-gray-300">
          <span className="underline cursor-pointer hover:text-white">
            Terms & Conditions
          </span>
          <span>|</span>
          <span className="underline cursor-pointer hover:text-white">
            Complaints Procedure
          </span>
          <span>|</span>
          <span className="underline cursor-pointer hover:text-white">
            Privacy Policy
          </span>
        </nav>
      </footer>
    </>
  );
}
