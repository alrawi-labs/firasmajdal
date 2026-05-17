"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { isRTL } from "@/i18n/routing";
import ParallaxLayer from "@/components/scroll-system/components/ParallaxLayer";

const icons = [
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4M7 9h10M7 12h6" />
  </svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>,
];

const ids = ["01", "02", "03", "04"];

export function Services() {
  const t = useTranslations("services");
  const locale = useLocale();
  const rtl = isRTL(locale);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <>
      <style>{`
        .svc-card { transition: background 0.25s ease; }
        .svc-card:hover { background: rgba(201,168,76,0.07) !important; }
        .svc-card:hover .svc-icon { border-color: rgba(201,168,76,0.65) !important; background: rgba(201,168,76,0.09) !important; }
        .svc-card:hover .svc-title { color: #C9A84C !important; }
        .svc-title { transition: color 0.25s ease; }
        .svc-icon  { transition: border-color 0.25s ease, background 0.25s ease; }
        .svc-bar   { transition: width 0.4s ease; width: 0; }
        .svc-card:hover .svc-bar { width: 40px !important; }
        .svc-grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 640px) { .svc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .svc-grid { grid-template-columns: repeat(4, 1fr); } }
        .svc-card-wrap { border-bottom: 1px solid rgba(201,168,76,0.12); }
        .svc-card-wrap:last-child { border-bottom: none; }
        @media (min-width: 640px) {
          .svc-card-wrap { border-right: 1px solid rgba(201,168,76,0.12); border-bottom: 1px solid rgba(201,168,76,0.12); }
          .svc-card-wrap:nth-child(2n) { border-right: none; }
          .svc-card-wrap:nth-last-child(-n+2) { border-bottom: none; }
        }
        @media (min-width: 1024px) {
          .svc-card-wrap { border-right: 1px solid rgba(201,168,76,0.12); border-bottom: none; }
          .svc-card-wrap:last-child { border-right: none; }
          .svc-card-wrap:nth-child(2n) { border-right: 1px solid rgba(201,168,76,0.12); }
          .svc-card-wrap:nth-last-child(-n+2) { border-bottom: none; }
        }
      `}</style>

      <section
        id="services"
        style={{ position: "relative", overflow: "hidden", padding: "5rem 2.5rem", fontFamily: "'Jost', sans-serif", direction: rtl ? "rtl" : "ltr" }}
      >
        {/* Background — parallax ile derinlik */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <ParallaxLayer
            speed={0.1}
            style={{ position: "absolute", inset: 0, width: "100%", height: "115%" }}
          >
            <img
              src="assets/hukuk_bg.png"
              alt=""
              aria-hidden="true"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
          </ParallaxLayer>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,12,18,0.85) 0%, rgba(10,12,18,0.78) 50%, rgba(10,12,18,0.90) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`, backgroundSize: "48px 48px" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 20%, rgba(10,12,18,0.6) 100%)" }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto" }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "16px" }}
          >
            <span style={{ flex: "0 0 36px", height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))" }} />
            <span style={{ fontWeight: 300, fontSize: "10px", letterSpacing: "0.36em", color: "#C9A84C", textTransform: "uppercase", opacity: 0.85 }}>
              {t("badge")}
            </span>
            <span style={{ flex: "0 0 36px", height: 1, background: "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)" }} />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)", color: "#f0ebe0", textAlign: "center", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "3.5rem" }}
          >
            {t("title")}{" "}
            <em style={{ fontStyle: "italic", color: "#C9A84C" }}>{t("titleHighlight")}</em>
          </motion.h2>

          {/* Cards */}
          <div
            ref={ref}
            className="svc-grid"
            style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "4px", overflow: "hidden" }}
          >
            {items.map((svc, i) => (
              <div key={i} className="svc-card-wrap">
                <motion.div
                  className="svc-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.05 + i * 0.12 }}
                  style={{ background: "rgba(10,12,18,0.72)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: "2.2rem 1.8rem", display: "flex", flexDirection: "column", gap: "1rem", cursor: "default", height: "100%" }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="svc-icon" style={{ width: 44, height: 44, border: "1px solid rgba(201,168,76,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C" }}>
                      {icons[i]}
                    </div>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.7rem", color: "rgba(201,168,76,0.4)", letterSpacing: "0.1em" }}>
                      {ids[i]}
                    </span>
                  </div>

                  <h3 className="svc-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 400, color: "#f0ebe0", lineHeight: 1.25 }}>
                    {svc.title}
                  </h3>

                  <p style={{ fontWeight: 200, fontSize: "13px", color: "rgba(240,235,224,0.42)", lineHeight: 1.8, letterSpacing: "0.02em", flex: 1 }}>
                    {svc.description}
                  </p>

                  <div className="svc-bar" style={{ height: 1, background: rtl ? "linear-gradient(270deg, #C9A84C, transparent)" : "linear-gradient(90deg, #C9A84C, transparent)", marginTop: "0.4rem" }} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}