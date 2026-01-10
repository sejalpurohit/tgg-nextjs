
export default function InfoStrip({ text }: { text: string }) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 text-[14px] text-gray-700">
      {text}
    </div>
  );
}