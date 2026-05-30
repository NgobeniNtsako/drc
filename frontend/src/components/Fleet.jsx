import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FLEET } from "../data/content";

export default function Fleet() {
  return (
    <section
      id="fleet"
      data-testid="fleet-section"
      className="relative py-24 md:py-32 border-b border-[#193E2A]"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="overline">Our Fleet</div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-[#F4F7F5] mt-4 leading-[0.98] max-w-[760px]">
              Yellow machinery, ready to <span className="text-[#FFB81C]">move ground.</span>
            </h2>
          </div>
          <p className="text-[#8EA698] max-w-[420px] text-[15px]">
            A maintained line-up of TLBs, excavators, tipper trucks and skid-steer
            loaders. Hire by the day, the week, or the project.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          {FLEET.map((f, i) => {
            // Layout: TLB big (cols 1-4), Excavator (cols 5-6), Tipper (cols 1-3), Skid (cols 4-6)
            const span =
              i === 0
                ? "md:col-span-4 md:row-span-2"
                : i === 1
                ? "md:col-span-2"
                : i === 2
                ? "md:col-span-2"
                : "md:col-span-2";
            const heightClass = i === 0 ? "min-h-[460px]" : "min-h-[280px]";
            return (
              <motion.article
                key={f.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                data-testid={`fleet-card-${f.key}`}
                className={`bento-tile ${span} ${heightClass} group relative`}
              >
                <img
                  src={f.img}
                  alt={f.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06130C] via-[#06130C]/55 to-transparent" />
                <div className="relative h-full p-6 md:p-7 flex flex-col justify-end">
                  <div className="overline mb-2 text-[#FFB81C]">Plant Hire</div>
                  <h3 className="font-display text-2xl md:text-3xl text-[#F4F7F5] font-semibold leading-tight">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[#cbd3cd] text-[14px] max-w-[480px]">
                    {f.blurb}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {f.specs.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] tracking-wider uppercase text-[#F4F7F5] border border-[#FFB81C]/40 px-2.5 py-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-2 text-[12px] tracking-wider uppercase text-[#FFB81C] hover:text-[#FFC547] transition-colors"
                  >
                    Request this machine <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
