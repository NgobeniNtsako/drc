import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { BRAND } from "../data/content";

export default function StickyCall() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  if (!show) return null;
  return (
    <a
      href={`tel:${BRAND.cell.replace(/\s/g, "")}`}
      data-testid="sticky-call"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#FFB81C] text-[#06130C] inline-flex items-center justify-center pulse-ring shadow-lg hover:bg-[#FFC547] transition-colors"
      aria-label="Call DRC Plant Hire"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
}
