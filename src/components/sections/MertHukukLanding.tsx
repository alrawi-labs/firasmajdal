"use client";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { isRTL } from "@/i18n/routing";

// animate → whileInView: bileşen sayfaya mount olunca değil,
// kullanıcı scroll edip görünce animasyon tetiklenir.

export function MertHukukLanding() {
  const t = useTranslations("law");
  const locale = useLocale();
  const rtl = isRTL(locale);

  return (
    <section
      id="law"
      className="font-serif font-semibold bg-[#F0EDE8] w-full overflow-hidden scroll-mt-30"
      style={{ height: "100%", display: "flex", padding: "0 clamp(16px,4vw,64px) clamp(16px,2.5vh,32px)", gap: "clamp(8px,1.5vh,20px)" }}
    >
      <div
        className="grid md:grid-cols-2 rounded-2xl overflow-hidden"
        style={{ flex: "1 1 0", maxHeight: "70%", direction: rtl ? "rtl" : "ltr" }}
      >

        {/* Metin */}
        <motion.div
          initial={{ opacity: 0, x: rtl ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-[#F0EDE8] flex flex-col justify-center gap-[clamp(8px,1.4vh,18px)]"
          style={{ padding: "clamp(16px,2.5vh,36px) clamp(20px,3vw,48px)" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-primary tracking-[0.22em] uppercase"
            style={{ fontSize: "clamp(11px,1.3vh,14px)" }}
          >
            {t("badge")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="text-foreground leading-[1.1]"
            style={{ fontSize: "clamp(2.8rem, 5.5vh, 4.2rem)" }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-muted-foreground leading-relaxed"
            style={{ fontSize: "clamp(13px,1.7vh,17px)", maxWidth: "380px" }}
          >
            {t("desc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <a href={getWhatsAppLink(t("whatsapp1"))} target="_blank" rel="noopener noreferrer">
              <button
                className="bg-primary text-primary-foreground tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors duration-200 cursor-pointer"
                style={{ fontSize: "clamp(11px,1.3vh,14px)", padding: "clamp(10px,1.3vh,16px) clamp(18px,2.2vw,30px)" }}
              >
                {t("cta1")}
              </button>
            </a>
            <a href={getWhatsAppLink(t("whatsapp2"))} target="_blank" rel="noopener noreferrer">
              <button
                className="border border-foreground/30 text-foreground tracking-[0.15em] uppercase hover:border-primary hover:text-primary transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
                style={{ fontSize: "clamp(11px,1.3vh,14px)", padding: "clamp(10px,1.3vh,16px) clamp(18px,2.2vw,30px)" }}
              >
                {t("cta2")}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={rtl ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
                </svg>
              </button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex items-center gap-4 border-t border-black/10"
            style={{ paddingTop: "clamp(12px,1.6vh,22px)" }}
          >
            <div
              className="rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary"
              style={{ width: "clamp(38px,5vh,52px)", height: "clamp(38px,5vh,52px)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V7l-8-4z" />
              </svg>
            </div>
            <div>
              <p className="text-primary tracking-[0.2em] uppercase" style={{ fontSize: "clamp(11px,1.2vh,13px)" }}>
                {t("trustLabel")}
              </p>
              <p className="text-muted-foreground mt-0.5" style={{ fontSize: "clamp(13px,1.6vh,16px)" }}>
                {t("trustDesc")}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Fotoğraf */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.1 }}
          className="relative overflow-hidden"
        >
          <img
            src="assets/danisman.png"
            alt={t("imgAlt")}
            className="w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: rtl
                ? "linear-gradient(to left, #F0EDE8 0%, #F0EDE8 2%, transparent 28%)"
                : "linear-gradient(to right, #F0EDE8 0%, #F0EDE8 2%, transparent 28%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}