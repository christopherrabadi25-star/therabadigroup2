import type { Metadata } from "next";
import ContactPanel from "@/components/ContactPanel";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call or text Ramzi and Christopher Rabadi at (626) 203-1372, or send a message. Agency 8 Real Estate Group, 940 W Foothill Blvd, Claremont, CA.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ContactPanel as="h1" heading="Contact us" intro="Call, text, or send a message. Ramzi or Christopher answers, usually the same day." />
      <FAQ />
    </>
  );
}
