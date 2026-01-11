"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import TrustAndClaimValue from "./TrustAndClaimValue";
import HomeIcon from "../../public/homeIcon.svg";

import {
  sanitizeText,
  validateRequired,
  validateLettersNumbers,
  validatePostcodeLength,
  validateLettersOnly,
  type ValidationResult,
} from "../utils/validator";

type InputProps = {
  value: string;
  placeholder: string;
  hasError: boolean;
  errorText?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
};

function ValidatedInput({
  value,
  placeholder,
  hasError,
  errorText,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={hasError}
        className={[
          "w-full px-3 py-3 text-base outline-none",
          hasError
            ? "bg-white border-2 border-[#FF004F] rounded-none"
            : "bg-gray-100 border-2 border-transparent rounded-lg",
        ].join(" ")}
      />
      {hasError && (
        <p className="mt-1 text-[#FF004F] text-sm font-semibold">{errorText}</p>
      )}
    </div>
  );
}

export default function CurrentAddress() {
  const router = useRouter();

  const [postcode, setPostcode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [townCity, setTownCity] = useState("");
  const [county, setCounty] = useState("");

  const [showAddressFields, setShowAddressFields] = useState(false);

  const [touched, setTouched] = useState({
    postcode: false,
    address1: false,
    address2: false,
    townCity: false,
    county: false,
  });

  const touch = (key: keyof typeof touched) =>
    setTouched((p) => ({ ...p, [key]: true }));

  const resetAddress = () => {
    setShowAddressFields(false);
    setAddress1("");
    setAddress2("");
    setTownCity("");
    setCounty("");
    setTouched((p) => ({
      ...p,
      address1: false,
      address2: false,
      townCity: false,
      county: false,
    }));
  };

  const validateGenericField = (value: string): ValidationResult => {
    const r1 = validateRequired(value);
    if (!r1.ok) return r1;

    return validateLettersNumbers(value, { allowSpace: true, allowComma: false });
  };

  const validatePostcode = (value: string): ValidationResult => {
    const r = validateGenericField(value);
    if (!r.ok) return r;

    return validatePostcodeLength(value);
  };

  const postcodeV = validatePostcode(postcode);
  const address1V = validateGenericField(address1);
  const address2V = validateGenericField(address2);

  const townCityV = validateLettersOnly(townCity);
  const countyV = validateLettersOnly(county);

  const postcodeHasError = touched.postcode && !postcodeV.ok;
  const address1HasError = touched.address1 && !address1V.ok;
  const address2HasError = touched.address2 && !address2V.ok;
  const townCityHasError = touched.townCity && !townCityV.ok;
  const countyHasError = touched.county && !countyV.ok;

  const isPostcodeValid = postcodeV.ok;

  const allAddressValid =
    address1V.ok && address2V.ok && townCityV.ok && countyV.ok;

  const handleSearch = () => {
    touch("postcode");
    if (!postcodeV.ok) return;
    setShowAddressFields(true);
  };

  const handleNext = () => {
    setTouched((p) => ({
      ...p,
      address1: true,
      address2: true,
      townCity: true,
      county: true,
    }));
    if (!allAddressValid) return;

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

      <p className="text-base text-gray-700">Enter your postcode and tap 'Search'.</p>

      <div className="flex items-start gap-3">
        <div className="flex-1">
          <ValidatedInput
            value={postcode}
            placeholder="Postcode"
            hasError={postcodeHasError}
            errorText={postcodeV.ok ? undefined : postcodeV.message}
            onBlur={() => touch("postcode")}
            onChange={(raw) => {
              const cleaned = sanitizeText(raw, {
                allowComma: false,
                allowSpace: true,
                maxLen: 8,
                toUpperCase: true,
              });
              setPostcode(cleaned);

              if (!cleaned.trim()) resetAddress();
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          disabled={!isPostcodeValid}
          className={`min-w-[100px] rounded-full px-6 py-3 text-base font-semibold text-white ${
            isPostcodeValid ? "bg-[#FF004F]" : "bg-gray-300"
          }`}
        >
          Search
        </button>
      </div>

      {showAddressFields && (
        <div className="space-y-4">
          <ValidatedInput
            value={address1}
            placeholder="Address Line 1"
            hasError={address1HasError}
            errorText={address1V.ok ? undefined : address1V.message}
            onBlur={() => touch("address1")}
            onChange={(raw) =>
              setAddress1(
                sanitizeText(raw, { allowComma: false, allowSpace: true, maxLen: 80 })
              )
            }
          />

          <ValidatedInput
            value={address2}
            placeholder="Address Line 2"
            hasError={address2HasError}
            errorText={address2V.ok ? undefined : address2V.message}
            onBlur={() => touch("address2")}
            onChange={(raw) =>
              setAddress2(
                sanitizeText(raw, { allowComma: false, allowSpace: true, maxLen: 80 })
              )
            }
          />

          <ValidatedInput
            value={townCity}
            placeholder="Town/City"
            hasError={townCityHasError}
            errorText={townCityV.ok ? undefined : townCityV.message}
            onBlur={() => touch("townCity")}
            onChange={(raw) =>
              setTownCity(
                sanitizeText(raw, { allowComma: false, allowSpace: true, maxLen: 60 }).replace(
                  /[0-9]/g,
                  ""
                )
              )
            }
          />

          <ValidatedInput
            value={county}
            placeholder="County"
            hasError={countyHasError}
            errorText={countyV.ok ? undefined : countyV.message}
            onBlur={() => touch("county")}
            onChange={(raw) =>
              setCounty(
                sanitizeText(raw, { allowComma: false, allowSpace: true, maxLen: 60 }).replace(
                  /[0-9]/g,
                  ""
                )
              )
            }
          />

          <p className="text-base text-gray-700">
            Please check the details above are correct before continuing.
          </p>

          <button
            type="button"
            onClick={handleNext}
            disabled={!allAddressValid}
            className={`w-full rounded-full py-3 text-base font-semibold text-white flex items-center justify-center gap-2 ${
              allAddressValid ? "bg-[#FF004F]" : "bg-gray-300"
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