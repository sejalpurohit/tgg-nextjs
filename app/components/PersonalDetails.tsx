"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import TrustAndClaimValue from "./TrustAndClaimValue";

export default function PersonalDetails() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [dd, setDd] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");

  const allFilled = useMemo(() => {
    return (
      title.trim().length > 0 &&
      firstName.trim().length > 0 &&
      surname.trim().length > 0 &&
      dd.trim().length > 0 &&
      mm.trim().length > 0 &&
      yyyy.trim().length > 0
    );
  }, [title, firstName, surname, dd, mm, yyyy]);

  const handleNext = () => {
    if (!allFilled) return;
    router.push(ROUTES.CONTACT_DETAILS);
  };

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

      <div className="w-[140px]">
        <div className="relative">
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-400 rounded-md px-4 py-4 text-[18px] text-gray-700 outline-none"
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
        </div>
      </div>

      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className="w-full bg-gray-100 px-4 py-5 text-[18px] outline-none rounded-lg"
      />

      <input
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Surname"
        className="w-full bg-gray-100 px-4 py-5 text-[18px] outline-none rounded-lg"
      />

      <div className="space-y-3">
        <p className="text-[18px] text-gray-800">Date of Birth</p>

        <div className="flex gap-4">
          <input
            value={dd}
            onChange={(e) => setDd(e.target.value)}
            placeholder="DD"
            inputMode="numeric"
            maxLength={2}
            className="w-1/3 bg-gray-100 px-4 py-5 text-[18px] outline-none rounded-lg text-center"
          />
          <input
            value={mm}
            onChange={(e) => setMm(e.target.value)}
            placeholder="MM"
            inputMode="numeric"
            maxLength={2}
            className="w-1/3 bg-gray-100 px-4 py-5 text-[18px] outline-none rounded-lg text-center"
          />
          <input
            value={yyyy}
            onChange={(e) => setYyyy(e.target.value)}
            placeholder="YYYY"
            inputMode="numeric"
            maxLength={4}
            className="w-1/3 bg-gray-100 px-4 py-5 text-[18px] outline-none rounded-lg text-center"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={!allFilled}
        className={`w-full rounded-full py-4 text-[22px] font-semibold text-white flex items-center justify-center gap-3 transition-colors ${
          allFilled ? "bg-[#FF004F]" : "bg-gray-300"
        }`}
      >
        Next <span className="text-[26px] leading-none">›</span>
      </button>

      <TrustAndClaimValue />
    </section>
  );
}