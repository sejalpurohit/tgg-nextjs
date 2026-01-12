"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import { cn } from "../utils/cn";

import TrustAndClaimValue from "./TrustAndClaimValue";
import { TextInput } from "./ui/TextInput";
import HomeIcon from "../../public/icons/homeIcon.svg";

import {
  sanitizeText,
  validateRequired,
  validateLettersNumbers,
  validatePostcodeLength,
  validateLettersOnly,
  type ValidationResult,
} from "../utils/validator";

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

  const postcodeError =
    touched.postcode && !postcodeV.ok ? postcodeV.message : undefined;
  const address1Error =
    touched.address1 && !address1V.ok ? address1V.message : undefined;
  const address2Error =
    touched.address2 && !address2V.ok ? address2V.message : undefined;
  const townCityError =
    touched.townCity && !townCityV.ok ? townCityV.message : undefined;
  const countyError =
    touched.county && !countyV.ok ? countyV.message : undefined;

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
    <section className="page">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <h1 className="text-2xl font-extrabold">Your Current Address</h1>
          <p className="text-base text-gray-600">
            We need your current address to find your finance agreements
          </p>
        </div>
        <Image src={HomeIcon} alt="Home" width={56} height={56} />
      </header>

      <p className="text-base text-gray-700">
        Enter your postcode and tap 'Search'.
      </p>

      <div className="grid grid-cols-[197px_1fr] items-start gap-3">
        <TextInput
          value={postcode}
          placeholder="Postcode"
          onBlur={() => touch("postcode")}
          error={postcodeError}
          onValueChange={(raw) => {
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

        <button
          type="button"
          onClick={handleSearch}
          disabled={!isPostcodeValid}
          className={cn(
            "min-w-[132px] h-[35px] mt-2 rounded-full px-6 text-base font-semibold text-white flex items-center justify-center",
            isPostcodeValid ? "bg-[#FF004F]" : "bg-[#B8B8BE]"
          )}
        >
          Search
        </button>
      </div>

      {showAddressFields && (
        <div className="space-y-4">
          <TextInput
            value={address1}
            placeholder="Address Line 1"
            onBlur={() => touch("address1")}
            error={address1Error}
            onValueChange={(raw) =>
              setAddress1(
                sanitizeText(raw, { allowComma: false, allowSpace: true, maxLen: 80 })
              )
            }
          />

          <TextInput
            value={address2}
            placeholder="Address Line 2"
            onBlur={() => touch("address2")}
            error={address2Error}
            onValueChange={(raw) =>
              setAddress2(
                sanitizeText(raw, { allowComma: false, allowSpace: true, maxLen: 80 })
              )
            }
          />

          <TextInput
            value={townCity}
            placeholder="Town/City"
            onBlur={() => touch("townCity")}
            error={townCityError}
            onValueChange={(raw) =>
              setTownCity(
                sanitizeText(raw, { allowComma: false, allowSpace: true, maxLen: 60 }).replace(
                  /[0-9]/g,
                  ""
                )
              )
            }
          />

          <TextInput
            value={county}
            placeholder="County"
            onBlur={() => touch("county")}
            error={countyError}
            onValueChange={(raw) =>
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
            className={cn(
              "w-full rounded-full py-3 text-base font-semibold text-white flex items-center justify-center gap-2 transition-colors",
              allAddressValid ? "bg-[#FF004F]" : "bg-gray-300"
            )}
          >
            Next <span className="text-lg leading-none">›</span>
          </button>
        </div>
      )}

      <TrustAndClaimValue />
    </section>
  );
}