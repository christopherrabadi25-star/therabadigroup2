import type { Metadata } from "next";
import FAQ from "@/components/FAQ";
import { BUSINESS, TEAM } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact | The Rabadi Group — La Verne & Claremont CA Realtors",
  description:
    "Contact Ramzi and Christopher Rabadi — La Verne and Claremont's luxury real estate experts. Call or text (626) 203-1372 for a free consultation.",
  openGraph: {
    title: "Contact The Rabadi Group",
    description:
      "Reach The Rabadi Group — Southern California's luxury real estate team. Free home valuations and buyer consultations. (626) 203-1372.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-24 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-5 md:px-10 text-center">
          <span className="eyebrow mb-5">Get In Touch</span>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold text-[#EDE8DC] mb-6 mt-3">
            Let&apos;s Talk Real Estate.
          </h1>
          <p className="text-[#7A7570] text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Call or text us directly. We pick up, we call back, and we give you straight answers — not a sales pitch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href={BUSINESS.phoneHref} className="btn btn-gold btn-lg w-full sm:w-auto">
              <PhoneIcon /> Call (626) 203-1372
            </a>
            <a href={BUSINESS.smsHref} className="btn btn-outline btn-lg w-full sm:w-auto">
              <TextIcon /> Text Us
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Phone / Text", value: BUSINESS.phone, href: BUSINESS.phoneHref, icon: "📞" },
              { label: "Email", value: BUSINESS.email, href: `mailto:${BUSINESS.email}`, icon: "✉️" },
              { label: "Instagram", value: BUSINESS.instagramHandle, href: BUSINESS.instagram, icon: "📸" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Instagram" ? "_blank" : undefined}
                rel={item.label === "Instagram" ? "noopener noreferrer" : undefined}
                className="block p-6 border border-[#1E1E1E] rounded-xl bg-[#0C0C0C] hover:border-[#C4953A]/40 transition-colors text-left"
              >
                <p className="text-2xl mb-3">{item.icon}</p>
                <p className="text-[10px] text-[#555] uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-[#EDE8DC] font-medium text-sm">{item.value}</p>
              </a>
            ))}
          </div>

          {/* What Happens Next */}
          <div className="mt-20">
            <h2 className="text-2xl font-semibold text-[#EDE8DC] mb-8">What Happens Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { step: "01", title: "We Connect", desc: "You call or text. We respond fast — usually within the hour." },
                { step: "02", title: "We Listen", desc: "No pitch, no pressure. We learn your situation and goals first." },
                { step: "03", title: "We Deliver", desc: "Then we go to work with market knowledge and negotiating edge." },
              ].map((item) => (
                <div key={item.step} className="bg-[#0C0C0C] border border-[#1E1E1E] rounded-xl p-6 text-left">
                  <p className="text-3xl font-bold text-[#C4953A]/30 mb-3 serif">{item.step}</p>
                  <h3 className="text-[#EDE8DC] font-semibold mb-2">{item.title}</h3>
                  <p className="text-[#5A5550] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-[#1A1A1A]">
            <p className="text-[#5A5550] text-sm mb-2">Licensed in California</p>
            <div className="space-y-1">
              {TEAM.map((member) => (
                <p key={member.name} className="text-[#3A3A3A] text-xs">
                  {member.name} · {member.dre}
                </p>
              ))}
            </div>
            <p className="text-[#3A3A3A] text-xs mt-1">
              Brokered by {BUSINESS.brokerage} · {BUSINESS.brokerageCity}
            </p>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}
