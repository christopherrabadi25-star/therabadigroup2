import Link from "next/link";

const tabs = [
  { label: "Buy a Home", href: "/buyers", icon: "🏠" },
  { label: "Sell a Home", href: "/sellers", icon: "📈" },
  { label: "Commercial & Investment", href: "/commercial", icon: "🏢" },
];

export default function ServiceTabs({ active }: { active: "buyers" | "sellers" | "commercial" }) {
  return (
    <div className="bg-[#0A0A0A] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex overflow-x-auto scrollbar-hide gap-0 -mb-px">
          {tabs.map((tab) => {
            const key = tab.href.replace("/", "") as typeof active;
            const isActive = key === active;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors duration-200 ${
                  isActive
                    ? "border-[#C4953A] text-[#C4953A]"
                    : "border-transparent text-[#5A5550] hover:text-[#9A9690] hover:border-[#3A3834]"
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
