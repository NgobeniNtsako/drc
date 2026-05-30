import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Truck } from "lucide-react";
import { MEDIA, BRAND } from "../data/content";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100vh] w-full overflow-hidden grain"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={MEDIA.hero}
          alt="Heavy machinery on construction site"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 hero-side-overlay md:block hidden" />
      </div>

      {/* Caution stripe top */}
      <div className="absolute top-[68px] left-0 right-0 h-[6px] stripe-yellow opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 pt-40 md:pt-48 pb-20 min-h-[100vh] flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overline mb-6 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-[#FFB81C]" />
          {BRAND.tagline}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          data-testid="hero-title"
          className="font-display font-semibold text-[#F4F7F5] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[0.95] max-w-[1100px]"
        >
          Heavy Machinery
          <br />
          &amp; Sand Supply
          <br />
          <span className="text-[#FFB81C]">for the modern builder.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="mt-8 text-[#8EA698] text-base md:text-lg max-w-[620px] leading-relaxed"
        >
          From riversand and building sand to TLBs, excavators and tipper trucks —
          DRC Plant Hire &amp; Sand delivers dependable plant hire and bulk supply
          across Hlaneki, Giyani and surrounding areas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a href="#contact" data-testid="hero-cta-primary" className="btn-primary">
            Get a Quote <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#fleet" data-testid="hero-cta-secondary" className="btn-ghost">
            <Truck className="w-4 h-4" /> View Fleet
          </a>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#193E2A] border border-[#193E2A] max-w-[1000px]"
        >
          {[
            { k: "4+", v: "Machinery Types" },
            { k: "10+", v: "Delivery Areas" },
            { k: "3", v: "Sand Grades" },
            { k: "100%", v: "Locally Operated" },
          ].map((s) => (
            <div key={s.v} className="bg-[#06130C] px-5 py-6">
              <div className="font-display text-3xl md:text-4xl text-[#FFB81C] font-semibold">
                {s.k}
              </div>
              <div className="overline mt-2 text-[#8EA698]">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
