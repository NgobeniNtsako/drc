import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { PRICING } from "../data/content";

export default function Pricing() {
  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="relative py-24 md:py-32 border-b border-[#193E2A] bg-[#0A1C12]"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid lg:grid-cols-[0.9fr_1.4fr] gap-14 lg:gap-20">
        <div>
          <div className="overline">Sand Pricing</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-[#F4F7F5] mt-4 leading-[1]">
            Transparent rates by <span className="text-[#FFB81C]">delivery area.</span>
          </h2>
          <p className="text-[#8EA698] mt-6 text-[15px] max-w-[420px] leading-relaxed">
            Prices effective <span className="text-[#F4F7F5] font-medium">1 May 2026</span> for
            riversand, building sand and filling sand. Per load, delivered.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 border border-[#193E2A] px-4 py-2.5">
            <span className="w-2 h-2 bg-[#FFB81C]" />
            <span className="overline">Hlaneki · Giyani · Surrounding villages</span>
          </div>
        </div>

        <div className="border border-[#193E2A]">
          <div className="grid grid-cols-[1fr_auto] bg-[#0C2317] border-b border-[#193E2A] px-5 md:px-7 py-4">
            <div className="overline">Delivery Area</div>
            <div className="overline text-right">Price / Load</div>
          </div>
          {PRICING.map((row, i) => (
            <motion.div
              key={row.area}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              data-testid={`pricing-row-${i}`}
              className="price-row grid grid-cols-[1fr_auto] items-center px-5 md:px-7 py-5 border-b border-[#193E2A] last:border-b-0"
            >
              <div className="flex items-start gap-3 min-w-0">
                <MapPin className="w-4 h-4 text-[#FFB81C] mt-1 shrink-0" />
                <span className="text-[#F4F7F5] text-[15px] md:text-[16px]">
                  {row.area}
                </span>
              </div>
              <div className="price-amount font-display text-2xl md:text-3xl font-semibold text-[#F4F7F5] tracking-tight transition-colors">
                {row.amount}
              </div>
            </motion.div>
          ))}
          <div className="px-5 md:px-7 py-4 bg-[#0C2317] border-t border-[#193E2A] text-[12px] text-[#8EA698]">
            Prices may be adjusted based on volume, distance and fuel. Contact us for custom quotes.
          </div>
        </div>
      </div>
    </section>
  );
}
