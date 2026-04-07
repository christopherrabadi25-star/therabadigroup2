"use client";
import { useState } from "react";
import Image from "next/image";
import { TEAM, BUSINESS } from "@/lib/data";

const initials: Record<string, string> = {
  "Ramzi Rabadi": "RR",
  "Christopher Rabadi": "CR",
};

function MemberPhoto({ src, name, title }: { src: string; name: string; title: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0C0C0C]">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-[#C4953A]/8 border border-[#C4953A]/20 flex items-center justify-center mx-auto mb-3">
            <span className="text-[#C4953A] text-2xl font-bold serif">{initials[name]}</span>
          </div>
          <p className="text-[#2A2824] text-[9px] font-mono tracking-wider uppercase">Add Photo</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <Image
        src={src}
        alt={`${name} — ${title}`}
        fill
        className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        sizes="208px"
        onError={() => setFailed(true)}
      />
      {/* Gradient side fade so photo blends into card body */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/70 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-[#0E0E0E]/60" />
    </>
  );
}

export default function TeamSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "#080808" }}>

      {/* Ambient */}
      <div className="absolute top-0 left-0 right-0 rule-gold" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div className="mb-14">
          <span className="eyebrow mb-4">The Team</span>
          <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-semibold text-[#EDE8DC] mb-4 max-w-2xl">
            The SGV Team That Actually<br />Knows the Area.
          </h2>
          <p className="text-[#4A4844] text-base max-w-lg">
            Two generations. All price ranges. Nobody knows La Verne, Claremont, and the surrounding Foothill Cities like we do.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-[#1C1C1C] bg-[#0C0C0C] hover:border-[#C4953A]/25 transition-all duration-400"
              style={{
                animation: `fadeUp 0.6s ease both ${0.12 * i}s`,
                boxShadow: "0 4px 40px rgba(0,0,0,0.4)",
              }}
            >
              {/* Gold top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C4953A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex flex-col sm:flex-row">

                {/* Photo */}
                <div className="relative sm:w-52 shrink-0 overflow-hidden">
                  <div className="aspect-[3/4] sm:aspect-auto sm:h-full relative">
                    <MemberPhoto src={member.image} name={member.name} title={member.title} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <span className="eyebrow text-[0.62rem] mb-2">{member.title}</span>
                    <h3 className="text-[1.5rem] font-semibold text-[#EDE8DC] serif mb-1">{member.name}</h3>
                    <p className="text-[#2A2824] text-xs tracking-wider mb-5">{member.dre}</p>

                    {/* Stats bar */}
                    <div className="flex gap-6 py-4 border-y border-[#191919] mb-5">
                      {member.stats.map((s, j) => (
                        <div key={j}>
                          <p className="text-[1.25rem] font-bold text-[#C4953A] serif leading-none">{s.value}</p>
                          <p className="text-[0.65rem] text-[#3A3834] uppercase tracking-widest mt-1">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-[#5A5550] text-sm leading-relaxed line-clamp-5">{member.bio}</p>
                  </div>

                  <div className="mt-6">
                    {/* Specialty pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {member.specialties.slice(0, 4).map((s, j) => (
                        <span
                          key={j}
                          className="text-[0.67rem] text-[#4A4844] border border-[#1E1E1E] px-2.5 py-1 rounded-full tracking-wide"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <a href={BUSINESS.phoneHref} className="btn btn-gold btn-sm">
                      Work With Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Local expertise banner */}
        <div className="mt-6 p-7 md:p-8 rounded-xl border border-[#1A1A1A] bg-[#090909] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <span className="eyebrow text-[0.62rem] mb-3">Local Expertise</span>
            <p className="text-[#EDE8DC] font-semibold text-lg serif mb-1.5 mt-1">
              La Verne, Claremont &amp; the SGV — Block by Block
            </p>
            <p className="text-[#4A4844] text-sm max-w-2xl leading-relaxed">
              Ramzi and Christopher Rabadi grew up here and have been doing deals in the Foothill Cities corridor for over 20 years. All price ranges, all property types — residential, commercial, investment.
            </p>
          </div>
          <a href="/about" className="btn btn-outline btn-sm shrink-0">
            Full Story →
          </a>
        </div>
      </div>
    </section>
  );
}
