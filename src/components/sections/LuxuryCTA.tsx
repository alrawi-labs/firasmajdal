import { useState } from "react";
import heroImg from "../assets/hero.png";

export function LuxuryCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div
          className="relative overflow-hidden rounded-2xl flex items-center justify-center min-h-[420px]"
          style={{ border: "1px solid #c9a96e55" }}
        >
          {/* Arka plan */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
          />
          {/* Karartma katmanı */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0d0b08e0 0%, #0f0c06cc 60%, #07050399 100%)",
            }}
          />

          {/* İçerik */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 w-full">

            {/* İkon + çizgiler */}
            <div className="flex items-center gap-4 mb-1">
              <span
                className="h-px w-16"
                style={{ background: "linear-gradient(90deg, transparent, #c9a96e)" }}
              />
              <svg width="36" height="50" viewBox="0 0 38 52" fill="none">
                <rect x="16" y="0"  width="6" height="52" fill="#c9a96e" opacity="0.9" />
                <rect x="10" y="10" width="4" height="42" fill="#c9a96e" opacity="0.75" />
                <rect x="24" y="10" width="4" height="42" fill="#c9a96e" opacity="0.75" />
                <rect x="4"  y="22" width="4" height="30" fill="#c9a96e" opacity="0.55" />
                <rect x="30" y="22" width="4" height="30" fill="#c9a96e" opacity="0.55" />
              </svg>
              <span
                className="h-px w-16"
                style={{ background: "linear-gradient(90deg, #c9a96e, transparent)" }}
              />
            </div>

            {/* Elmas */}
            <div
              className="w-2 h-2 mb-5 rotate-45"
              style={{ border: "1px solid #c9a96e" }}
            />

            {/* Başlık */}
            <h2
              className="mb-5"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(26px, 4vw, 46px)",
                fontWeight: 400,
                letterSpacing: "6px",
                textTransform: "uppercase",
                color: "#c9a96e",
                lineHeight: 1.2,
              }}
            >
              Tüm Gayrimenkullerimiz
            </h2>

            {/* Açıklama */}
            <p
              className="mb-10 max-w-lg"
              style={{ fontSize: 15, color: "#d4cfc8", lineHeight: 1.75, fontWeight: 300 }}
            >
              Prestijli lokasyonlarda, seçkin yaşam alanları ve yüksek yatırım değeri sunan
              özel gayrimenkullerimizi keşfedin.
            </p>

            {/* Buton */}
            <a
              href="#properties"
              className="inline-flex items-center gap-4"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                background: hovered ? "#c9a96e" : "#0f0e0dcc",
                border: "1px solid #c9a96e",
                color: hovered ? "#0d0b08" : "#c9a96e",
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "4px",
                textTransform: "uppercase",
                padding: "16px 48px",
                borderRadius: 6,
                cursor: "pointer",
                transition: "background 0.35s ease, color 0.35s ease",
              }}
            >
              İletişime Geç
              <span
                style={{
                  fontSize: 18,
                  display: "inline-block",
                  transform: hovered ? "translateX(6px)" : "translateX(0)",
                  transition: "transform 0.3s ease",
                }}
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}