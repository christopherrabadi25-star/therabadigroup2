import type { Metadata } from "next";
import ContactPanel from "@/components/ContactPanel";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call or text Ramzi and Christopher Rabadi at (626) 203-1372, or send a private inquiry. Agency 8 Real Estate Group, 940 W Foothill Blvd, Claremont, CA.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <div className="h-[var(--header-h)] bg-coal" aria-hidden />
      <ContactPanel as="h1" heading="Begin a private conversation" />
      <FAQ />
    </>
  );
}
