"use client";

import { useState } from "react";
import { BUSINESS } from "@/lib/data";
import { MailIcon, PhoneIcon, TextIcon } from "./Icons";

const TOPICS = ["Find out what my home is worth", "Sell my home", "Buy a home", "Commercial or investment", "Something else"];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "fallback"; body: string } | { kind: "error"; msg: string };

export default function ContactPanel({
  heading = "Talk to Ramzi or Christopher",
  intro = "Tell us what you're thinking about. One of us will call or text you back, usually the same day.",
  defaultTopic = TOPICS[0],
  id = "contact",
  as: Heading = "h2",
}: {
  heading?: string;
  intro?: string;
  defaultTopic?: string;
  id?: string;
  as?: "h1" | "h2";
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = {
      name: String(f.get("name") || "").trim(),
      phone: String(f.get("phone") || "").trim(),
      email: String(f.get("email") || "").trim(),
      type: String(f.get("type") || ""),
      message: String(f.get("message") || "").trim(),
    };
    if (!data.name || !data.phone) {
      setStatus({ kind: "error", msg: "Add your name and phone number so we can reach you." });
      return;
    }
    const details = data.message ? ` ${data.message.replace(/[.\s]+$/, "")}.` : "";
    const body = `Hi, this is ${data.name}. Reason: ${data.type}.${details} My number is ${data.phone}.`;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.delivered) setStatus({ kind: "sent" });
      else setStatus({ kind: "fallback", body });
    } catch {
      setStatus({ kind: "fallback", body });
    }
  }

  return (
    <section id={id} className="bg-oak text-paper">
      <div className="wrap section grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Heading className="h-section">{heading}</Heading>
          <p className="lead mt-5 text-sage">{intro}</p>
          <ul className="mt-10 space-y-5 text-[1.05rem]">
            <li>
              <a href={BUSINESS.phoneHref} className="flex items-center gap-3 no-underline hover:text-brass">
                <PhoneIcon /> Call {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a href={BUSINESS.smsHref} className="flex items-center gap-3 no-underline hover:text-brass">
                <TextIcon /> Text {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 no-underline hover:text-brass">
                <MailIcon /> {BUSINESS.email}
              </a>
            </li>
          </ul>
          <p className="mt-10 text-sage text-[0.95rem]">
            {BUSINESS.brokerage}
            <br />
            {BUSINESS.address.full}
          </p>
        </div>

        <div className="rounded-[18px] bg-paper p-6 text-ink md:p-9">
          {status.kind === "sent" ? (
            <div role="status" className="py-10">
              <p className="font-serif text-[2rem] leading-tight">Message sent.</p>
              <p className="mt-3 text-ink-soft">
                Ramzi or Christopher will get back to you soon. If it&apos;s urgent, call {BUSINESS.phone}.
              </p>
            </div>
          ) : status.kind === "fallback" ? (
            <div role="status" className="py-4">
              <p className="font-serif text-[1.8rem] leading-tight">One more tap to send</p>
              <p className="mt-3 text-ink-soft">
                Send your note as a text or email and it goes straight to Ramzi&apos;s phone.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a href={`${BUSINESS.smsHref}?&body=${encodeURIComponent(status.body)}`} className="btn btn-oak">
                  <TextIcon /> Send as text
                </a>
                <a
                  href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent("Website inquiry")}&body=${encodeURIComponent(status.body)}`}
                  className="btn btn-line"
                >
                  <MailIcon /> Send as email
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5">
              <label className="field">
                <span>What can we help with?</span>
                <select name="type" defaultValue={defaultTopic}>
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="field">
                  <span>Name</span>
                  <input name="name" autoComplete="name" required />
                </label>
                <label className="field">
                  <span>Phone</span>
                  <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
                </label>
              </div>
              <label className="field">
                <span>
                  Email <em className="font-normal not-italic text-ink-soft">(optional)</em>
                </span>
                <input name="email" type="email" autoComplete="email" />
              </label>
              <label className="field">
                <span>
                  Address or details <em className="font-normal not-italic text-ink-soft">(optional)</em>
                </span>
                <textarea name="message" rows={3} />
              </label>
              {status.kind === "error" && (
                <p role="alert" className="text-[#9b2c1f] font-semibold">
                  {status.msg}
                </p>
              )}
              <button type="submit" className="btn btn-oak w-full" disabled={status.kind === "sending"}>
                {status.kind === "sending" ? "Sending..." : "Send to Ramzi and Christopher"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
