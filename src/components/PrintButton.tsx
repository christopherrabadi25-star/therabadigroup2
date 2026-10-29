"use client";

export default function PrintButton({ className = "btn btn-glass", label = "Print or save as PDF" }: { className?: string; label?: string }) {
  return (
    <button type="button" className={`${className} no-print`} onClick={() => window.print()}>
      {label}
    </button>
  );
}
