import Image from "next/image";
import Link from "next/link";
import SRALogo from "../../public/icons/sra-logo.svg";

export default function FooterLegal() {
  return (
    <section className="bg-white px-4 py-4 border-t border-gray-200">
      <div className="mb-4">
        <Image
          src={SRALogo}
          alt="Solicitors Regulation Authority"
          width={120}
          height={35}
        />
      </div>
      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <p>
          PCP Pal is a trading style of Courmacs Legal Limited. Registered in
          England and Wales, Company No. 13185687 Authorised and regulated by
          the Solicitors Regulation Authority (SRA) – SRA Reg No: 819044
          Registered with the Information Commissioner's Office (ICO) – ICO Reg
          No: ZA886741.
        </p>

        <p>
          The outcome of your claim will depend on the specific circumstances of
          your case. Results may vary, and past performance does not indicate
          future outcomes.
        </p>

        <p>
          *£5,318.25 is the average claim as of 29/05/2024.
          <br />
          *£10,446.46 is the most significant claim value as of 29/05/2024.
          <br />
          *Based on industry research; industry results may vary.
        </p>

        <div>
          <h4 className="font-semibold text-gray-900 mb-1">
            Privacy and Complaints
          </h4>
          <p>
            By submitting a claim, you consent to Courmacs Legal Limited
            processing your data in accordance with our{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            . For concerns, please review our{" "}
            <Link href="/complaints" className="underline underline-offset-2">
              Complaints Procedure
            </Link>
            .
          </p>
        </div>

        <p>
          The agreements identified are subject to verification. This means that
          while agreements may be initially detected, they must go through a
          verification process to confirm eligibility.
        </p>
      </div>
    </section>
  );
}
