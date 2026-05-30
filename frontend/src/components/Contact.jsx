import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Printer, Send, Loader2 } from "lucide-react";
import { BRAND, FLEET, SAND_PRODUCTS } from "../data/content";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SERVICE_OPTIONS = [
  ...SAND_PRODUCTS.map((p) => p.title),
  ...FLEET.map((f) => f.title),
  "Other / Custom Request",
];

const initial = {
  name: "",
  phone: "",
  email: "",
  service: SERVICE_OPTIONS[0],
  location: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your name";
    if (!form.phone.trim() || form.phone.trim().length < 6) e.phone = "Please enter a valid phone number";
    if (!form.service.trim()) e.service = "Select a service";
    if (!form.location.trim()) e.location = "Please enter your location / area";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = { ...form };
      if (!payload.email) delete payload.email;
      await axios.post(`${API}/quote`, payload);
      toast.success("Quote request sent — we'll be in touch shortly.", {
        description: `Thanks ${form.name.split(" ")[0]}, our team will reach out via phone or email.`,
      });
      setForm(initial);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try calling us directly.";
      toast.error("Could not send request", { description: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid lg:grid-cols-[0.95fr_1.15fr] gap-12 lg:gap-20">
        {/* Left: Info */}
        <div>
          <div className="overline">Get In Touch</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-[#F4F7F5] mt-4 leading-[1]">
            Let&apos;s build it. <br />
            <span className="text-[#FFB81C]">Together.</span>
          </h2>
          <p className="mt-6 text-[#8EA698] text-[15px] max-w-[440px] leading-relaxed">
            Request a quote for plant hire or sand delivery. We typically respond
            within one business day. For urgent jobs, please phone us directly.
          </p>

          <div className="mt-10 border border-[#193E2A] divide-y divide-[#193E2A]">
            <a
              href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
              data-testid="contact-tel"
              className="flex items-center gap-4 p-5 hover:bg-[#123020] transition-colors"
            >
              <Phone className="w-5 h-5 text-[#FFB81C] shrink-0" />
              <div>
                <div className="overline text-[#8EA698]">Tel</div>
                <div className="text-[#F4F7F5] font-medium">{BRAND.phone}</div>
              </div>
            </a>
            <a
              href={`tel:${BRAND.cell.replace(/\s/g, "")}`}
              data-testid="contact-cell"
              className="flex items-center gap-4 p-5 hover:bg-[#123020] transition-colors"
            >
              <Phone className="w-5 h-5 text-[#FFB81C] shrink-0" />
              <div>
                <div className="overline text-[#8EA698]">Cell</div>
                <div className="text-[#F4F7F5] font-medium">{BRAND.cell}</div>
              </div>
            </a>
            <div className="flex items-center gap-4 p-5">
              <Printer className="w-5 h-5 text-[#FFB81C] shrink-0" />
              <div>
                <div className="overline text-[#8EA698]">Fax</div>
                <div className="text-[#F4F7F5] font-medium">{BRAND.fax}</div>
              </div>
            </div>
            <a
              href={`mailto:${BRAND.email}`}
              data-testid="contact-email"
              className="flex items-center gap-4 p-5 hover:bg-[#123020] transition-colors"
            >
              <Mail className="w-5 h-5 text-[#FFB81C] shrink-0" />
              <div>
                <div className="overline text-[#8EA698]">Email</div>
                <div className="text-[#F4F7F5] font-medium break-all">{BRAND.email}</div>
              </div>
            </a>
            <div className="flex items-start gap-4 p-5">
              <MapPin className="w-5 h-5 text-[#FFB81C] shrink-0 mt-0.5" />
              <div>
                <div className="overline text-[#8EA698]">Address</div>
                <div className="text-[#F4F7F5] font-medium leading-relaxed">
                  {BRAND.address}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-6 border border-[#193E2A] overflow-hidden h-[230px]">
            <iframe
              title="DRC Plant Hire location"
              src="https://maps.google.com/maps?q=Hlaneki%20Giyani&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              style={{ filter: "grayscale(0.6) contrast(1.1) invert(0.9) hue-rotate(180deg)" }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: Form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onSubmit={onSubmit}
          data-testid="quote-form"
          className="bg-[#0C2317] border border-[#193E2A] p-6 md:p-10 relative"
        >
          <div className="absolute -top-px left-0 w-24 h-[3px] bg-[#FFB81C]" />
          <div className="overline">Request a Quote</div>
          <h3 className="font-display text-2xl md:text-3xl text-[#F4F7F5] font-semibold mt-3">
            Tell us about your project
          </h3>

          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <div>
              <label className="overline block mb-2">Full Name *</label>
              <input
                data-testid="quote-input-name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={`industrial-input ${errors.name ? "error" : ""}`}
                placeholder="e.g. Thabo Mbewu"
                autoComplete="name"
              />
              {errors.name && (
                <div className="text-[#ff8a8a] text-xs mt-1.5">{errors.name}</div>
              )}
            </div>
            <div>
              <label className="overline block mb-2">Phone *</label>
              <input
                data-testid="quote-input-phone"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={`industrial-input ${errors.phone ? "error" : ""}`}
                placeholder="084 000 0000"
                autoComplete="tel"
                inputMode="tel"
              />
              {errors.phone && (
                <div className="text-[#ff8a8a] text-xs mt-1.5">{errors.phone}</div>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="overline block mb-2">Email (optional)</label>
              <input
                data-testid="quote-input-email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={`industrial-input ${errors.email ? "error" : ""}`}
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
              />
              {errors.email && (
                <div className="text-[#ff8a8a] text-xs mt-1.5">{errors.email}</div>
              )}
            </div>
            <div>
              <label className="overline block mb-2">Service Needed *</label>
              <select
                data-testid="quote-input-service"
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                className={`industrial-input ${errors.service ? "error" : ""}`}
              >
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s} style={{ background: "#06130C" }}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && (
                <div className="text-[#ff8a8a] text-xs mt-1.5">{errors.service}</div>
              )}
            </div>
            <div>
              <label className="overline block mb-2">Location / Area *</label>
              <input
                data-testid="quote-input-location"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className={`industrial-input ${errors.location ? "error" : ""}`}
                placeholder="e.g. Hlaneki, Babangu, Mavhuza..."
              />
              {errors.location && (
                <div className="text-[#ff8a8a] text-xs mt-1.5">{errors.location}</div>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="overline block mb-2">Project Details</label>
              <textarea
                data-testid="quote-input-message"
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="industrial-input resize-none"
                placeholder="Quantity, dates, site access — anything that helps us quote accurately."
              />
            </div>
          </div>

          <button
            type="submit"
            data-testid="quote-submit"
            disabled={submitting}
            className="btn-primary mt-8 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Request <Send className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="mt-5 text-[12px] text-[#8EA698]">
            By submitting, you agree to be contacted by DRC Plant Hire &amp; Sand
            regarding your enquiry.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
