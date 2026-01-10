// app/components/FAQAccordion.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTES } from "../routes";
import SearchButton from "../../public/searchButton.svg";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How do I determine if I qualify for compensation?",
    answer:
      "If you've had a finance agreement like PCP or HP before 2021, you may be eligible for compensation due to mis-selling. Check your eligibility by filling out our online form.",
  },
  {
    question: "What criteria must I meet to make a claim?",
    answer:
      "Your lender must have failed to disclose commission details on your agreement(s). If your finance details were inadequately explained or you faced higher interest rates due to commissions, you could be eligible for £1,000s.",
  },
  {
    question: "Does the type of agreement matter (PCP vs. HP)?",
    answer:
      "No. If you had an HP loan instead of a PCP agreement, we still accept claims for various vehicle finance agreements.",
  },
];

export default function FAQAccordion() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 pt-0 pb-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>

      <div className="divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="py-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full cursor-pointer font-medium text-gray-900 flex items-center text-left gap-3"
            >
              <span className="text-xl flex-shrink-0">
                {openIndex === index ? "−" : "+"}
              </span>
              {faq.question}
            </button>

            {openIndex === index && (
              <p className="mt-3 text-sm text-gray-600 leading-relaxed pl-6">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="pt-6 pb-2">
        <button
          onClick={() => router.push(ROUTES.CURRENT_ADDRESS)}
          className="w-full flex justify-center active:scale-[0.98] transition"
        >
          <Image
            src={SearchButton}
            alt="Find My Agreements"
            width={360}
            height={72}
          />
        </button>
      </div>
    </section>
  );
}