import React from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { SAND_PRODUCTS, MEDIA } from "../data/content";

export default function Sand() {
  return (
    <section
      id="sand"
      data-testid="sand-section"
      className="relative py-24 md:py-32 border-b border-[#193E2A] bg-[#0A1C12]"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <div className="relative h-[420px] md:h-[520px] overflow-hidden border border-[#193E2A] bento-tile">
          <img
            src={MEDIA.sand}
            alt="Macro shot of building sand"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#06130C] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="overline mb-2">Bulk Supply</div>
            <div className="font-display text-3xl md:text-4xl text-[#F4F7F5] font-semibold">
              Riversand · Building · Filling
            </div>
          </div>
        </div>

        <div>
          <div className="overline">Sand Products</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-[#F4F7F5] mt-4 leading-[0.98]">
            The right sand. <br />
            <span className="text-[#FFB81C]">For the right job.</span>
          </h2>
          <p className="mt-6 text-[#8EA698] text-[15px] max-w-[480px] leading-relaxed">
            Three sand grades, delivered by tipper to your site. Pricing per load
            varies by delivery area — see the pricing table below.
          </p>

          <div className="mt-10 divide-y divide-[#193E2A] border border-[#193E2A]">
            {SAND_PRODUCTS.map((p, i) => (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                data-testid={`sand-product-${p.key}`}
                className="flex items-start gap-5 p-5 md:p-6 hover:bg-[#123020] transition-colors"
              >
                <div className="w-10 h-10 shrink-0 bg-[#FFB81C] text-[#06130C] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-xl text-[#F4F7F5] font-semibold">
                    {p.title}
                  </div>
                  <p className="text-[#8EA698] text-sm mt-1.5 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
