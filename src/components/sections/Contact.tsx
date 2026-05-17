"use client";
import { motion } from "framer-motion";
import { Phone, Shield, Handshake, Clock, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations, useLocale } from "next-intl";
import { isRTL } from "@/i18n/routing";
import ScrollReveal from "@/components/scroll-system/components/ScrollReveal";
import ParallaxLayer from "@/components/scroll-system/components/ParallaxLayer";

const schema = z.object({
  fullName: z.string().min(2),
  message: z.string().min(1),
});

const trustIcons = [Shield, Handshake, Clock];

export function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const rtl = isRTL(locale);

  const trust = t.raw("trust") as { label: string; desc: string }[];

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const message = t("form.whatsappMessage")
      .replace("{name}", values.fullName)
      .replace("{message}", values.message);
    const url = `https://api.whatsapp.com/send?phone=905427666190&text=${encodeURIComponent(message)}`;
    window.location.href = url;
    form.reset();
  }

  return (
    <>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .contact-form-card { width: 500px; }
        .contact-info-icons { margin: 5rem; }
        .contact-phone-label { font-size: 21px; }
        .contact-phone-value { font-size: 35px; }
        .contact-phone-icon { width: 82px; height: 82px; }
        .contact-phone-icon-size { width: 42px; height: 42px; }

        @media (max-width: 1023px) {
          .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
          .contact-form-card { width: 100%; max-width: 560px; margin: 0 auto; }
          .contact-info-icons { margin: 1.5rem 0; }
          .contact-phone-label { font-size: 16px; }
          .contact-phone-value { font-size: 26px; }
          .contact-phone-icon { width: 60px; height: 60px; }
        }

        @media (max-width: 639px) {
          .contact-section-padding { padding-top: 4rem; padding-bottom: 4rem; }
          .contact-container { padding-left: 1.25rem; padding-right: 1.25rem; }
          .contact-grid { gap: 2.5rem; }
          .contact-heading { font-size: 1.75rem !important; }
          .contact-form-card { padding: 28px 20px !important; }
          .contact-trust-grid { grid-template-columns: 1fr !important; }
          .contact-phone-label { font-size: 14px; }
          .contact-phone-value { font-size: 20px; }
          .contact-phone-icon { width: 48px; height: 48px; }
        }

        @media (max-width: 379px) {
          .contact-form-card { padding: 22px 14px !important; }
          .contact-heading { font-size: 1.5rem !important; }
        }
      `}</style>

      <section
        id="contact"
        className="contact-section-padding relative min-h-screen py-24 overflow-hidden"
        style={{ direction: rtl ? "rtl" : "ltr" }}
      >
        {/* Background — parallax ile hafif derinlik */}
        <ParallaxLayer
          speed={0.08}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "115%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: "url(assets/contact_bg.png)",
              backgroundSize: "cover",
              backgroundPosition: rtl ? "center left" : "center right",
              backgroundRepeat: "no-repeat",
            }}
          />
        </ParallaxLayer>

        {/* Overlay gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: rtl
              ? "linear-gradient(255deg, rgba(6,5,3,0.82) 0%, rgba(6,5,3,0.70) 38%, rgba(6,5,3,0.35) 65%, rgba(6,5,3,0.10) 100%)"
              : "linear-gradient(105deg, rgba(6,5,3,0.82) 0%, rgba(6,5,3,0.70) 38%, rgba(6,5,3,0.35) 65%, rgba(6,5,3,0.10) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 8% 85%, rgba(180,140,60,0.09) 0%, transparent 48%), radial-gradient(ellipse at 75% 15%, rgba(180,140,60,0.05) 0%, transparent 45%)",
          }}
        />

        {/* Content */}
        <div className="contact-container container mx-auto px-6 md:px-12 relative z-10">
          <div className="contact-grid">
            {/* SOL SÜTUN */}
            <motion.div
              initial={{ opacity: 0, x: rtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              {/* Etiket */}
              <ScrollReveal variant="fade-up" delay={0}>
                <div className="flex items-center gap-3 mb-8">
                  <span
                    style={{
                      color: "#C9A84C",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.2em",
                    }}
                  >
                    {t("badge")}
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
              </ScrollReveal>

              {/* Başlık */}
              <ScrollReveal variant="blur-in" delay={80}>
                <h2
                  className="contact-heading mb-6 leading-tight"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 300,
                    color: "#FFFFFF",
                    letterSpacing: "-0.01em",
                    whiteSpace: "pre-line",
                  }}
                >
                  {t("heading")}
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={140}>
                <p
                  className="mb-10"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                  }}
                >
                  {t("desc")}
                </p>
              </ScrollReveal>

              <div
                style={{
                  height: "1px",
                  background: "rgba(201,168,76,0.25)",
                  marginBottom: "2.5rem",
                }}
              />

              {/* Telefon */}
              <ScrollReveal variant="fade-up" delay={180}>
                <div className="contact-info-icons space-y-6">
                  <div className="flex items-start gap-5">
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
                      <Phone
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
                        {t("phoneLabel")}
                      </p>
                      <a
                        href="https://api.whatsapp.com/send?phone=905427666190"
                        target="_blank"
                        rel="noopener noreferrer"
                        dir="ltr"
                        style={{
                          textDecoration: "none",
                          display: "inline-block",
                          unicodeBidi: "embed",
                        }}
                      >
                        <p
                          className="contact-phone-value"
                          style={{
                            color: "rgba(255,255,255,0.85)",
                            lineHeight: 1.5,
                            transition: "color 0.2s",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "#C9A84C")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color =
                              "rgba(255,255,255,0.85)")
                          }
                        >
                          {t("phoneValue")}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Güven grid */}
              <ScrollReveal variant="fade-up" delay={240}>
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
                  {trust.map(({ label, desc }, i) => {
                    const Icon = trustIcons[i];
                    return (
                      <div
                        key={i}
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
                    );
                  })}
                </div>
              </ScrollReveal>
            </motion.div>

            {/* SAĞ SÜTUN — Form */}
            <motion.div
              initial={{ opacity: 0, x: rtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
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
                      {t("form.nameLabel")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("form.namePlaceholder")}
                      {...form.register("fullName")}
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
                      {t("form.messageLabel")}
                    </label>
                    <textarea
                      placeholder={t("form.messagePlaceholder")}
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
                    {t("form.submit")}
                    <ArrowRight
                      size={16}
                      style={{ transform: rtl ? "scaleX(-1)" : "none" }}
                    />
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
                    {t("form.privacy")}
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
