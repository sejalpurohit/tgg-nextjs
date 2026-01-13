"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TrustAndClaimValue from "./TrustAndClaimValue";
import { useAppSelector } from "../store/hooks";

import CongratsIcon from "../../public/icons/congratulations.svg";
import CourmacsLogo from "../../public/icons/courmacsLogo.svg";
import VideoFrame from "../../public/icons/videoFrame.svg";
import WhatsAppIcon from "../../public/icons/whatsapp.svg";
import UploadBtnSvg from "../../public/icons/clickToUpload.svg";
import DocumentsIcon from "../../public/icons/documentsIcon.svg";
import TickGreen from "../../public/icons/greenTick.svg";
import AgreementsOptionsSvg from "../../public/icons/options.svg";
import RectangleYellow from "../../public/icons/rectangleyellow.svg";
import VehicleInput from "../../public/icons/VehicleInput.svg";
import GBIcon from "../../public/icons/GB.svg";

import StarNone from "../../public/icons/zeroStars.svg";
import Star1 from "../../public/icons/oneStar.svg";
import Star2 from "../../public/icons/twoStars.svg";
import Star3 from "../../public/icons/threeStars.svg";
import Star4 from "../../public/icons/fourStars.svg";
import Star5 from "../../public/icons/fiveStars.svg";

const STAR_IMAGES = [StarNone, Star1, Star2, Star3, Star4, Star5];

function Divider() {
  return <div className="h-px bg-gray-200" />;
}

function BulletPoint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg">•</span>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <Image src={TickGreen} alt="" width={22} height={22} />
      <p className="text-base text-gray-800">{text}</p>
    </div>
  );
}

export default function ThankYou() {
  const user = useAppSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    setFirstName(user.firstName);
  }, [user.firstName]);
  useEffect(() => {
    console.log("User Details",user)
  }, [user]);

  const [reg, setReg] = useState("");
  const [rating, setRating] = useState(0);
  const [fileName, setFileName] = useState("");
  const [isAgreementsOpen, setIsAgreementsOpen] = useState(false);

  const canSearch = reg.trim().length > 0;

  const sanitizeReg = (v: string) =>
    v.toUpperCase().replace(/[^A-Z0-9 ]/g, "").replace(/\s+/g, " ").slice(0, 8);

  return (
    <section className="px-4 space-y-6 font-tiktok">
     
      <div className="flex items-start justify-between gap-4 pt-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Congratulations {firstName || "User"} your claim is now submitted.
          </h1>
          <p className="text-lg text-gray-700 mt-3">Your potential claim value is</p>
          <p className="text-4xl font-extrabold text-green-500 mt-1">£15,954.75*</p>
        </div>
        <Image src={CongratsIcon} alt="Congratulations" width={64} height={64} />
      </div>

   
      <div className="relative">
        {isAgreementsOpen && (
          <button
            type="button"
            className="fixed inset-0 z-10"
            onClick={() => setIsAgreementsOpen(false)}
          />
        )}
        <button
          type="button"
          onClick={() => setIsAgreementsOpen((s) => !s)}
          className="relative z-20 w-full border border-gray-400 rounded-md px-4 py-4 text-lg text-gray-800 bg-white flex items-center justify-between"
        >
          <span className="font-medium">3 Agreements Found</span>
          <span className="text-gray-700">{isAgreementsOpen ? "▲" : "▼"}</span>
        </button>
        {isAgreementsOpen && (
          <div className="relative z-20 mt-2">
            <Image src={AgreementsOptionsSvg} alt="Agreements" className="w-full h-auto" priority />
          </div>
        )}
      </div>

  
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold leading-tight">
          Feel like we've missed<br />something?
        </h2>
        <p className="text-base text-gray-600">
          Use the registration checker below to find other agreements you know you've had.
        </p>

        <div className="bg-gray-100 rounded-xl p-4 space-y-3">
          <p className="text-lg text-gray-800 font-medium">Enter Vehicle Registration Number</p>

          <div className="relative w-full">
            <Image src={RectangleYellow} alt="" className="w-full h-auto" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex justify-center">
              <Image src={GBIcon} alt="GB" width={24} height={24} />
            </div>
            <input
              value={reg}
              onChange={(e) => setReg(sanitizeReg(e.target.value))}
              placeholder="ENTER REG"
              className="absolute inset-0 w-full h-full bg-transparent uppercase font-extrabold text-4xl text-center pl-12"
            />
          </div>

          <button
            type="button"
            disabled={!canSearch}
            className={`w-full rounded-lg py-3 text-lg font-semibold text-white ${canSearch ? "bg-[#FF004F]" : "bg-gray-300"
              }`}
          >
            Search ›
          </button>
        </div>
      </div>

      <Divider />

  
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold">Next steps</h2>
          <Image src={CourmacsLogo} alt="Courmacs Legal" width={90} height={44} />
        </div>
        <p className="text-base text-gray-700 leading-relaxed">
          Keep an eye out for an email in your inbox as we will shortly be sending you a copy of
          your legal documents. Don't forget to check your junk or spam folder.
        </p>
        <p className="text-sm text-gray-600">
          Watch this short video on what the next steps of your journey with Courmacs Legal are.
        </p>
        <div className="relative">
          <Image src={VideoFrame} alt="Next steps video" className="w-full h-auto rounded-md" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-purple-600/90 flex items-center justify-center">
              <span className="text-white text-3xl ml-1">▶</span>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <button type="button" aria-label="Share on WhatsApp" className="active:scale-[0.98] transition">
        <Image src={WhatsAppIcon} alt="" className="w-full h-auto" />
      </button>

      <Divider />

      <div>
  <h2 className="text-3xl font-extrabold">How quick and easy was our website?</h2>
  <p className="text-base text-gray-700">
    Leave us a review to help others find out how much they could potentially be owed.
  </p>

  <div className="mt-4 border border-gray-200 rounded-md p-4">
    <p className="text-center text-gray-800 font-medium">Select A Star To Leave A Review</p>

    <div className="relative mt-4 mx-auto w-[260px]">
      <Image src={STAR_IMAGES[rating]} alt="Rating" className="w-full h-auto" />
      <div className="absolute inset-0 grid grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} type="button" onClick={() => setRating(i)} className="w-full h-full" />
        ))}
      </div>
    </div>
  </div>
</div>

      <Divider />

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold">Speed Things Up!</h2>
            <p className="text-sm text-gray-700">
              Speed up your claim by uploading your driving licence (or passport).
            </p>
          </div>
          <Image src={DocumentsIcon} alt="Documents" width={54} height={54} />
        </div>

        <label className="w-full block bg-cyan-50 border border-cyan-200 rounded-lg py-4 text-center text-lg font-semibold text-teal-600 cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
          {fileName || (
            <span className="inline-flex items-center gap-2">
              <Image src={UploadBtnSvg} alt="Upload" width={18} height={18} />
              Click to Upload
            </span>
          )}
        </label>

        <button
          type="button"
          className="w-full rounded-lg bg-gray-300 text-white py-3 text-lg font-semibold"
        >
          Submit ›
        </button>

        <div className="space-y-4 pt-2">
          <CheckItem text="95% chance their car finance included lender commission." />
          <CheckItem text="The average claim value is £5,318.25 per vehicle." />
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h2 className="text-2xl font-extrabold">Legal Obligations</h2>
        <div className="space-y-4">
          <BulletPoint>
            By submitting your details, you have entered a legal claims process. It is important
            to review the confirmation email for more information about what to expect.
          </BulletPoint>
          <BulletPoint>
            <p className="font-semibold text-gray-800">Your Claim Value</p>
            <p>
              The average claim value is £5,318.25, with some clients receiving up to £10,446.46.
              Claim amounts depend on individual circumstances.
            </p>
          </BulletPoint>
        </div>
      </div>

      <TrustAndClaimValue />
    </section>
  );
}