"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    id: "01",
    title: "İhtiyaç Analizi",
    description:
      "Yatırım hedeflerinizi, bütçenizi ve özel taleplerinizi detaylı olarak analiz ediyoruz.",
  },
  {
    id: "02",
    title: "Strateji Oluşturma",
    description:
      "Size en uygun gayrimenkul portföyünü veya hukuki çözüm haritasını çıkarıyoruz.",
  },
  {
    id: "03",
    title: "Uygulama",
    description:
      "Satın alma, kiralama veya hukuki süreçleri profesyonel ekibimizle yönetiyoruz.",
  },
  {
    id: "04",
    title: "Sonuç ve Destek",
    description:
      "İşlem sonrasında da mutlak müşteri memnuniyeti için yanınızda olmaya devam ediyoruz.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <style>{`
        .proc-num-wrap {
          transition: border-color 0.3s ease;
        }
        .proc-step:hover .proc-num-wrap {
          border-color: rgba(201,168,76,0.7) !important;
        }
        .proc-step:hover .proc-step-title {
          color: #C9A84C;
        }
        .proc-step-title {
          transition: color 0.25s ease;
        }

        /* ── Grid: mobilde 1 sütun, tablet 2, desktop 4 ── */
        .proc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem 0;
          position: relative;
        }
        @media (min-width: 640px) {
          .proc-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem 0;
          }
        }
        @media (min-width: 1024px) {
          .proc-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 0;
          }
        }

        /* Yatay connector çizgisi — sadece desktop */
        .proc-connector-base,
        .proc-connector-fill {
          display: none;
        }
        @media (min-width: 1024px) {
          .proc-connector-base,
          .proc-connector-fill {
            display: block;
          }
        }

        /* Mobil & tablet: adımlar arası dikey çizgi */
        .proc-step-mobile-line {
          display: block;
          width: 1px;
          height: 32px;
          background: linear-gradient(180deg, rgba(201,168,76,0.4), transparent);
          margin: 0 auto -1.5rem;
        }
        @media (min-width: 1024px) {
          .proc-step-mobile-line { display: none; }
        }

        /* Tablet 2 sütun: sağ sütun dikey çizgisini gizle */
        @media (min-width: 640px) and (max-width: 1023px) {
          .proc-step:nth-child(even) .proc-step-mobile-line { display: none; }
          .proc-step:nth-last-child(-n+2) .proc-step-mobile-line { display: none; }
        }

        /* Mobil: son adım çizgisini gizle */
        @media (max-width: 639px) {
          .proc-step:last-child .proc-step-mobile-line { display: none; }
        }

        /* Desktop: orijinal sağ ayraç çizgileri */
        .proc-divider {
          display: none;
        }
        @media (min-width: 1024px) {
          .proc-divider { display: block; }
        }
      `}</style>

      <section
        id="process"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "5rem 2.5rem",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="assets/process_bg.png"
            alt=""
            aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10,12,18,0.82) 0%, rgba(10,12,18,0.75) 50%, rgba(10,12,18,0.88) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 65% at 50% 50%, transparent 20%, rgba(10,12,18,0.65) 100%)",
          }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto" }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "18px" }}
          >
            <span style={{ flex: "0 0 36px", height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))" }} />
            <span style={{
              fontWeight: 300, fontSize: "10px", letterSpacing: "0.36em",
              color: "#C9A84C", textTransform: "uppercase", opacity: 0.9,
            }}>
              Nasıl Çalışıyoruz?
            </span>
            <span style={{ flex: "0 0 36px", height: 1, background: "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)" }} />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#f0ebe0",
              textAlign: "center",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: "4rem",
            }}
          >
            Çalışma{" "}
            <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Sürecimiz</em>
          </motion.h2>

          {/* Steps */}
          <div ref={ref} className="proc-grid">

            {/* Desktop yatay connector */}
            <div
              className="proc-connector-base"
              style={{
                position: "absolute",
                top: 52, left: "12.5%", right: "12.5%",
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2) 8%, rgba(201,168,76,0.2) 92%, transparent)",
                zIndex: 0,
              }}
            />
            <motion.div
              className="proc-connector-fill"
              initial={{ width: 0 }}
              animate={inView ? { width: "75%" } : { width: 0 }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
              style={{
                position: "absolute",
                top: 52, left: "12.5%",
                height: 1,
                background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.35))",
                zIndex: 1,
              }}
            />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                className="proc-step"
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.15 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0 1.2rem",
                  position: "relative",
                  zIndex: 2,
                  cursor: "default",
                }}
              >
                {/* Number circle */}
                <div
                  className="proc-num-wrap"
                  style={{
                    width: 104, height: 104,
                    borderRadius: "50%",
                    border: "1px solid rgba(201,168,76,0.25)",
                    background: "rgba(10,12,18,0.7)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.6rem",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    color: "#f0ebe0",
                    lineHeight: 1,
                  }}>
                    {step.id}
                  </span>
                </div>

                {/* Desktop: sağ ayraç */}
                {i < STEPS.length - 1 && (
                  <div
                    className="proc-divider"
                    style={{
                      position: "absolute",
                      top: 28, right: -1,
                      width: 1, height: 48,
                      background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.18), transparent)",
                    }}
                  />
                )}

                <h3
                  className="proc-step-title"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    color: "#f0ebe0",
                    textAlign: "center",
                    marginBottom: "0.75rem",
                    lineHeight: 1.25,
                  }}
                >
                  {step.title}
                </h3>

                <p style={{
                  fontWeight: 200,
                  fontSize: "13px",
                  color: "rgba(240,235,224,0.45)",
                  textAlign: "center",
                  lineHeight: 1.75,
                  letterSpacing: "0.02em",
                }}>
                  {step.description}
                </p>

                {/* Mobil / tablet: adımlar arası ince çizgi */}
                <div className="proc-step-mobile-line" style={{ marginTop: "1.5rem" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}