import React from "react";
import { motion } from "framer-motion";
import { TRUST_PILLARS } from "../data/content";

export default function WhyUs() {
  return (
    <section
      id="why"
      data-testid="why-section"
      className="relative py-24 md:py-32 border-b border-[#193E2A]"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="max-w-[820px]">
          <div className="overline">Why Choose DRC</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-[#F4F7F5] mt-4 leading-[1]">
            Built on three things we never <span className="text-[#FFB81C]">compromise on.</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-[#193E2A] border border-[#193E2A]">
          {TRUST_PILLARS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              data-testid={`why-pillar-${p.n}`}
              className="bg-[#06130C] p-8 md:p-10 relative overflow-hidden trust-badge"
            >
              <div className="outline-number absolute top-2 right-5 text-[150px] md:text-[180px] select-none pointer-events-none">
                {p.n}
              </div>
              <div className="relative">
                <div className="overline text-[#FFB81C]">{p.title}</div>
                <h3 className="font-display text-2xl md:text-3xl text-[#F4F7F5] font-semibold mt-3 leading-tight">
                  {p.sub}
                </h3>
                <p className="text-[#8EA698] mt-5 text-[14.5px] leading-relaxed max-w-[320px]">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
