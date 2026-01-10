"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import TrustAndClaimValue from "./TrustAndClaimValue";

import SecureSSL from "../../public/secure-ssl.svg";
import ContactIcon from "../../public/contactIcon.svg";

export default function ContactDetails() {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const allFilled = useMemo(() => {
    return mobile.trim().length > 0 && email.trim().length > 0;
  }, [mobile, email]);

  return (
    <section className="px-4 space-y-5 ">
      <h1 className="text-xl font-extrabold">
        Enter Mobile Number and Email Address
      </h1>

      <div className="flex items-start justify-between gap-3 -mt-2">
        <p className="text-base text-gray-600">
          We will use these details to cross reference any car finance agreements you've had.
        </p>
        <Image src={ContactIcon} alt="Contact icon" width={56} height={56} className="flex-shrink-0" />
      </div>

      <div className="h-px bg-gray-200" />

      <div className="space-y-2">
        <h2 className="text-xl font-extrabold">Your Mobile Number</h2>
        <p className="text-sm text-gray-600">For example: 07123456789</p>
        <div className="relative">
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
            inputMode="tel"
            className="w-full bg-gray-100 px-3 py-3 pr-20 text-base rounded-lg outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Image src={SecureSSL} alt="Secure SSL" width={56} height={22} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-extrabold">Your Email Address</h2>
        <p className="text-sm text-gray-600">For example: John@example.co.uk</p>
        <div className="relative">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            inputMode="email"
            className="w-full bg-gray-100 px-3 py-3 pr-20 text-base rounded-lg outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Image src={SecureSSL} alt="Secure SSL" width={56} height={22} />
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={!allFilled}
        className={`w-full rounded-full py-3 text-base font-semibold text-white flex items-center justify-center gap-2 ${
          allFilled ? "bg-[#FF004F]" : "bg-gray-300"
        }`}
      >
        <span className="text-lg leading-none">⌕</span>
        Find My Agreements
      </button>

      <div className="py-4">
        <TrustAndClaimValue />
      </div>
    </section>
  );
}