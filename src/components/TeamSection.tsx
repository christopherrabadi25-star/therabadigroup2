import Image from "next/image";
import { TEAM, BUSINESS } from "@/lib/data";

export default function TeamSection() {
  return (
    <section className="py-20 md:py-28 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="mb-14">
          <span className="eyebrow mb-3">The Team</span>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-semibold text-[#EDE8DC] mb-3 max-w-2xl">
            The SGV &amp; Foothill Cities Team That Actually Knows the Area.
          </h2>
          <p className="text-[#5A5550] text-base max-w-xl">
            Two generations. All price ranges. Nobody knows La Verne, Claremont, and the surrounding cities like we do.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="card group"
              style={{ animation: `fadeUp 0.5s ease both ${0.1 * i}s` }}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative sm:w-52 shrink-0 overflow-hidden">
                  <div className="aspect-[3/4] sm:aspect-auto sm:h-full relative">
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.title}`}
                      fill
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="208px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/60 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-[#0E0E0E]/50" />
                  </div>
                </div>
                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <span className="eyebrow mb-2">{member.title}</span>
                    <h3 className="text-2xl font-semibold text-[#EDE8DC] serif mb-0.5">{member.name}</h3>
                    <p className="text-[#2A2824] text-xs mb-5">{member.dre}</p>
                    <div className="flex gap-5 py-4 border-y border-[#1E1E1E] mb-5">
                      {member.stats.map((s, j) => (
                        <div key={j}>
                          <p className="text-lg font-bold text-[#C4953A] serif">{s.value}</p>
                          <p className="text-[10px] text-[#4A4844] uppercase tracking-wider">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-[#7A7570] text-sm leading-relaxed line-clamp-5">{member.bio}</p>
                  </div>
                  <div className="mt-5">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {member.specialties.slice(0, 4).map((s, j) => (
                        <span key={j} className="text-[11px] text-[#5A5550] border border-[#1E1E1E] px-2.5 py-1 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                    <a href={BUSINESS.phoneHref} className="btn btn-gold btn-sm">
                      Work with Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 md:p-8 border border-[#1E1E1E] rounded-xl bg-[#0C0C0C] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="eyebrow mb-2">Local Expertise</span>
            <p className="text-[#EDE8DC] font-semibold text-lg mb-1 mt-1">La Verne, Claremont &amp; the SGV — We Know It Block by Block</p>
            <p className="text-[#5A5550] text-sm max-w-2xl">
              Ramzi and Christopher Rabadi grew up here and have been doing deals in the Foothill Cities corridor for over 20 years. All price ranges, all property types — residential, commercial, investment.
            </p>
          </div>
          <a href="/about" className="btn btn-outline btn-sm shrink-0">Full Story →</a>
        </div>
      </div>
    </section>
  );
}
