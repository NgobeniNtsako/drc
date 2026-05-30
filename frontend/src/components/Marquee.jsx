import React from "react";

const LOGOS = [
  "RELIABLE FLEET",
  "TRUSTED SERVICE",
  "LOCAL COMMITMENT",
  "QUALITY SAND",
  "ON-TIME DELIVERY",
  "STRONG PERFORMANCE",
];

export default function Marquee() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <div
      data-testid="marquee"
      className="border-y border-[#193E2A] bg-[#0C2317] py-5 overflow-hidden relative"
    >
      <div className="marquee-track flex gap-14 whitespace-nowrap min-w-[200%]">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-6 text-[#8EA698]">
            <span className="w-2 h-2 bg-[#FFB81C] rotate-45" />
            <span className="font-display text-[17px] tracking-wide">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
