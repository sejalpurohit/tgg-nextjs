"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import TrustAndClaimValue from "./TrustAndClaimValue";

export default function Signature() {
  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const cssWidth = Math.max(1, Math.floor(rect.width));
      const cssHeight = 140;

      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#111827";
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (e: PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(e.pointerId);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const p = getPos(e.nativeEvent);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    setIsDrawing(true);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const p = getPos(e.nativeEvent);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    setHasInk(true);
  };

  const end = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {}
    setIsDrawing(false);
  };

  const resetSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  };

  const canSubmit = useMemo(() => hasInk, [hasInk]);

  const handleSubmit = () => {
    if (!canSubmit) return;
    router.push(ROUTES.THANK_YOU);
  };

  return (
    <section className="px-4 space-y-6">
      <div className="pt-2">
        <h1 className="text-[40px] font-extrabold leading-tight text-gray-900">
          <span className="text-green-500">Great News,</span>{" "}
          <span>David,</span>
          <br />
          we’ve found 3 claims
        </h1>

        <p className="text-[22px] text-gray-800 leading-relaxed mt-4">
          Submit your claim to reveal your lenders and potential compensation amount.
        </p>

        <p className="text-[18px] text-gray-600 leading-relaxed mt-4">
          Use your finger or stylus to{" "}
          <span className="font-bold text-gray-800">
            sign on the dotted line
          </span>{" "}
          below.
        </p>
      </div>

      <div className="space-y-4">
        <div ref={wrapRef}>
          <canvas
            ref={canvasRef}
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={end}
            onPointerCancel={end}
            className="w-full touch-none"
          />
        </div>

        <div className="border-t border-dashed border-gray-700" />

        <div className="flex items-center justify-between">
          <span className="text-[26px] italic text-gray-700">Signature</span>

          <button
            type="button"
            onClick={resetSignature}
            className="bg-gray-700 text-white px-4 py-2 rounded-md text-[16px] flex items-center gap-2"
          >
            ✎ Reset signature
          </button>
        </div>

        <p className="text-[18px] text-gray-700 underline underline-offset-4">
          View our no-win no-fee client agreement (DBA)
        </p>

        <p className="text-[14px] text-gray-700 leading-relaxed">
          By proceeding, you confirm that you have read, understand, and accept
          Courmacs Legal Limited’s Terms and Conditions. I also agree to instruct
          Courmacs Legal Limited to send a data subject access request (DSAR) to
          find out if my PCP or HP agreements were mis-sold By clicking ‘Submit
          My Claim’, I understand that for each claim, I will receive a new
          damages-based agreement for me to review and that my signature above
          will be applied to each document.
        </p>

        <p className="text-center text-[22px] text-gray-900 mt-6">
          Up to{" "}
          <span className="font-extrabold">9 out of 10 car finance agreements</span>{" "}
          are affected*
        </p>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full rounded-xl py-5 text-[26px] font-semibold text-white flex items-center justify-center gap-3 transition-colors ${
            canSubmit ? "bg-[#FF004F]" : "bg-gray-300"
          }`}
        >
          ✓ Submit Claim &amp; Reveal
        </button>
      </div>

      <TrustAndClaimValue />
    </section>
  );
}