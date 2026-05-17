"use client";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";

export function MertHukukLanding() {
  return (
    <section
      id="law"
      className="font-serif font-semibold bg-[#F0EDE8] w-full overflow-hidden scroll-mt-30"
      style={{
        height: "100%",
        display: "flex",
        padding: "0 clamp(16px,4vw,64px) clamp(16px,2.5vh,32px)",
        gap: "clamp(8px,1.5vh,20px)",
      }}
    >
      {/* ── HERO — kalan alanı kaplar ── */}
      <div
        className="grid md:grid-cols-2 rounded-2xl overflow-hidden"
        style={{ flex: "1 1 0", maxHeight: "70%" }}
      >
        {/* Sol — metin */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-[#F0EDE8] flex flex-col justify-center gap-[clamp(8px,1.4vh,18px)]"
          style={{ padding: "clamp(16px,2.5vh,36px) clamp(20px,3vw,48px)" }}
        >
          {/* Üst etiket */}
          <p
            className="text-primary tracking-[0.22em] uppercase"
            style={{ fontSize: "clamp(11px,1.3vh,14px)" }}
          >
            Profesyonel Danışmanlık
          </p>

          {/* Başlık — senin değerin */}
          <h1
            className="text-foreground leading-[1.1]"
            style={{ fontSize: "clamp(2.8rem, 5.5vh, 4.2rem)" }}
          >
            Hukuki Danışmanlık
            <br />
            Hizmetleri
          </h1>

          {/* Açıklama */}
          <p
            className="text-muted-foreground leading-relaxed"
            style={{ fontSize: "clamp(13px,1.7vh,17px)", maxWidth: "380px" }}
          >
            Müvekkillerimize en iyi hukuki çözümleri sunmak için uzmanlığımızı
            ve tecrübemizi bir araya getiriyoruz.
          </p>

          {/* Butonlar */}
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppLink(
                "Merhaba, hukuki danışmanlık için randevu almak istiyorum.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="bg-primary text-primary-foreground tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors duration-200 cursor-pointer"
                style={{
                  fontSize: "clamp(11px,1.3vh,14px)",
                  padding: "clamp(10px,1.3vh,16px) clamp(18px,2.2vw,30px)",
                }}
              >
                Randevu Al
              </button>
            </a>
            <a
              href={getWhatsAppLink(
                "Merhaba, hukuki danışmanlık hizmetleriniz hakkında bilgi almak istiyorum.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="border border-foreground/30 text-foreground tracking-[0.15em] uppercase hover:border-primary hover:text-primary transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
                style={{
                  fontSize: "clamp(11px,1.3vh,14px)",
                  padding: "clamp(10px,1.3vh,16px) clamp(18px,2.2vw,30px)",
                }}
              >
                Hizmetleri İncele
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </a>
          </div>

          <div
            className="flex items-center gap-4 border-t border-black/10"
            style={{ paddingTop: "clamp(12px,1.6vh,22px)" }}
          >
            <div
              className="rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary"
              style={{
                width: "clamp(38px,5vh,52px)",
                height: "clamp(38px,5vh,52px)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V7l-8-4z" />
              </svg>
            </div>
            <div>
              <p
                className="text-primary tracking-[0.2em] uppercase"
                style={{ fontSize: "clamp(11px,1.2vh,13px)" }}
              >
                Güven & Deneyim
              </p>
              <p
                className="text-muted-foreground mt-0.5"
                style={{ fontSize: "clamp(13px,1.6vh,16px)" }}
              >
                Yılların tecrübesi ile yanınızdayız.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sağ — fotoğraf */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="relative overflow-hidden"
        >
          <img
            src="assets/danisman.png"
            alt="Hukuk Danışmanı"
            className="w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #F0EDE8 0%, #F0EDE8 2%, transparent 28%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
