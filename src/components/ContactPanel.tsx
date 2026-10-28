"use client";

import { useState } from "react";
import Image from "next/image";
import { BUSINESS, TEAM } from "@/lib/data";
import { MailIcon, TextIcon } from "./Icons";
import { Reveal } from "./Motion";
import { getIds } from "./Tracker";

const TOPICS = ["A value for my home", "Selling my home", "Buying a home", "Commercial or investment", "Something else"];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "fallback"; body: string } | { kind: "error"; msg: string };

export default function ContactPanel({
  heading = "Talk to us",
  intro = "Ramzi or Christopher will get back to you, usually the same day.",
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
      vid: (() => {
        try {
          return getIds().vid;
        } catch {
          return "";
        }
      })(),
      page: location.pathname,
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
    <section id={id} className="section bg-coal text-ivory">
      <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24 [&>*]:min-w-0">
        <div>
          <Reveal>
            <Heading className="h-section max-w-[12ch]">{heading}</Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-6 text-ivory/75">{intro}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {TEAM.map((m) => (
                <li key={m.name} className="flex items-center gap-4">
                  <div className="relative h-[92px] w-[72px] shrink-0 overflow-hidden rounded-[12px] bg-ash">
                    <Image src={m.image} alt={m.name} fill sizes="72px" className="object-cover object-top" />
                  </div>
                  <div>
                    <p className="font-display text-[1.25rem] leading-tight">{m.name}</p>
                    <p className="mt-1 text-[0.82rem] text-ivory/75">{m.dre}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 space-y-2">
              <a href={BUSINESS.phoneHref} className="block text-[2rem] font-semibold leading-tight tracking-[-0.02em] no-underline hover:text-champagne">
                {BUSINESS.phone}
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="block text-ivory/75 no-underline hover:text-ivory">
                {BUSINESS.email}
              </a>
              <p className="pt-4 text-[0.92rem] text-ivory/70">
                {BUSINESS.brokerage}, {BUSINESS.address.full}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-[24px] border border-ivory/10 bg-onyx/60 p-6 md:p-10">
            {status.kind === "sent" ? (
              <div role="status" className="py-12">
                <p className="font-display text-[2.2rem] leading-tight">Message sent.</p>
                <p className="mt-4 text-ivory/75">
                  Your message is with Ramzi and Christopher. If it&apos;s urgent, call {BUSINESS.phone}.
                </p>
              </div>
            ) : status.kind === "fallback" ? (
              <div role="status" className="py-6">
                <p className="font-display text-[2rem] leading-tight">One more step</p>
                <p className="mt-4 text-ivory/75">Send your note as a text or email and it goes straight to Ramzi&apos;s phone.</p>
                <div className="mt-8 grid gap-3">
                  <a href={`${BUSINESS.smsHref}?&body=${encodeURIComponent(status.body)}`} className="btn btn-light">
                    <TextIcon size={16} /> Send as a text
                  </a>
                  <a
                    href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent("Website inquiry")}&body=${encodeURIComponent(status.body)}`}
                    className="btn btn-glass"
                  >
                    <MailIcon size={16} /> Send as an email
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid min-w-0 gap-8 [&>*]:min-w-0">
                <label className="field">
                  <span>What can we help with?</span>
                  <select name="type" defaultValue={defaultTopic}>
                    {TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <div className="grid gap-8 sm:grid-cols-2 [&>*]:min-w-0">
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
                  <span>Email (optional)</span>
                  <input name="email" type="email" autoComplete="email" />
                </label>
                <label className="field">
                  <span>Address or details (optional)</span>
                  <textarea name="message" rows={2} />
                </label>
                {status.kind === "error" && (
                  <p role="alert" className="text-[#e3a28f]">
                    {status.msg}
                  </p>
                )}
                <button type="submit" className="btn btn-light mt-2 w-full" disabled={status.kind === "sending"}>
                  {status.kind === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
