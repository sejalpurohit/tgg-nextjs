import FooterLegal from "./FooterLegal";

export default function Footer() {
  return (
    <>
      <FooterLegal />

      <footer className="bg-black py-4">
        <nav className="flex justify-center items-center gap-3 text-xs text-gray-300">
          <span className="footer-link">Terms & Conditions</span>
          <span aria-hidden="true">|</span>
          <span className="footer-link">Complaints Procedure</span>
          <span aria-hidden="true">|</span>
          <span className="footer-link">Privacy Policy</span>
        </nav>
      </footer>
    </>
  );
}