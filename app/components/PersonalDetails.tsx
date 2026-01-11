"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import TrustAndClaimValue from "./TrustAndClaimValue";

import { validateRequired, validateLettersOnly, validateDOB } from "../utils/validator";

type Validation = { ok: true } | { ok: false; message: string };

function FieldError({ show, message }: { show: boolean; message?: string }) {
  if (!show) return null;
  return <p className="mt-1 text-[#FF004F] text-sm font-semibold font-tiktok">{message}</p>;
}

export default function PersonalDetails() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [dd, setDd] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");

  const [touched, setTouched] = useState({
    title: false,
    firstName: false,
    surname: false,
    dd: false,
    mm: false,
    yyyy: false,
  });

  const touch = (k: keyof typeof touched) =>
    setTouched((p) => ({ ...p, [k]: true }));

  // --- validation
  const titleV: Validation = validateRequired(title);
  const firstNameV: Validation = validateLettersOnly(firstName); // required included
  const surnameV: Validation = validateLettersOnly(surname); // required included

  // ✅ DOB validation (single result for dd/mm/yyyy)
  const dobV: Validation = validateDOB(dd, mm, yyyy);

  const allValid = titleV.ok && firstNameV.ok && surnameV.ok && dobV.ok;

  const handleNext = () => {
    setTouched({
      title: true,
      firstName: true,
      surname: true,
      dd: true,
      mm: true,
      yyyy: true,
    });

    if (!allValid) return;
    router.push(ROUTES.CONTACT_DETAILS);
  };

  // input helpers
  const lettersOnly = (v: string) => v.replace(/[^A-Za-z ]/g, "");
  const digitsOnly = (v: string, maxLen: number) =>
    v.replace(/\D/g, "").slice(0, maxLen);

  const dobTouched = touched.dd || touched.mm || touched.yyyy;
  const dobHasError = dobTouched && !dobV.ok;

  return (
    <section className="px-4 space-y-6">
      <h1 className="pt-6 text-[24px] font-semibold">Your Personal Details</h1>
      <p className="text-[16px] text-gray-600 leading-relaxed -mt-4">
        Your current personal details are essential to search for all finance agreements attached to your name.
      </p>

      {/* Title */}
      <div className="w-[88px]">
        <div className="relative">
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => touch("title")}
            className={[
              "w-full h-[50px] appearance-none bg-white px-4 text-[16px] text-left   text-gray-500 outline-none",
              touched.title && !titleV.ok
                ? "border-0 border-[#FF004F] rounded-none"
                : "border border-gray-400 rounded-none",
            ].join(" ")}
          >
            <option value="" disabled hidden className="text-gray-500">
              Title
            </option>
            <option className="text-gray-700">Mr</option>
            <option className="text-gray-700">Miss</option>
            <option className="text-gray-700">Mrs</option>
            <option className="text-gray-700">Ms</option>
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 text-[10px]">
            ▼
          </span>

          <FieldError
            show={touched.title && !titleV.ok}
            message={titleV.ok ? undefined : titleV.message}
          />
        </div>
      </div>

      {/* First Name */}
      <div>
        <input
          value={firstName}
          onChange={(e) => setFirstName(lettersOnly(e.target.value))}
          onBlur={() => touch("firstName")}
          placeholder="First Name"
          className={[
            "w-full px-4 h-[50px] text-[18px] outline-none font-tiktok",
            touched.firstName && !firstNameV.ok
              ? "bg-white border-2 border-[#FF004F] rounded-none"
              : "bg-gray-100 border-2 border-transparent rounded-none",
          ].join(" ")}
        />
        <FieldError
          show={touched.firstName && !firstNameV.ok}
          message={firstNameV.ok ? undefined : firstNameV.message}
        />
      </div>

      {/* Surname */}
      <div>
        <input
          value={surname}
          onChange={(e) => setSurname(lettersOnly(e.target.value))}
          onBlur={() => touch("surname")}
          placeholder="Surname"
          className={[
            "w-full px-4 h-[50px] text-[18px] outline-none font-tiktok",
            touched.surname && !surnameV.ok
              ? "bg-white border-2 border-[#FF004F] rounded-none"
              : "bg-gray-100 border-2 border-transparent rounded-none",
          ].join(" ")}
        />
        <FieldError
          show={touched.surname && !surnameV.ok}
          message={surnameV.ok ? undefined : surnameV.message}
        />
      </div>

      {/* DOB */}
      <div className="space-y-3">
        <p className="text-[16px] text-gray-800/80 text-s">Date of Birth</p>

        <div className="flex gap-4">
          <div className="w-1/3">
            <input
              value={dd}
              onChange={(e) => setDd(digitsOnly(e.target.value, 2))}
              onBlur={() => touch("dd")}
              placeholder="DD"
              type="number"
              inputMode="numeric"
              className={[
                "w-full px-4 h-[50px] text-[18px] outline-none text-center font-tiktok",
                dobHasError
                  ? "bg-white border-2 border-[#FF004F] rounded-none"
                  : "bg-gray-100 border-2 border-transparent rounded-none",
              ].join(" ")}
            />
          </div>

          <div className="w-1/3">
            <input
              value={mm}
              onChange={(e) => setMm(digitsOnly(e.target.value, 2))}
              onBlur={() => touch("mm")}
              placeholder="MM"
              type="number"
              inputMode="numeric"
              className={[
                "w-full px-4 h-[50px] text-[18px] outline-none text-center font-tiktok",
                dobHasError
                  ? "bg-white border-2 border-[#FF004F] rounded-none"
                  : "bg-gray-100 border-2 border-transparent rounded-none",
              ].join(" ")}
            />
          </div>

          <div className="w-1/3">
            <input
              value={yyyy}
              onChange={(e) => setYyyy(digitsOnly(e.target.value, 4))}
              onBlur={() => touch("yyyy")}
              placeholder="YYYY"
              type="number"
              inputMode="numeric"
              className={[
                "w-full px-4 h-[50px] text-[18px] outline-none text-center font-tiktok",
                dobHasError
                  ? "bg-white border-2 border-[#FF004F] rounded-none"
                  : "bg-gray-100 border-2 border-transparent rounded-none",
              ].join(" ")}
            />
          </div>
        </div>

        <FieldError
          show={dobHasError}
          message={dobV.ok ? undefined : dobV.message}
        />
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={!allValid}
        className={`w-full rounded-md py-4 text-[22px] h-[50px] font-semibold text-white flex items-center justify-center gap-3 transition-colors font-tiktok ${allValid ? "bg-[#FF004F]" : "bg-gray-300"
          }`}
      >
        Next <span className="text-[26px] leading-none">›</span>
      </button>

      <TrustAndClaimValue />
    </section>
  );
}