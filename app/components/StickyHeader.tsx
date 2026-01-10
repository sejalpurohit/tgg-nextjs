
"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import InfoStrip from "./InfoStrip";
import { INFO_STRIP_TEXT, DEFAULT_INFO_STRIP } from "../infostripMessages";

export default function StickyHeader() {
  const pathname = usePathname();
  const text = INFO_STRIP_TEXT[pathname] ?? DEFAULT_INFO_STRIP;

  return (
    <>
      <Header />
      <InfoStrip text={text} />
    </>
  );
}