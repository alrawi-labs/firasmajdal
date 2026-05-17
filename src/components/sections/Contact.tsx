"use client";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Handshake,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getWhatsAppLink } from "@/lib/whatsapp";

const schema = z.object({
  fullName: z.string().min(2),
  message: z.string().min(1),
});

const trustItems = [
  {
    icon: Shield,
    label: "GÜVENLİ HİZMET",
    desc: "Tüm süreçlerinizde yanınızdayız.",
  },
  {
    icon: Handshake,
    label: "UZMAN DANIŞMANLIK",
    desc: "Deneyimli ekibimizle en doğru çözümler.",
  },
  {
    icon: Clock,
    label: "HIZLI DÖNÜŞ",
    desc: "Sorularınıza en kısa sürede yanıt veriyoruz.",
  },
];

export function Contact() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const message = `Merhaba, danışmanlık talebi:\n\nAd Soyad: ${values.fullName}\nMesaj: ${values.message}`;
    const url = `https://api.whatsapp.com/send?phone=905427666190&text=${encodeURIComponent(message)}`;
    window.location.href = url;
    form.reset();
  }

  return (
    <>
      {/* ── Responsive styles ── */}
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .contact-form-card {
          width: 500px;
        }

        .contact-info-icons {
          margin: 5rem;
        }

        .contact-phone-label {
          font-size: 21px;
        }

        .contact-phone-value {
          font-size: 35px;
        }

        .contact-phone-icon {
          width: 82px;
          height: 82px;
        }

        .contact-phone-icon-size {
          width: 42px;
          height: 42px;
        }

        /* Tablet (768px – 1023px) */
        @media (max-width: 1023px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .contact-form-card {
            width: 100%;
            max-width: 560px;
            margin: 0 auto;
          }

          .contact-info-icons {
            margin: 1.5rem 0;
          }

          .contact-phone-label {
            font-size: 16px;
          }

          .contact-phone-value {
            font-size: 26px;
          }

          .contact-phone-icon {
            width: 60px;
            height: 60px;
          }
        }

        /* Mobile (< 640px) */
        @media (max-width: 639px) {
          .contact-section-padding {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }

          .contact-container {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }

          .contact-grid {
            gap: 2.5rem;
          }

          .contact-heading {
            font-size: 1.75rem !important;
          }

          .contact-form-card {
            padding: 28px 20px !important;
          }

          .contact-trust-grid {
            grid-template-columns: 1fr !important;
          }

          .contact-phone-label {
            font-size: 14px;
          }

          .contact-phone-value {
            font-size: 20px;
          }

          .contact-phone-icon {
            width: 48px;
            height: 48px;
          }
        }

        /* Very small screens (< 380px) */
        @media (max-width: 379px) {
          .contact-form-card {
            padding: 22px 14px !important;
          }

          .contact-heading {
            font-size: 1.5rem !important;
          }
        }
      `}</style>

      <section
        id="contact"
        className="contact-section-padding relative min-h-screen py-24 overflow-hidden"
      >
        {/* ── Layer 1: Background photo ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(assets/contact_bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* ── Layer 2: Dark gradient overlay ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(6,5,3,0.82) 0%, rgba(6,5,3,0.70) 38%, rgba(6,5,3,0.35) 65%, rgba(6,5,3,0.10) 100%)",
          }}
        />

        {/* ── Layer 3: Subtle gold ambient ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 8% 85%, rgba(180,140,60,0.09) 0%, transparent 48%), radial-gradient(ellipse at 75% 15%, rgba(180,140,60,0.05) 0%, transparent 45%)",
          }}
        />

        {/* ── Content ── */}
        <div className="contact-container container mx-auto px-6 md:px-12 relative z-10">
          <div className="contact-grid">
            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Section label */}
              <div className="flex items-center gap-3 mb-8">
                <span
                  style={{
                    color: "#C9A84C",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                  }}
                >
                  İLETİŞİME GEÇİN
                </span>
                <span
                  style={{
                    height: "1px",
                    width: "48px",
                    background: "#C9A84C",
                    display: "block",
                  }}
                />
              </div>

              {/* Heading */}
              <h2
                className="contact-heading mb-6 leading-tight"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                }}
              >
                Hayalinizdeki Hizmetler İçin
                <br />
                Bizimle İletişime Geçin
              </h2>

              <p
                className="mb-10"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                Prestige Real Estate olarak, yatırım hedeflerinize ulaşmanız
                için profesyonel danışmanlık ve güvenilir çözümler sunuyoruz.
              </p>

              <div
                style={{
                  height: "1px",
                  background: "rgba(201,168,76,0.25)",
                  marginBottom: "2.5rem",
                }}
              />

              {/* Contact info */}
              <div className="contact-info-icons space-y-6">
                {[
                  { icon: Phone, label: "TELEFON", value: "+90 542 766 61 90" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-5">
                    <div
                      className="contact-phone-icon"
                      style={{
                        border: "1px solid rgba(201,168,76,0.35)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        className="contact-phone-icon-size"
                        style={{ color: "#C9A84C" }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <p
                        className="contact-phone-label"
                        style={{
                          color: "#C9A84C",
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          marginBottom: "4px",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        className="contact-phone-value"
                        style={{
                          color: "rgba(255,255,255,0.85)",
                          whiteSpace: "pre-line",
                          lineHeight: 1.5,
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust grid */}
              <div
                className="contact-trust-grid"
                style={{
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "1px",
                  background: "rgba(201,168,76,0.12)",
                }}
              >
                {trustItems.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    style={{
                      background: "rgba(6,5,3,0.82)",
                      padding: "20px 14px",
                      textAlign: "center",
                    }}
                  >
                    <Icon
                      size={22}
                      style={{
                        color: "#C9A84C",
                        margin: "0 auto 10px",
                        display: "block",
                      }}
                      strokeWidth={1.5}
                    />
                    <p
                      style={{
                        color: "#C9A84C",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        marginBottom: "6px",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "12px",
                        lineHeight: 1.5,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT COLUMN — Glass card with form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                className="contact-form-card"
                style={{
                  background: "rgba(14,11,7,0.72)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(201,168,76,0.25)",
                  borderRadius: "16px",
                  padding: "40px 36px",
                  boxShadow:
                    "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(201,168,76,0.15)",
                }}
              >
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <img
                    src="assets/firas_logo.png"
                    alt="Firas Real Estate"
                    className="w-[150px] h-auto object-contain"
                  />
                </div>

                {/* Form */}
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {[
                    {
                      name: "fullName" as const,
                      label: "AD SOYAD",
                      placeholder: "Adınız ve Soyadınız",
                      type: "text",
                    },
                  ].map(({ name, label, placeholder, type }) => (
                    <div key={name}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          color: "rgba(255,255,255,0.5)",
                          marginBottom: "8px",
                        }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        {...form.register(name)}
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(201,168,76,0.2)",
                          borderRadius: "8px",
                          padding: "13px 16px",
                          color: "rgba(255,255,255,0.85)",
                          fontSize: "14px",
                          outline: "none",
                          transition: "border-color 0.2s",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "rgba(201,168,76,0.6)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(201,168,76,0.2)")
                        }
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        color: "rgba(255,255,255,0.5)",
                        marginBottom: "8px",
                      }}
                    >
                      MESAJ
                    </label>
                    <textarea
                      placeholder="Mesajınızı yazınız..."
                      rows={4}
                      {...form.register("message")}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        borderRadius: "8px",
                        padding: "13px 16px",
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "14px",
                        outline: "none",
                        resize: "vertical",
                        fontFamily: "inherit",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "rgba(201,168,76,0.6)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "rgba(201,168,76,0.2)")
                      }
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      background:
                        "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)",
                      border: "none",
                      borderRadius: "8px",
                      padding: "16px 24px",
                      color: "#0a0a0a",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      marginTop: "8px",
                    }}
                  >
                    DANIŞMANLIK AL
                    <ArrowRight size={16} />
                  </motion.button>

                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <Shield
                      size={13}
                      style={{ color: "rgba(201,168,76,0.5)" }}
                    />
                    Bilgileriniz gizli ve güvenlidir.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
