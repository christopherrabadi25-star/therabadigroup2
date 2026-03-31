"use client";

import { useState } from "react";
import { FAQS, BUSINESS } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-3xl mx-auto px-6">
        <p className="text-[#C8A96A] text-xs tracking-[0.28em] uppercase mb-3">FAQ</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Questions We Actually Get</h2>
        <p className="text-[#777] mb-12">Straight answers. No realtor-speak.</p>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-lg overflow-hidden transition-colors duration-200 ${
                open === i ? "border-[#C8A96A]/40 bg-[#0F0F0F]" : "border-[#1E1E1E] bg-[#0D0D0D] hover:border-[#2A2A2A]"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base text-white font-medium leading-snug">{faq.question}</span>
                <span className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-200 ${
                  open === i ? "border-[#C8A96A] text-[#C8A96A] rotate-45" : "border-[#333] text-[#555]"
                }`}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <div className="h-px bg-[#1E1E1E] mb-4" />
                  <p className="text-[#999] leading-relaxed text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[#555] text-sm mb-4">Still have a question? Just call.</p>
          <a href={BUSINESS.phoneHref} className="btn btn-gold">
            <PhoneIcon /> {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}
