"use client";

import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { useTranslations, useLocale } from "next-intl";
import { isRTL } from "@/i18n/routing";
import ParallaxLayer from "@/components/scroll-system/components/ParallaxLayer";

// ─── Easing ──────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Variants ────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

const sideVariants = (rtl: boolean): Variants => ({
  hidden: { opacity: 0, x: rtl ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: EASE_OUT },
  },
});

const scrollIndicatorVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay: 2.2 },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const rtl = isRTL(locale);
  const t_wp = useTranslations("whatsapp");
  
  const heroBg = rtl ? "assets/hero_bg_ar.png" : "assets/hero_bg.png";

  return (
    <section
      className="relative w-full h-[100dvh] flex items-center overflow-hidden bg-secondary"
      id="hero"
    >
      {/* ── Background: Parallax + Ken Burns ───────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 z-10 ${
            rtl
              ? "bg-gradient-to-l from-secondary/90 via-secondary/60 to-secondary/20"
              : "bg-gradient-to-r from-secondary/90 via-secondary/60 to-secondary/20"
          }`}
        />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-secondary to-transparent" />

        {/* ParallaxLayer: Hero bg yavaşça yukarı kayar — derinlik hissi */}
        <ParallaxLayer
          speed={0.18}
          style={{ position: "absolute", inset: 0, width: "100%", height: "115%" }}
        >
          <img
            src={heroBg}
            alt="Luxury Istanbul Bosphorus View"
            className="w-full h-full object-cover ken-burns"
          />
        </ParallaxLayer>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <div
        className="container relative z-20 mx-auto px-4 md:px-8 mt-16 md:mt-0"
        style={{ direction: rtl ? "rtl" : "ltr" }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Content */}
          <motion.div
            className="w-full lg:w-3/5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.p
              variants={itemVariants}
              className="text-primary font-bold tracking-[0.35em] uppercase text-sm mb-6"
            >
              {t("badge")}
            </motion.p>

            {/* Heading */}
            <motion.h1
              variants={titleVariants}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            >
              <span className="text-primary block">{t("title1")}</span>
              <span className="text-white italic block mt-2">{t("title2")}</span>
              <span className="text-primary italic block mt-2">{t("title3")}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light"
            >
              {t("desc")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href={getWhatsAppLink(t_wp("default"))}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-base tracking-widest uppercase rounded-none border-none cursor-pointer transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                >
                  {t("cta1")}
                </Button>
              </motion.a>

              <motion.a
                href="#about"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base tracking-widest uppercase rounded-none text-white border-white/30 hover:bg-white/10 hover:text-white cursor-pointer transition-all duration-300 hover:border-white/60"
                >
                  {t("cta2")}
                </Button>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            variants={sideVariants(rtl)}
            initial="hidden"
            animate="visible"
            className="w-100 lg:w-2/5 hidden lg:flex justify-end"
          />
        </div>
      </div>

      {/* ── Scroll Indicator ────────────────────────────────────────────── */}
      <motion.div
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-[1px] h-16 bg-white/15 relative overflow-hidden rounded-full">
          <motion.div
            className="w-full bg-primary absolute top-0"
            style={{ height: "50%" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
              repeatDelay: 0.2,
            }}
          />
        </div>
        <motion.div
          className="w-1 h-1 rounded-full bg-primary/60"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}