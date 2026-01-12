"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import TrustAndClaimValue from "./TrustAndClaimValue";
import { ROUTES } from "../routes";

import SecureSSL from "../../public/icons/secure-ssl.svg";
import ContactIcon from "../../public/icons/contactIcon.svg";
import SearchButton from "../../public/icons/searchButton.svg";

import {
  validateUKMobile,
  validateEmailSimple,
} from "../utils/validator";

type Validation = { ok: true } | { ok: false; message: string };

function FieldError({ show, message }: { show: boolean; message?: string }) {
  if (!show) return null;
  return <p className="mt-1 text-[#FF004F] text-sm font-semibold">{message}</p>;
}

export default function ContactDetails() {
  const router = useRouter();

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [touched, setTouched] = useState({
    mobile: false,
    email: false,
  });

  const touch = (k: keyof typeof touched) =>
    setTouched((p) => ({ ...p, [k]: true }));

  // ---- validation
  const mobileV: Validation = validateUKMobile(mobile);
  const emailV: Validation = validateEmailSimple(email);

  const mobileHasError = touched.mobile && !mobileV.ok;
  const emailHasError = touched.email && !emailV.ok;

  const allValid = mobileV.ok && emailV.ok;

  const handleFindAgreements = () => {
    setTouched({ mobile: true, email: true });
    if (!allValid) return;
    router.push(ROUTES.SIGNATURE);
  };

  // input sanitizers
  const digitsOnly11 = (v: string) => v.replace(/\D/g, "").slice(0, 11);
  const emailAllowed = (v: string) => v.replace(/[^A-Za-z0-9@.]/g, "").trim();

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

      {/* Mobile */}
      <div className="space-y-2">
        <h2 className="text-[32px] font-extrabold leading-tight">
          Your Mobile Number
        </h2>
        <p className="text-[18px] text-gray-600">For example: 07123456789</p>

        <div className="relative">
          <input
            value={mobile}
            onChange={(e) => setMobile(digitsOnly11(e.target.value))}
            onBlur={() => touch("mobile")}
            placeholder="Enter Mobile Number"
            inputMode="tel"
            aria-invalid={mobileHasError}
            className={[
              "w-full px-4 py-5 pr-24 text-[18px] outline-none",
              mobileHasError
                ? "bg-white border-2 border-[#FF004F] rounded-none"
                : "bg-gray-100 border-2 border-transparent rounded-lg",
            ].join(" ")}
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Image src={SecureSSL} alt="Secure SSL" width={70} height={28} />
          </div>
        </div>

        <FieldError
          show={mobileHasError}
          message={mobileV.ok ? undefined : mobileV.message}
        />
      </div>

      {/* Email */}
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
            onChange={(e) => setEmail(emailAllowed(e.target.value))}
            onBlur={() => touch("email")}
            placeholder="Enter Email Address"
            inputMode="email"
            aria-invalid={emailHasError}
            className={[
              "w-full px-4 py-5 pr-24 text-[18px] outline-none",
              emailHasError
                ? "bg-white border-2 border-[#FF004F] rounded-none"
                : "bg-gray-100 border-2 border-transparent rounded-lg",
            ].join(" ")}
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Image src={SecureSSL} alt="Secure SSL" width={70} height={28} />
          </div>
        </div>

        <FieldError
          show={emailHasError}
          message={emailV.ok ? undefined : emailV.message}
        />
      </div>

      <button
        type="button"
        onClick={handleFindAgreements}
        disabled={!allValid}
        // className={`w-full rounded-full py-4 text-[22px] font-semibold text-white flex items-center justify-center gap-3 transition-colors ${
        //   allValid ? "bg-[#FF004F]" : "bg-gray-300"
        // }`}
      >
        <Image src={SearchButton} alt="Find My Agreements" width={360} height={72} />
      </button>

      <TrustAndClaimValue />
    </section>
  );
}