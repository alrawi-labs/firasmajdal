"use client";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { isRTL } from "@/i18n/routing";

export function TercumanLanding() {
  const t = useTranslations("translator");
  const locale = useLocale();
  const rtl = isRTL(locale);

  const trust = t.raw("trust") as string[];
  const properties = t.raw("properties") as { value: string; label: string }[];

  const arrowPath = rtl ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14M12 5l7 7-7 7";

  return (
    <section id="translator" className="scroll-mt-18" style={{ direction: rtl ? "rtl" : "ltr" }}>
      <style>{`
        @media (max-width: 767px) {
          .tl-root { height: auto !important; min-height: 100svh; }
          .tl-main-grid {
            display: flex !important;
            flex-direction: column !important;
            padding: 28px 20px 40px !important;
            gap: 0 !important;
            margin-bottom: 0 !important;
          }
          .tl-top-badge      { order: 0; margin-bottom: 16px; }
          .tl-heading-block  { order: 1; margin-bottom: 12px; }
          .tl-subtitle-block { order: 2; margin-bottom: 20px; }
          .tl-photo-block    { order: 3; margin-bottom: 24px; }
          .tl-rest-block     { order: 4; }
          .tl-photo-block { display: flex !important; height: 280px; border-radius: 16px; overflow: hidden; }
          .tl-heading-block h1 { font-size: clamp(2.2rem, 9vw, 3rem) !important; }
          .tl-stats-strip { display: flex !important; flex-direction: column !important; gap: 0; border-top: 0.5px solid rgba(0,0,0,0.1); padding-top: 20px; margin-top: 20px; }
          .tl-stat-item { padding-right: 0 !important; margin-right: 0 !important; border-right: none !important; border-bottom: 0.5px solid rgba(0,0,0,0.08); padding-bottom: 14px; margin-bottom: 14px; }
          .tl-stat-item:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
          .tl-stat-value { font-size: 1rem !important; }
          .tl-badges { flex-wrap: wrap; gap: 8px !important; }
          .tl-badge { flex: 1 1 calc(50% - 4px); justify-content: center; }
          .tl-buttons { flex-direction: column !important; }
          .tl-buttons button { width: 100%; justify-content: center; }
          .tl-right-panel { display: none !important; }
          .tl-left-panel { display: flex !important; flex-direction: column !important; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .tl-root { height: auto !important; min-height: 100svh; }
          .tl-main-grid { margin-bottom: 0 !important; padding: 32px 36px 48px !important; gap: 28px !important; grid-template-columns: 1fr 42% !important; }
          .tl-heading-block h1 { font-size: clamp(2rem, 4.5vw, 3.2rem) !important; }
          .tl-right-panel { display: flex !important; }
          .tl-photo-block { display: none !important; }
        }

        @media (min-width: 1024px) {
          .tl-photo-block { display: none !important; }
        }
      `}</style>

      <div
        className="tl-root font-serif font-semibold bg-[#F5F2ED] w-full overflow-hidden"
        style={{ height: "100svh", display: "flex", flexDirection: "column" }}
      >
        <div
          className="tl-main-grid flex-1 grid md:grid-cols-[1fr_45%] min-h-0 mb-24"
          style={{ padding: "clamp(20px,5vh,60px) clamp(24px,5vw,72px)", gap: "clamp(20px,3vw,48px)" }}
        >
          {/* SOL — metin */}
          <motion.div
            initial={{ opacity: 0, x: rtl ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="tl-left-panel flex flex-col justify-between h-full"
          >
            {/* ① Dil rozeti */}
            <div className="tl-top-badge flex items-center gap-3">
              <span className="tracking-[0.24em] uppercase text-[#B8975A]" style={{ fontSize: "clamp(10px,0.9vw,12px)" }}>
                {t("badge")}
              </span>
              <div style={{ flex: 1, height: "0.5px", background: "rgba(184,151,90,0.35)" }} />
              <span className="text-[#B8975A]" style={{ fontSize: "13px", fontFamily: "serif", direction: "rtl" }}>
                {t("langs")}
              </span>
            </div>

            {/* ② Başlık */}
            <motion.div
              className="tl-heading-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              <h1 className="text-[#1a1a1a] leading-[1.02] mb-4" style={{ fontSize: "clamp(2.6rem,5.2vw,5rem)" }}>
                {t("title1")}<br />
                <span style={{ color: "#B8975A" }}>{t("title2")}</span><br />
                {t("title3")}<br />
                {t("title4")}
              </h1>
              <div className="flex items-center gap-3">
                <div style={{ width: "36px", height: "2px", background: "#B8975A" }} />
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#B8975A30" }} />
              </div>
            </motion.div>

            {/* ③ Açıklama */}
            <motion.div
              className="tl-subtitle-block"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              <p className="text-[#555] leading-relaxed" style={{ fontSize: "clamp(13px,1.1vw,16px)", maxWidth: "400px" }}>
                {t("desc")}
              </p>
            </motion.div>

            {/* ④ Fotoğraf — sadece mobilde */}
            <div className="tl-photo-block hidden" style={{ background: "#1a1a1a", position: "relative" }}>
              <img
                src="assets/tercuman.png"
                alt={t("imgAlt")}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p style={{ color: "rgba(184,151,90,0.18)", fontSize: "8rem", fontFamily: "serif", direction: "rtl", lineHeight: 1, userSelect: "none" }}>
                  ترجمة
                </p>
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 50%, #1a1a1a 100%)" }} />
            </div>

            {/* ⑤ Rozetler + butonlar + istatistikler */}
            <motion.div
              className="tl-rest-block flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.26 }}
            >
              {/* Güven rozetleri */}
              <div className="tl-badges flex gap-4 mb-8 flex-wrap">
                {trust.map((label, i) => (
                  <div
                    key={i}
                    className="tl-badge flex items-center gap-2"
                    style={{ border: "0.5px solid rgba(184,151,90,0.4)", borderRadius: "4px", padding: "6px 12px", background: "rgba(184,151,90,0.06)" }}
                  >
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#B8975A" }} />
                    <span className="text-[#1a1a1a]" style={{ fontSize: "clamp(10px,0.85vw,12px)", letterSpacing: "0.1em" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Butonlar */}
              <div className="tl-buttons flex flex-wrap gap-3 mb-0">
                <a href={getWhatsAppLink(t("whatsapp1"))} target="_blank" rel="noopener noreferrer">
                  <button
                    className="flex items-center gap-2 bg-[#1a1a1a] text-white hover:bg-[#B8975A] transition-colors duration-300 tracking-[0.18em] uppercase cursor-pointer"
                    style={{ fontSize: "clamp(10px,0.9vw,12px)", padding: "clamp(12px,1.4vh,16px) clamp(20px,2.2vw,32px)" }}
                  >
                    {t("cta1")}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={arrowPath} />
                    </svg>
                  </button>
                </a>
                <a href={getWhatsAppLink(t("whatsapp2"))} target="_blank" rel="noopener noreferrer">
                  <button
                    className="flex items-center gap-2 text-[#1a1a1a] hover:text-[#B8975A] hover:border-[#B8975A] transition-colors duration-300 tracking-[0.18em] uppercase border cursor-pointer"
                    style={{ fontSize: "clamp(10px,0.9vw,12px)", padding: "clamp(12px,1.4vh,16px) clamp(20px,2.2vw,32px)", borderColor: "rgba(0,0,0,0.2)" }}
                  >
                    {t("cta2")}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={arrowPath} />
                    </svg>
                  </button>
                </a>
              </div>

              {/* İstatistik şeridi */}
              <div
                className="tl-stats-strip hidden md:flex gap-0 mt-6"
                style={{ borderTop: "0.5px solid rgba(0,0,0,0.1)", paddingTop: "clamp(16px,2vh,28px)" }}
              >
                {properties.map((s, i) => (
                  <div
                    key={i}
                    className="tl-stat-item flex flex-col"
                    style={{
                      paddingRight: rtl ? 0 : "clamp(24px,3vw,48px)",
                      paddingLeft: rtl ? "clamp(24px,3vw,48px)" : 0,
                      marginRight: rtl ? 0 : "clamp(24px,3vw,48px)",
                      marginLeft: rtl ? "clamp(24px,3vw,48px)" : 0,
                      borderRight: !rtl && i < properties.length - 1 ? "0.5px solid rgba(0,0,0,0.1)" : "none",
                      borderLeft: rtl && i < properties.length - 1 ? "0.5px solid rgba(0,0,0,0.1)" : "none",
                    }}
                  >
                    <span className="tl-stat-value text-[#1a1a1a] leading-none" style={{ fontSize: "clamp(1.5rem,2.8vw,2.6rem)", fontWeight: 700 }}>
                      {s.value}
                    </span>
                    <span className="text-[#888] tracking-[0.16em] uppercase mt-1" style={{ fontSize: "10px" }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* SAĞ — koyu görsel panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: 0.1 }}
            className="tl-right-panel hidden md:flex flex-col rounded-2xl overflow-hidden"
            style={{ background: "#1a1a1a", position: "relative" }}
          >
            <div className="flex-1 relative overflow-hidden">
              <img
                src="assets/tercuman.png"
                alt={t("imgAlt")}
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: rtl
                    ? "linear-gradient(to left, #1a1a1a 0%, transparent 20%, transparent 80%, #1a1a1a 100%)"
                    : "linear-gradient(to right, #1a1a1a 0%, transparent 20%, transparent 80%, #1a1a1a 100%)",
                }}
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 50%, #1a1a1a 100%)" }} />
            </div>

            <div style={{ padding: "clamp(20px,2.5vh,32px) clamp(20px,2vw,32px)" }}>
              <div style={{ width: "40px", height: "2px", background: "#B8975A", marginBottom: "16px" }} />
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(13px,1.2vw,16px)", lineHeight: 1.5, marginBottom: "6px" }}>
                {t("quote")}
              </p>
              <p style={{ color: "rgba(184,151,90,0.8)", fontSize: "clamp(10px,0.9vw,12px)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                {t("delivery")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}