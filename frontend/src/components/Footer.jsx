import React from "react";
import { BRAND } from "../data/content";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="border-t border-[#193E2A] bg-[#06130C]">
      <div className="section-divider" />
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-14 grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="logo-img">
              <img src={BRAND.logo} alt="DRC Plant Hire & Sand logo" />
            </span>
            <span className="font-logo text-[16px] tracking-wider text-[#F4F7F5]">
              DRC PLANT HIRE &amp; SAND
            </span>
          </div>
          <p className="mt-5 text-[#8EA698] text-sm max-w-[420px] leading-relaxed">
            {BRAND.tagline} — Reliable plant hire and sand supply for Hlaneki,
            Giyani and surrounding areas.
          </p>
        </div>

        <div>
          <div className="overline mb-4">Quick Links</div>
          <ul className="space-y-2.5 text-sm">
            {[
              ["About", "#about"],
              ["Fleet", "#fleet"],
              ["Sand", "#sand"],
              ["Pricing", "#pricing"],
              ["Contact", "#contact"],
            ].map(([l, h]) => (
              <li key={h}>
                <a
                  href={h}
                  className="text-[#F4F7F5]/80 hover:text-[#FFB81C] transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="overline mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-[#F4F7F5]/85">
            <li>Tel: {BRAND.phone}</li>
            <li>Cell: {BRAND.cell}</li>
            <li>Fax: {BRAND.fax}</li>
            <li className="break-all">Email: {BRAND.email}</li>
            <li className="text-[#8EA698] mt-2">{BRAND.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#193E2A]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-[#8EA698]">
          <div>
            © {new Date().getFullYear()} {BRAND.legal}. All rights reserved.
          </div>
          <div className="overline">{BRAND.tagline}</div>
        </div>
      </div>
    </footer>
  );
}
