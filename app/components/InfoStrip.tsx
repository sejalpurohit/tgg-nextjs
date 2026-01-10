import Image from "next/image";

type InfoStripProps = {
  text: string;
};

export default function InfoStrip({ text }: InfoStripProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-3 text-sm text-gray-700">
        <Image
          src="/profile-icon.svg"
          alt="Profile icon"
          width={20}
          height={20}
        />
        <span>{text}</span>
      </div>
    </div>
  );
}
