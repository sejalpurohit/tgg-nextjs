"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import { cn } from "../utils/cn";
import TrustAndClaimValue from "./TrustAndClaimValue";
import { TextInput } from "./ui/TextInput";

import { validateRequired, validateLettersOnly, validateDOB } from "../utils/validator";

type Validation = { ok: true } | { ok: false; message: string };

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

  const touchAll = () =>
    setTouched({
      title: true,
      firstName: true,
      surname: true,
      dd: true,
      mm: true,
      yyyy: true,
    });

  // --- validation
  const titleV: Validation = validateRequired(title);
  const firstNameV: Validation = validateLettersOnly(firstName);
  const surnameV: Validation = validateLettersOnly(surname);
  const dobV: Validation = validateDOB(dd, mm, yyyy);

  const allValid = titleV.ok && firstNameV.ok && surnameV.ok && dobV.ok;

  const handleNext = () => {
    touchAll();
    if (!allValid) return;
    router.push(ROUTES.CONTACT_DETAILS);
  };

  // input helpers
  const lettersOnly = (v: string) => v.replace(/[^A-Za-z ]/g, "");
  const digitsOnly = (v: string, maxLen: number) =>
    v.replace(/\D/g, "").slice(0, maxLen);

  const titleError = touched.title && !titleV.ok ? titleV.message : undefined;
  const firstNameError =
    touched.firstName && !firstNameV.ok ? firstNameV.message : undefined;
  const surnameError =
    touched.surname && !surnameV.ok ? surnameV.message : undefined;

  const dobTouched = touched.dd || touched.mm || touched.yyyy;
  const dobError = dobTouched && !dobV.ok ? dobV.message : undefined;

  return (
    <section className="page">
      <header className="space-y-2 pt-6">
        <h1 className="text-[24px] font-semibold">Your Personal Details</h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Your current personal details are essential to search for all finance
          agreements attached to your name.
        </p>
      </header>

      {/* Title */}
      <div className="w-[88px] space-y-1">
        <div className="relative">
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => touch("title")}
            aria-invalid={Boolean(titleError) || undefined}
            className={cn(
              "w-full h-[50px] appearance-none bg-white px-4 text-base text-left text-gray-500 outline-none rounded-none",
              titleError ? "border-2 border-[#FF004F]" : "border border-gray-400"
            )}
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
        </div>

        {titleError && <p className="error-text">{titleError}</p>}
      </div>

      <TextInput
        value={firstName}
        onValueChange={(v) => setFirstName(lettersOnly(v))}
        onBlur={() => touch("firstName")}
        placeholder="First Name"
        error={firstNameError}
      />

      <TextInput
        value={surname}
        onValueChange={(v) => setSurname(lettersOnly(v))}
        onBlur={() => touch("surname")}
        placeholder="Surname"
        error={surnameError}
      />

      {/* DOB */}
      <div className="space-y-3">
        <p className="text-base text-gray-700">Date of Birth</p>

        <div className="grid grid-cols-3 gap-4">
          <input
            value={dd}
            onChange={(e) => setDd(digitsOnly(e.target.value, 2))}
            onBlur={() => touch("dd")}
            placeholder="DD"
            inputMode="numeric"
            pattern="\d*"
            className={cn("control text-center", dobError && "control-error")}
          />

          <input
            value={mm}
            onChange={(e) => setMm(digitsOnly(e.target.value, 2))}
            onBlur={() => touch("mm")}
            placeholder="MM"
            inputMode="numeric"
            pattern="\d*"
            className={cn("control text-center", dobError && "control-error")}
          />

          <input
            value={yyyy}
            onChange={(e) => setYyyy(digitsOnly(e.target.value, 4))}
            onBlur={() => touch("yyyy")}
            placeholder="YYYY"
            inputMode="numeric"
            pattern="\d*"
            className={cn("control text-center", dobError && "control-error")}
          />
        </div>

        {dobError && <p className="error-text">{dobError}</p>}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={!allValid}
        className={cn(
          "w-full h-[50px] rounded-md text-[22px] font-semibold text-white flex items-center justify-center gap-3 transition-colors",
          allValid ? "bg-[#FF004F]" : "bg-gray-300"
        )}
      >
        Next <span className="text-[26px] leading-none">›</span>
      </button>

      <TrustAndClaimValue />
    </section>
  );
}