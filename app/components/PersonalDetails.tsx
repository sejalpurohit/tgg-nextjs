"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import { cn } from "../utils/cn";
import TrustAndClaimValue from "./TrustAndClaimValue";
import { TextInput } from "./ui/TextInput";
import { useAppDispatch } from "../store/hooks";
import { setFirstName as setReduxFirstName } from "../store/userSlice";

import { validateRequired, validateLettersOnly, validateDOB } from "../utils/validator";

type Validation = { ok: true } | { ok: false; message: string };

const OPTIONS = ["Mr", "Miss", "Mrs", "Ms"];
function TitleSelect({
  value,
  setValue,
  error,
  onBlur,
}: {
  value: string;
  setValue: (v: string) => void;
  error?: boolean;
  onBlur?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-[88px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false);
            onBlur?.();
          }, 0);
        }}
        aria-invalid={error || undefined}
        className={cn(
          "w-full h-[50px] bg-white px-4 text-base text-left",
          "flex items-center justify-between rounded-none",
          error ? "border-2 border-[#FF004F]" : "border border-gray-400"
        )}
      >
        <span className={value ? "text-gray-700" : "text-gray-500"}>
          {value || "Title"}
        </span>
        <span className="text-gray-700 text-[10px]">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 right-0 z-50 bg-white",
            error
              ? "border-2 border-[#FF004F] border-t-0"
              : "border border-gray-400 border-t-0"
          )}
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setValue(opt);
                setOpen(false);
                onBlur?.();
              }}
              className={cn(
                "w-full h-[50px] px-4 text-left text-base text-gray-700",
                "border-t border-gray-300",
                value === opt && "bg-gray-100 font-medium"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default function PersonalDetails() {
  const router = useRouter();
  const dispatch = useAppDispatch();

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

  const titleV: Validation = validateRequired(title);
  const firstNameV: Validation = validateLettersOnly(firstName);
  const surnameV: Validation = validateLettersOnly(surname);
  const dobV: Validation = validateDOB(dd, mm, yyyy);

  const allValid = titleV.ok && firstNameV.ok && surnameV.ok && dobV.ok;

  const handleNext = () => {
    touchAll();
    if (!allValid) return;
    dispatch(setReduxFirstName(firstName));
    router.push(ROUTES.CONTACT_DETAILS);
  };

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

      <div className="w-[88px] space-y-1">
        <div className="relative">
            <TitleSelect
              value={title}
              setValue={setTitle}
              error={Boolean(titleError)}
              onBlur={() => touch("title")}
            />
            {titleError && <p className="error-text">{titleError}</p>}
        </div>
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