"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import TrustAndClaimValue from "./TrustAndClaimValue";

import { validateRequired, validateLettersOnly, validateDOB } from "../utils/validator";

type Validation = { ok: true } | { ok: false; message: string };

function FieldError({ show, message }: { show: boolean; message?: string }) {
  if (!show) return null;
  return <p className="mt-1 text-[#FF004F] text-sm font-semibold">{message}</p>;
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
      <h1 className="text-[30px] font-extrabold">Your Personal Details</h1>

      <p className="text-[18px] text-gray-600 leading-relaxed">
        Your current personal details are essential to
        <br />
        search for all finance agreements attached to
        <br />
        your name.
      </p>

      {/* Title */}
      <div className="w-[140px]">
        <div className="relative">
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => touch("title")}
            className={[
              "w-full appearance-none bg-white px-4 py-4 text-[18px] text-gray-700 outline-none",
              touched.title && !titleV.ok
                ? "border-2 border-[#FF004F] rounded-none"
                : "border border-gray-400 rounded-md",
            ].join(" ")}
          >
            <option value="" disabled>
              Title
            </option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Ms</option>
            <option>Miss</option>
            <option>Dr</option>
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-700">
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
            "w-full px-4 py-5 text-[18px] outline-none",
            touched.firstName && !firstNameV.ok
              ? "bg-white border-2 border-[#FF004F] rounded-none"
              : "bg-gray-100 border-2 border-transparent rounded-lg",
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
            "w-full px-4 py-5 text-[18px] outline-none",
            touched.surname && !surnameV.ok
              ? "bg-white border-2 border-[#FF004F] rounded-none"
              : "bg-gray-100 border-2 border-transparent rounded-lg",
          ].join(" ")}
        />
        <FieldError
          show={touched.surname && !surnameV.ok}
          message={surnameV.ok ? undefined : surnameV.message}
        />
      </div>

      {/* DOB */}
      <div className="space-y-3">
        <p className="text-[18px] text-gray-800">Date of Birth</p>

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
                "w-full px-4 py-5 text-[18px] outline-none text-center",
                dobHasError
                  ? "bg-white border-2 border-[#FF004F] rounded-none"
                  : "bg-gray-100 border-2 border-transparent rounded-lg",
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
                "w-full px-4 py-5 text-[18px] outline-none text-center",
                dobHasError
                  ? "bg-white border-2 border-[#FF004F] rounded-none"
                  : "bg-gray-100 border-2 border-transparent rounded-lg",
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
                "w-full px-4 py-5 text-[18px] outline-none text-center",
                dobHasError
                  ? "bg-white border-2 border-[#FF004F] rounded-none"
                  : "bg-gray-100 border-2 border-transparent rounded-lg",
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
        className={`w-full rounded-full py-4 text-[22px] font-semibold text-white flex items-center justify-center gap-3 transition-colors ${
          allValid ? "bg-[#FF004F]" : "bg-gray-300"
        }`}
      >
        Next <span className="text-[26px] leading-none">›</span>
      </button>

      <TrustAndClaimValue />
    </section>
  );
}