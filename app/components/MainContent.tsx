"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import TrustAndClaimValue from "./TrustAndClaimValue";

import Tick from "../../public/tick.svg";
import SearchButton from "../../public/searchButton.svg";
import ViewLender from "../../public/view-lenders.svg";
import FAQ from "../../public/faq.svg";

import FAQAccordion from "./FAQAccordion";

export default function MainContent() {
  const [showFAQ, setShowFAQ] = useState(false);
  const router = useRouter();

  return (
    <section className="px-4 space-y-6">
      <h1 className="text-[32px] font-extrabold leading-tight">
        You could be owed up to{" "}
        <span className="font-extrabold">£5,318.25*</span> per car finance
        agreement.
      </h1>

      <p className="text-base text-gray-600">
      Check in under 60 seconds to see if you’re owed compensation. Use the free agreement finder to start your claim.
      </p>

      <button
        onClick={() => router.push(ROUTES.CURRENT_ADDRESS)}
        className="w-full flex justify-center transition"
      >
        <Image src={SearchButton} alt="Find My Agreements" width={360} height={72} />
      </button>

      <TrustAndClaimValue />

      <ul className="mx-auto w-fit space-y-3 text-sm text-gray-800">
        <li className="flex items-start gap-3">
          <Image src={Tick} alt="" width={18} height={18} />
          <span>Check in under <span className="font-bold">60 seconds</span></span>
        </li>
        <li className="flex items-start gap-3">
          <Image src={Tick} alt="" width={18} height={18} />
          <span><span className="font-bold">Free</span> agreement finder</span>
        </li>
        <li className="flex items-start gap-3">
          <Image src={Tick} alt="" width={18} height={18} />
          <span><span className="font-bold">1 Million+</span> drivers signed up</span>
        </li>
      </ul>

      <div className="space-y-4">
        <div className="bg-black text-white  px-4 py-6 space-y-4 -mx-4">
          <p className="text-base font-normal text-left">
            We will locate all of your vehicle finance agreements with all these
            73 lenders.
          </p>

          <button className="relative w-full flex justify-center items-center">
            <Image src={ViewLender} alt="" width={360} height={56} />
          </button>

          {!showFAQ && (
            <button
              onClick={() => setShowFAQ(true)}
              className="relative w-full flex justify-center items-center"
            >
              <Image src={FAQ} alt="" width={360} height={56} />
            </button>
          )}
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showFAQ ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-sm">
            <FAQAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}