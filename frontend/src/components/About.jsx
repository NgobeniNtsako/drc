import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Handshake, Hammer } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-24 md:py-32 border-b border-[#193E2A]"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-24">
        <div>
          <div className="overline">About DRC</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-[#F4F7F5] mt-5 leading-[1]">
            Reliable machines. <span className="text-[#FFB81C]">Trusted service.</span>
          </h2>
          <div className="mt-8 inline-flex items-center gap-3">
            <span className="h-px w-12 bg-[#FFB81C]" />
            <span className="overline">Family-run · Locally rooted</span>
          </div>
        </div>

        <div className="space-y-6 text-[#8EA698] text-base md:text-[17px] leading-relaxed">
          <p>
            At DRC Plant Hire &amp; Sand, our work begins where every great
            project does — with solid ground beneath your feet. We supply quality
            riversand, building sand and filling sand, and operate a dependable
            yellow-machinery fleet across Hlaneki, Giyani and surrounding villages.
          </p>
          <p>
            From a single load of building sand to a multi-machine site
            mobilisation, our team is committed to fair pricing, honest
            communication and getting the job done — on time, every time.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid sm:grid-cols-3 gap-px bg-[#193E2A] border border-[#193E2A] mt-10"
          >
            {[
              { icon: ShieldCheck, t: "Reliable Machines" },
              { icon: Handshake, t: "Trusted Service" },
              { icon: Hammer, t: "Built for You" },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.t}
                  className="bg-[#06130C] p-5 flex items-center gap-3"
                >
                  <Icon className="w-5 h-5 text-[#FFB81C]" />
                  <span className="text-[#F4F7F5] font-medium text-sm tracking-wide">
                    {b.t}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
