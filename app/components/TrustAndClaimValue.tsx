import Image from "next/image";

import TrustPilot from "../../public/trustpilot.svg";
import SecureSSL from "../../public/secure-ssl.svg";

export default function TrustAndClaimValue() {
  return (
    <div className="space-y-3">
      <div className="flex justify-center items-center gap-8 pt-6">
        <Image src={TrustPilot} alt="TrustPilot" width={140} height={40} />
        <Image src={SecureSSL} alt="Secure SSL Encryption" width={160} height={40} />
      </div>

      <div className="text-center">
        <p className="text-[28px] font-normal">
          Average claim value:{" "}
          <span className="font-extrabold">£5,318.25</span>* per vehicle
        </p>
      </div>
      <div className="h-px bg-gray-300" />

    </div>
  );
}