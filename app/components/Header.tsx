import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-black">
      <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
        <Image
          src="/icons/pcppal-logo.svg"
          alt="PCP Pal"
          width={100}
          height={28}
          priority
        />

        <Image
          src="/icons/trustpilot-ssl.svg"
          alt="Trustpilot secured"
          width={140}
          height={28}
        />
      </div>
    </header>
  );
}