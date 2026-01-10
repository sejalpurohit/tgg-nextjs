
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import TrustAndClaimValue from "./TrustAndClaimValue";
import { ROUTES } from "../routes";

import SecureSSL from "../../public/secure-ssl.svg";
import ContactIcon from "../../public/contactIcon.svg";

export default function ContactDetails() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const allFilled = useMemo(() => {
    return mobile.trim().length > 0 && email.trim().length > 0;
  }, [mobile, email]);

  const handleFindAgreements = () => {
    if (!allFilled) return;
    router.push(ROUTES.SIGNATURE);
  };

  return (
    <section className="px-4 space-y-6">
      <div className="flex items-start justify-between gap-4 pt-2">
        <div>
          <h1 className="text-[34px] font-extrabold leading-tight">
            Enter Mobile Number
            <br />
            and Email Address
          </h1>

          <p className="text-[18px] text-gray-600 leading-relaxed mt-4">
            We will use these details to
            <br />
            cross reference any car finance
            <br />
            agreements you’ve had.
          </p>
        </div>

        <Image src={ContactIcon} alt="Contact icon" width={88} height={88} />
      </div>

      <div className="h-px bg-gray-200" />

      <div className="space-y-2">
        <h2 className="text-[32px] font-extrabold leading-tight">
          Your Mobile Number
        </h2>
        <p className="text-[18px] text-gray-600">For example: 07123456789</p>

        <div className="relative">
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
            inputMode="tel"
            className="w-full bg-gray-100 px-4 py-5 pr-24 text-[18px] outline-none rounded-lg"
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Image src={SecureSSL} alt="Secure SSL" width={70} height={28} />
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <h2 className="text-[32px] font-extrabold leading-tight">
          Your Email Address
        </h2>
        <p className="text-[18px] text-gray-600">
          For example: John@example.co.uk
        </p>

        <div className="relative">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            inputMode="email"
            className="w-full bg-gray-100 px-4 py-5 pr-24 text-[18px] outline-none rounded-lg"
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Image src={SecureSSL} alt="Secure SSL" width={70} height={28} />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleFindAgreements}
        disabled={!allFilled}
        className={`w-full rounded-full py-4 text-[22px] font-semibold text-white flex items-center justify-center gap-3 transition-colors ${
          allFilled ? "bg-[#FF004F]" : "bg-gray-300"
        }`}
      >
        <span className="text-[22px] leading-none">⌕</span>
        Find My Agreements
      </button>

      <TrustAndClaimValue />
    </section>
  );
}