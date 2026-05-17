"use client";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { isRTL } from "@/i18n/routing";
import ScrollReveal from "@/components/scroll-system/components/ScrollReveal";

const featureIcons = [
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V7l-8-4z" />
  </svg>,
];

const listingIcons = [
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V7l-8-4z" />
  </svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>,
];

export function RealEstateSection() {
  const t = useTranslations("estates");
  const locale = useLocale();
  const rtl = isRTL(locale);

  const features = t.raw("features") as { title: string; desc: string }[];
  const listings = t.raw("listings") as { title: string; desc: string }[];
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section
      id="estates"
      className="font-serif font-semibold bg-[#F5F2ED] w-full overflow-x-hidden scroll-mt-5"
      style={{ minHeight: "100svh", direction: rtl ? "rtl" : "ltr" }}
    >
      <div
        className="w-full h-full grid md:grid-cols-[1fr_auto_auto]"
        style={{ padding: "clamp(24px,10vh,152px) clamp(24px,5vw,80px)", gap: "clamp(16px,3vw,48px)" }}
      >
        {/* Sol — metin + butonlar + kartlar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col justify-between h-full"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 mb-4"
            style={{ border: "0.5px solid rgba(184, 151, 90, 0.3)", borderRadius: "16px" }}
          >
            <ScrollReveal variant="fade-up" delay={60}>
              <div className="p-6 md:p-8">
                <p className="text-[#B8975A] tracking-[0.28em] uppercase mb-3" style={{ fontSize: "clamp(10px,1vw,12px)" }}>
                  {t("badge")}
                </p>
                <h1 className="text-[#1a1a1a] leading-[1.05] mb-4" style={{ fontSize: "clamp(1.8rem,3.8vw,3.4rem)" }}>
                  {t("title").split("\n").map((line, i) => <span key={i} className="block">{line}</span>)}
                </h1>
                <div className="mb-4" style={{ width: "36px", height: "2px", background: "#B8975A" }} />
                <p className="text-[#555] leading-relaxed mb-6" style={{ fontSize: "clamp(13px,1.1vw,15px)", maxWidth: "380px" }}>
                  {t("desc")}
                </p>

                <div className="flex flex-col gap-3 mb-6">
                  {features.map((f, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: rtl ? 12 : -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full flex-shrink-0"
                        style={{ width: "clamp(36px,4vw,44px)", height: "clamp(36px,4vw,44px)", background: i === 0 ? "#1a1a1a" : "#B8975A20", color: i === 0 ? "#fff" : "#B8975A" }}
                      >
                        {featureIcons[i]}
                      </div>
                      <div>
                        <p className="text-[#1a1a1a] font-semibold" style={{ fontSize: "clamp(13px,1.1vw,15px)" }}>{f.title}</p>
                        <p className="text-[#888]" style={{ fontSize: "clamp(11px,0.95vw,13px)" }}>{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <a href={getWhatsAppLink(t("whatsapp1"))} target="_blank" rel="noopener noreferrer">
                    <button className="flex items-center gap-2 bg-[#1a1a1a] text-white hover:bg-[#B8975A] transition-colors duration-300 tracking-[0.18em] uppercase cursor-pointer" style={{ fontSize: "clamp(10px,1vw,12px)", padding: "clamp(11px,1.4vh,15px) clamp(18px,2.2vw,30px)" }}>
                      {t("cta1")}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={rtl ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14M12 5l7 7-7 7"} />
                      </svg>
                    </button>
                  </a>
                  <a href={getWhatsAppLink(t("whatsapp2"))} target="_blank" rel="noopener noreferrer">
                    <button className="flex items-center gap-2 border text-[#1a1a1a] hover:border-[#B8975A] hover:text-[#B8975A] transition-colors duration-300 tracking-[0.18em] uppercase cursor-pointer" style={{ fontSize: "clamp(10px,1vw,12px)", padding: "clamp(11px,1.4vh,15px) clamp(18px,2.2vw,30px)", borderColor: "rgba(0,0,0,0.25)" }}>
                      {t("cta2")}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={rtl ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14M12 5l7 7-7 7"} />
                      </svg>
                    </button>
                  </a>
                </div>

                {/* Mobile Stats */}
                <div className="flex md:hidden justify-around py-4 border-t border-black/10 mt-4">
                  {stats.map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-0.5">
                      <p className="text-[#1a1a1a] font-bold" style={{ fontSize: "1.4rem" }}>{s.value}</p>
                      <p className="text-[#888] tracking-widest uppercase text-center" style={{ fontSize: "9px" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* soovImg */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: 0.15 }}
              className="relative w-full overflow-hidden"
              style={{ minHeight: "240px", borderRadius: rtl ? "0 0 0 14px" : "0 0 14px 14px" }}
            >
              <style>{`
                @media(min-width:768px){
                  .soov-inner { border-radius: ${rtl ? "16px 0 0 16px" : "0 16px 16px 0"} !important; }
                }
              `}</style>
              <div className="soov-inner absolute inset-0" style={{ borderRadius: "inherit", overflow: "hidden" }}>
                <img src="assets/soov.png" alt={t("imgAlt")} className="w-full h-full object-cover object-top" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: rtl ? "linear-gradient(to left, #F5F2ED 0%, #F0EDE8 2%, transparent 28%)" : "linear-gradient(to right, #F5F2ED 0%, #F0EDE8 2%, transparent 28%)" }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Listing kartları — stagger ile sırayla belirir */}
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden" style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}>
            {listings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className={`group relative bg-white flex flex-col items-start justify-center gap-3 cursor-pointer hover:bg-[#F5F2ED] transition-colors duration-300 ${i < listings.length - 1 ? "border-r border-black/10" : ""}`}
                style={{ padding: "clamp(14px,1.8vh,22px) clamp(12px,1.4vw,20px)" }}
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#B8975A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <div className="flex items-center justify-center rounded-full" style={{ width: "40px", height: "40px", background: "#B8975A15", color: "#B8975A" }}>
                  {listingIcons[i]}
                </div>
                <div>
                  <p className="text-[#1a1a1a] font-semibold mb-1" style={{ fontSize: "clamp(12px,1.1vw,14px)" }}>{item.title}</p>
                  <p className="text-[#888] hidden sm:block" style={{ fontSize: "clamp(10px,0.85vw,12px)" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Orta — gayrimankullerImg */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.12 }}
          style={{ borderRadius: "16px", overflow: "hidden" }}
        >
          <style>{`
            .gay-photo { width: 100%; height: 280px; }
            @media(min-width:768px){
              .gay-photo { width: clamp(220px,24vw,360px); height: 100%; max-height: 100svh; position: relative; }
            }
          `}</style>
          <div className="gay-photo" style={{ overflow: "hidden", borderRadius: "16px" }}>
            <img src="assets/gayrimankuller.png" alt={t("imgAlt2")} className="w-full h-full object-cover object-top" />
          </div>
        </motion.div>

        {/* Sağ — stats + alıntı */}
        <motion.div
          initial={{ opacity: 0, x: rtl ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="hidden md:flex flex-col self-stretch"
          style={{ width: "clamp(140px,13vw,185px)", justifyContent: "space-around", alignItems: "stretch" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-between flex-1"
              style={{ background: "#F1EDEA" }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
            >
              <div style={{ borderTop: "2px solid #B8975A", margin: "0 8px", height: "0.1px", width: "30%" }} />
              <div className="flex flex-col items-center">
                <p className="text-[#1a1a1a] leading-none" style={{ fontSize: "clamp(1.6rem,2.6vw,2.4rem)", fontWeight: 700 }}>{s.value}</p>
                <p className="text-[#888] tracking-[0.18em] uppercase text-center" style={{ fontSize: "10px" }}>{s.label}</p>
              </div>
              <div />
            </motion.div>
          ))}
          <div className="rounded-xl" style={{ background: "#1a1a1a", border: "0.5px solid rgba(255,255,255,0.08)", padding: "clamp(14px,1.8vh,22px)" }}>
            <p className="text-[#B8975A] mb-1" style={{ fontSize: "clamp(18px,2vw,24px)", lineHeight: 1, fontWeight: 700 }}>"</p>
            <p className="text-white leading-snug mb-2" style={{ fontSize: "13px" }}>{t("quote")}</p>
            <p className="text-[#888]" style={{ fontSize: "11px" }}>{t("quoteDesc")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}