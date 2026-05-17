"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import ParallaxLayer from "@/components/scroll-system/components/ParallaxLayer";

// ─── Easing & Variants ───────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const imageVariants: Variants = {
  hidden: { opacity: 0, x: -32, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1, ease: EASE_OUT },
  },
};

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: EASE_OUT, delay: 0.3 },
  },
};

const dividerVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="scroll-mt-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #F8F5F0 0%, #EDE9E2 100%)",
        padding: "clamp(72px, 12vh, 128px) clamp(16px, 5vw, 72px)",
      }}
    >
      {/* Dekoratif arka plan dokusu */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #1a1612 0px, transparent 1px, transparent 60px, #1a1612 60px), repeating-linear-gradient(90deg, #1a1612 0px, transparent 1px, transparent 60px, #1a1612 60px)",
        }}
      />

      <div
        className="relative grid md:grid-cols-2 items-center mx-auto"
        style={{ gap: "clamp(32px, 5vw, 72px)", maxWidth: "1300px" }}
      >
        {/* ── Sol — Fotoğraf — parallax hover ile birleşik ─────────────── */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.14)]"
          style={{ aspectRatio: "3/2", width: "100%" }}
          whileHover={{ scale: 1.015 }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
        >
          <img
            src="assets/about.png"
            alt={t("badge")}
            className="w-full h-full object-cover object-center block"
          />
          {/* Fotoğraf üzeri ince altın çerçeve efekti */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#C9A84C]/20 pointer-events-none" />
        </motion.div>

        {/* ── Sağ — Metin ────────────────────────────────────────────────── */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-5"
          >
            <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.22em] uppercase">
              {t("badge")}
            </span>
            <motion.span
              variants={lineVariants}
              className="block h-px w-12 bg-[#C9A84C]"
            />
          </motion.div>

          {/* Başlık */}
          <motion.h2
            variants={itemVariants}
            className="font-serif font-light text-[#1a1612] leading-[1.15] tracking-[-0.01em] mb-5"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            {t("title")}
            <br />
            <em className="italic text-[#C9A84C]">{t("titleHighlight")}</em>
          </motion.h2>

          {/* Ayraç */}
          <motion.div
            variants={dividerVariants}
            className="h-px bg-black/10 my-6"
          />

          {/* Paragraflar */}
          <motion.p
            variants={itemVariants}
            className="text-[#6b6258] leading-[1.85] font-light mb-4"
            style={{ fontSize: "clamp(15px, 1.8vh, 18px)" }}
          >
            {t("p1")}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-[#6b6258] leading-[1.85] font-light"
            style={{ fontSize: "clamp(15px, 1.8vh, 18px)" }}
          >
            {t("p2")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}