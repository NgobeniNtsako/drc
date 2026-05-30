import React, { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { BRAND } from "../data/content";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Fleet", href: "#fleet" },
  { label: "Sand", href: "#sand" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[#06130C]/85 border-b border-[#193E2A]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-3 group">
          <span className="logo-mark">D</span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-logo text-[15px] tracking-wider text-[#F4F7F5]">
              DRC PLANT HIRE
            </span>
            <span className="overline mt-[2px] text-[10px]">&amp; SAND (PTY) LTD</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-[13px] font-medium tracking-wide text-[#F4F7F5]/85 hover:text-[#FFB81C] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${BRAND.cell.replace(/\s/g, "")}`}
            data-testid="nav-call"
            className="hidden lg:inline-flex items-center gap-2 text-[12px] text-[#8EA698] hover:text-[#FFB81C] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {BRAND.cell}
          </a>
          <a href="#contact" data-testid="nav-cta-quote" className="btn-primary !py-3 !px-5 !text-[12px]">
            Get a Quote
          </a>
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 inline-flex items-center justify-center border border-[#193E2A] text-[#F4F7F5]"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden bg-[#06130C] border-b border-[#193E2A]"
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 text-[14px] text-[#F4F7F5]/90 hover:text-[#FFB81C] border-b border-[#193E2A]/60"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
