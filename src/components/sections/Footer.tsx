"use client";
import { Phone } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { isRTL } from "@/i18n/routing";
import ScrollReveal from "@/components/scroll-system/components/ScrollReveal";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const rtl = isRTL(locale);

  const navLinks = t.raw("navLinks") as { label: string; href: string }[];
  const services = t.raw("services") as { label: string; href: string }[];

  return (
    <footer
      className="bg-[#041225] text-white pt-20 pb-8 border-t border-white/10"
      style={{ direction: rtl ? "rtl" : "ltr" }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand Col */}
          <ScrollReveal variant="fade-up" delay={0} className="md:col-span-4">
            <a href="#" className="flex items-center gap-3 mb-6">
              <img src="assets/firas_logo_just.png" alt="Firas Real Estate" className="h-30 w-auto object-contain" />
              <div className={`flex flex-col mt-2 ${rtl ? "mr-3" : "ml-3"}`}>
                <span className="font-serif text-4xl tracking-widest font-bold text-primary">
                  FİRAS
                </span>
                <span className="text-[1rem] tracking-[0.2em] font-medium text-white/70">
                  REAL ESTATE
                </span>
              </div>
            </a>

            <p className="text-white/60 leading-relaxed mb-8 max-w-sm font-light text-sm">
              {t("tagline")}
            </p>

            <div className="flex items-start gap-5">
              <div style={{ width: "42px", height: "42px", border: "1px solid rgba(201,168,76,0.35)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Phone size={22} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ color: "#C9A84C", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", marginBottom: "4px" }}>
                  {t("phoneLabel")}
                </p>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", lineHeight: 1.5 }}>
                  {t("phoneValue")}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Links Col */}
          <ScrollReveal variant="fade-up" delay={100} className={`md:col-span-4 ${rtl ? "md:pr-8" : "md:pl-8"}`}>
            <h4 className="font-serif text-xl font-bold text-white mb-6">
              {t("quickLinksTitle")}
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors text-sm relative group inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Services Col */}
          <ScrollReveal variant="fade-up" delay={200} className="md:col-span-4">
            <h4 className="font-serif text-xl font-bold text-white mb-6">
              {t("servicesTitle")}
            </h4>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-white/60 hover:text-primary transition-colors text-sm relative group inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        {/* Bottom Row */}
        <ScrollReveal variant="fade" delay={0}>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/50 text-xs">
            <p>{t("copyright", { year: new Date().getFullYear() })}</p>
            <div className={`flex items-center space-x-6 mt-4 md:mt-0 ${rtl ? "md:flex-row-reverse md:space-x-reverse" : ""}`}>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}