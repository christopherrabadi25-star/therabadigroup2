type P = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function PhoneIcon({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z" />
    </svg>
  );
}

export function TextIcon({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.4-5.1A8.5 8.5 0 1 1 21 12z" />
    </svg>
  );
}

export function HomeValueIcon({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9v11h14V9" />
      <path d="M12 12v5M10 13.5c0-.8.9-1.5 2-1.5s2 .7 2 1.5-.9 1.2-2 1.5-2 .7-2 1.5.9 1.5 2 1.5 2-.7 2-1.5" />
    </svg>
  );
}

export function MenuIcon({ size = 22, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function CloseIcon({ size = 22, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MailIcon({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}
