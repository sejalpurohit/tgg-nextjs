"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import { cn } from "../utils/cn";
import TrustAndClaimValue from "./TrustAndClaimValue";
import { TextInput } from "./ui/TextInput";
import { useAppDispatch } from "../store/hooks";
import {
  setMobile as setReduxMobile,
  setEmail as setReduxEmail,
} from "../store/userSlice";

import SecureSSL from "../../public/icons/secure-ssl.svg";
import ContactIcon from "../../public/icons/contactIcon.svg";
import SearchButton from "../../public/icons/searchButton.svg";

import {
  validateUKMobile,
  validateEmailSimple,
  sanitizeEmail,
} from "../utils/validator";

type Validation = { ok: true } | { ok: false; message: string };

export default function ContactDetails() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [touched, setTouched] = useState({ mobile: false, email: false });

  const touch = (k: keyof typeof touched) =>
    setTouched((p) => ({ ...p, [k]: true }));

  const mobileV: Validation = validateUKMobile(mobile);
  const emailV: Validation = validateEmailSimple(email);

  const mobileError =
    touched.mobile && !mobileV.ok ? mobileV.message : undefined;

  const emailError = touched.email && !emailV.ok ? emailV.message : undefined;

  const allValid = mobileV.ok && emailV.ok;

  const handleFindAgreements = () => {
    setTouched({ mobile: true, email: true });
    if (!allValid) return;

    dispatch(setReduxMobile(mobile));
    dispatch(setReduxEmail(email));

    router.push(ROUTES.SIGNATURE);
  };

  const sslBadge = (
    <Image src={SecureSSL} alt="Secure SSL" width={70} height={28} />
  );

  return (
    <section className="page w-full">
      <header className="flex items-start justify-between gap-4 pt-2">
        <div className="flex-1 min-w-0">
          <h1 className="text-[34px] font-extrabold leading-tight">
            Enter Mobile Number and Email Address
          </h1>

          <p className="text-[18px] text-gray-600 leading-relaxed mt-4">
            We will use these details to cross reference any car finance
            agreements you’ve had.
          </p>
        </div>

        <Image
          src={ContactIcon}
          alt="Contact icon"
          width={88}
          height={88}
          className="flex-shrink-0"
        />
      </header>

      <hr className="border-gray-200" />

      <section className="space-y-2">
        <h2 className="text-[32px] font-extrabold leading-tight">
          Your Mobile Number
        </h2>
        <p className="text-[18px] text-gray-600">For example: 07123456789</p>

        <TextInput
          value={mobile}
          onValueChange={(v) => setMobile(v.replace(/\D/g, ""))}
          onBlur={() => touch("mobile")}
          placeholder="Enter Mobile Number"
          type="tel"
          inputMode="numeric"
          maxLength={15}
          pattern="[0-9]*"
          error={mobileError}
          rightSlot={sslBadge}
        />
      </section>

      <section className="space-y-2 pt-2">
        <h2 className="text-[32px] font-extrabold leading-tight">
          Your Email Address
        </h2>
        <p className="text-[18px] text-gray-600">
          For example: John@example.co.uk
        </p>

        <TextInput
          value={email}
          onValueChange={(v) => setEmail(sanitizeEmail(v))}
          onBlur={() => touch("email")}
          placeholder="Enter Email Address"
          inputMode="email"
          error={emailError}
          rightSlot={sslBadge}
        />
      </section>

      <button
        type="button"
        onClick={handleFindAgreements}
        disabled={!allValid}
        aria-label="Find my agreements"
        className={cn(
          "w-full flex justify-center transition active:scale-[0.98]",
          !allValid && "opacity-50"
        )}
      >
        <Image
          src={SearchButton}
          alt="Find My Agreements"
          width={360}
          height={72}
        />
      </button>

      <TrustAndClaimValue />
    </section>
  );
}
