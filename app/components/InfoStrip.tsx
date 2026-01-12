import Image from "next/image";
import PublicImage from "../../public/icons/profileIcon.svg";

export default function InfoStrip({ text }: { text: string }) {
  return (
    <div className="font-tiktok bg-white border-b border-gray-200 px-4 py-2 text-[14px] text-gray-700 flex items-center gap-2">
      <Image src={PublicImage} alt="" width={16} height={16} />
      {text}
    </div>
  );
}