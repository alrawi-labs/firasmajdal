"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section
      id="about"
      className="bg-[#F0EDE8] scroll-mt-20"
      style={{
        padding: "clamp(48px, 12vh, 120px) clamp(16px, 5vw, 72px)",
      }}
    >
      <div
        className="grid md:grid-cols-2"
        style={{
          gap: "clamp(24px, 5vw, 64px)",
          alignItems: "center",
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >
        {/* Sol — Fotoğraf */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "relative",
            borderRadius: "15px",
            overflow: "hidden",
            aspectRatio: "3/2",
            width: "100%",
          }}
        >
          <img
            src="assets/about.png"
            alt="Hakkımızda"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </motion.div>

        {/* Sağ — Metin */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          {/* Üst etiket */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span
              style={{
                color: "#C9A84C",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              Hakkımızda
            </span>
            <span style={{ display: "block", height: "1px", width: "48px", background: "#C9A84C" }} />
          </div>

          {/* Başlık */}
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "#1a1612",
              lineHeight: 1.15,
              margin: "0 0 20px",
              letterSpacing: "-0.01em",
            }}
          >
            Güven ve Uzmanlıkla<br />
            <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Yanınızdayız</em>
          </h2>

          {/* Ayraç */}
          <div style={{ height: "1px", background: "rgba(0,0,0,0.1)", margin: "24px 0" }} />

          {/* Paragraflar */}
          <p
            style={{
              color: "#6b6258",
              fontSize: "clamp(15px, 1.8vh, 18px)",
              lineHeight: 1.8,
              fontWeight: 300,
              margin: "0 0 16px",
            }}
          >
            Yılların deneyimi ve derin sektör bilgisiyle, müvekkillerimize gayrimenkul
            yatırımlarında en doğru kararları almalarında rehberlik ediyoruz.
          </p>

          <p
            style={{
              color: "#6b6258",
              fontSize: "clamp(15px, 1.8vh, 18px)",
              lineHeight: 1.8,
              fontWeight: 300,
              margin: 0,
            }}
          >
            Türkiye'nin prestijli lokasyonlarında uzmanlaştığımız hukuki danışmanlık ve
            tercümanlık hizmetleriyle, her adımda güvenilir bir iş ortağı olarak yanınızdayız.
          </p>
        </motion.div>
      </div>
    </section>
  );
}