"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import TrustAndClaimValue from "./TrustAndClaimValue";

import HomeIcon from "../../public/homeIcon.svg";

export default function CurrentAddress() {
  const router = useRouter();

  const [postcode, setPostcode] = useState("");
  const [showAddressFields, setShowAddressFields] = useState(false);

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [townCity, setTownCity] = useState("");
  const [county, setCounty] = useState("");

  const isPostcodeFilled = useMemo(() => postcode.trim().length > 0, [postcode]);

  const allAddressFilled = useMemo(() => {
    return (
      address1.trim().length > 0 &&
      address2.trim().length > 0 &&
      townCity.trim().length > 0 &&
      county.trim().length > 0
    );
  }, [address1, address2, townCity, county]);

  const handleSearch = () => {
    if (!isPostcodeFilled) return;
    setShowAddressFields(true);
  };

  const handleNext = () => {
    if (!allAddressFilled) return;
    router.push(ROUTES.PERSONAL_DETAILS);
  };

  return (
    <section className="px-4 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <h1 className="text-2xl font-extrabold">Your Current Address</h1>
          <p className="text-base text-gray-600">
            We need your current address to find your finance agreements
          </p>
        </div>
        <Image src={HomeIcon} alt="Home" width={56} height={56} />
      </div>

      <p className="text-base text-gray-700">
        Enter your postcode and tap 'Search'.
      </p>

      <div className="flex items-center gap-3">
        <input
          value={postcode}
          onChange={(e) => {
            const v = e.target.value;
            setPostcode(v);
            if (v.trim().length === 0) {
              setShowAddressFields(false);
              setAddress1("");
              setAddress2("");
              setTownCity("");
              setCounty("");
            }
          }}
          placeholder="Postcode"
          className="flex-1 bg-gray-100 px-3 py-3 text-base rounded-lg outline-none"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={!isPostcodeFilled}
          className={`min-w-[100px] rounded-full px-6 py-3 text-base font-semibold text-white ${
            isPostcodeFilled ? "bg-[#FF004F]" : "bg-gray-300"
          }`}
        >
          Search
        </button>
      </div>

      {showAddressFields && (
        <div className="space-y-4">
          <input
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            placeholder="Address Line 1"
            className="w-full bg-gray-100 px-3 py-3 text-base rounded-lg outline-none"
          />
          <input
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Address Line 2"
            className="w-full bg-gray-100 px-3 py-3 text-base rounded-lg outline-none"
          />
          <input
            value={townCity}
            onChange={(e) => setTownCity(e.target.value)}
            placeholder="Town/City"
            className="w-full bg-gray-100 px-3 py-3 text-base rounded-lg outline-none"
          />
          <input
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            placeholder="County"
            className="w-full bg-gray-100 px-3 py-3 text-base rounded-lg outline-none"
          />

          <p className="text-base text-gray-700">
            Please check the details above are correct before continuing.
          </p>

          <button
            type="button"
            onClick={handleNext}
            disabled={!allAddressFilled}
            className={`w-full rounded-full py-3 text-base font-semibold text-white flex items-center justify-center gap-2 ${
              allAddressFilled ? "bg-[#FF004F]" : "bg-gray-300"
            }`}
          >
            Next <span className="text-lg leading-none">›</span>
          </button>
        </div>
      )}

      <TrustAndClaimValue />
    </section>
  );
}