import Image from "next/image";
import pcppalLogo from '../../public/pcppal-logo.svg';
import trustPiloTSSL from '../../public/trustpilot-ssl.svg'


export default function Header() {
  return (
    <header className="bg-black px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
       <Image src={pcppalLogo} alt="PCP Pal Logo" width={100} height={28} />
         <Image src={trustPiloTSSL} alt="Trust Pilot" width={140} height={28} className="text-white" />
      </div>
     
    </header>
  );
}
