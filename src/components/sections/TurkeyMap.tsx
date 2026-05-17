"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = "#fff";
const GOLD_BRIGHT = "#E8C96A";
const GOLD_DIM = "#fff";

const SVG_W = 1000;
const SVG_H = 420;
const GEOJSON_URL = "/cities/tr-cities.json";

const EX = 4;
const EY = 6;
const STEPS = 6;

const SHIMMER_CITIES = [
  { name: "İstanbul", lon: 28.97, lat: 41.01 },
  { name: "Ankara", lon: 32.86, lat: 39.93 },
  { name: "İzmir", lon: 27.14, lat: 38.42 },
  { name: "Antalya", lon: 30.71, lat: 36.9 },
  { name: "Bursa", lon: 29.06, lat: 40.18 },
  { name: "Trabzon", lon: 39.73, lat: 41.0 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Geometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
}
interface Feature {
  type: string;
  properties: Record<string, unknown>;
  geometry: Geometry;
}
interface GeoJSON {
  type: string;
  features: Feature[];
}
interface Bounds {
  minLon: number;
  maxLon: number;
  minLat: number;
  maxLat: number;
}
interface Tooltip {
  name: string;
  x: number;
  y: number;
}

// ─── Variants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerV: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const lineV: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.65, ease: EASE } },
};
const mapV: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: EASE, delay: 0.2 },
  },
};
const tipV: Variants = {
  hidden: { opacity: 0, y: 5, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.16 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// ─── Geo helpers ──────────────────────────────────────────────────────────────

function project(lon: number, lat: number, b: Bounds): [number, number] {
  return [
    ((lon - b.minLon) / (b.maxLon - b.minLon)) * SVG_W,
    ((b.maxLat - lat) / (b.maxLat - b.minLat)) * SVG_H,
  ];
}
function ringToPath(ring: number[][], b: Bounds): string {
  return (
    ring
      .map(([lo, la], i) => {
        const [x, y] = project(lo, la, b);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}
function featureToPath(f: Feature, b: Bounds): string {
  const g = f.geometry;
  if (g.type === "Polygon")
    return (g.coordinates as number[][][])
      .map((r) => ringToPath(r, b))
      .join(" ");
  return (g.coordinates as number[][][][])
    .map((p) => p.map((r) => ringToPath(r, b)).join(" "))
    .join(" ");
}
function getBounds(features: Feature[]): Bounds {
  let minLon = Infinity,
    maxLon = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;
  features.forEach((f) => {
    const coords: number[][] = [];
    if (f.geometry.type === "Polygon")
      (f.geometry.coordinates as number[][][]).forEach((r) =>
        coords.push(...r),
      );
    else
      (f.geometry.coordinates as number[][][][]).forEach((p) =>
        p.forEach((r) => coords.push(...r)),
      );
    coords.forEach(([lo, la]) => {
      if (lo < minLon) minLon = lo;
      if (lo > maxLon) maxLon = lo;
      if (la < minLat) minLat = la;
      if (la > maxLat) maxLat = la;
    });
  });
  const pl = (maxLon - minLon) * 0.02,
    pb = (maxLat - minLat) * 0.03;
  return {
    minLon: minLon - pl,
    maxLon: maxLon + pl,
    minLat: minLat - pb,
    maxLat: maxLat + pb,
  };
}
function getName(f: Feature): string {
  return (f.properties.name as string) || (f.properties.NAME as string) || "";
}

// ─── 3D Province ─────────────────────────────────────────────────────────────

function Province3D({
  d,
  isHovered,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  d: string;
  isHovered: boolean;
  onMouseMove: (e: React.MouseEvent<SVGGElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  return (
    <g
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {Array.from({ length: STEPS }, (_, i) => {
        const t = i / (STEPS - 1);
        const ox = EX * (1 - t);
        const oy = EY * (1 - t);
        const isTop = i === STEPS - 1;

        let fill: string;
        if (isTop) {
          fill = isHovered ? "rgba(232,201,106,0.28)" : "rgba(201,168,76,0.13)";
        } else {
          const alpha = 0.15 + t * 0.35;
          fill = isHovered
            ? `rgba(200,155,40,${alpha})`
            : `rgba(140,110,40,${alpha * 0.7})`;
        }

        return (
          <path
            key={i}
            d={d}
            transform={`translate(${ox.toFixed(2)},${oy.toFixed(2)})`}
            fill={fill}
            stroke={isTop ? (isHovered ? GOLD_BRIGHT : GOLD_DIM) : "none"}
            strokeWidth={isTop ? (isHovered ? 1.2 : 0.55) : 0}
            style={{ transition: "fill 0.28s ease, stroke 0.28s ease" }}
          />
        );
      })}

      {/* Işık kenarı */}
      <path
        d={d}
        transform={`translate(${(EX * 0.25).toFixed(2)},${(EY * 0.25).toFixed(2)})`}
        fill="none"
        stroke={isHovered ? `${GOLD_BRIGHT}55` : "rgba(255,240,190,0.07)"}
        strokeWidth={isHovered ? 1.6 : 0.7}
        style={{ transition: "stroke 0.28s ease", pointerEvents: "none" }}
      />

      {/* Hover kontur + glow — il sınırlarına yapışık */}
      {isHovered && (
        <path
          d={d}
          fill="none"
          stroke={GOLD}
          strokeWidth={1.4}
          style={{
            filter: `drop-shadow(0 0 6px ${GOLD}) drop-shadow(0 0 14px ${GOLD}66)`,
            pointerEvents: "none",
          }}
        />
      )}
    </g>
  );
}

// ─── Shimmer Dot ─────────────────────────────────────────────────────────────

function ShimmerDot({
  x,
  y,
  delay,
}: {
  x: number;
  y: number;
  name: string;
  delay: number;
}) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r={6}
        fill="none"
        stroke={GOLD}
        strokeWidth={0.8}
        animate={{ r: [6, 14], opacity: [0.6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, delay, ease: "easeOut" }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={4}
        fill="none"
        stroke={GOLD_BRIGHT}
        strokeWidth={0.6}
        animate={{ r: [4, 10], opacity: [0.4, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          delay: delay + 0.4,
          ease: "easeOut",
        }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={2.2}
        fill={GOLD_BRIGHT}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          delay,
          ease: "easeInOut",
        }}
        style={{ filter: `drop-shadow(0 0 4px ${GOLD})` }}
      />
    </g>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function TurkeyMap() {
  const t = useTranslations("map");
  const [geo, setGeo] = useState<GeoJSON | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d: GeoJSON) => {
        setGeo(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const bounds = geo ? getBounds(geo.features) : null;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGGElement>, name: string) => {
      if (!mapRef.current) return;
      const rect = mapRef.current.getBoundingClientRect();
      setTooltip({
        name,
        x: Math.min(e.clientX - rect.left + 14, rect.width - 170),
        y: Math.max(e.clientY - rect.top - 50, 6),
      });
    },
    [],
  );

  const handleLeave = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  return (
    <section
      id="map"
      className="scroll-mt-20 relative"
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        userSelect: "none",
        padding: "clamp(56px,10vh,112px) clamp(16px,5vw,72px)",
        background: "transparent",
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <motion.div
        className="mb-14 text-center"
        variants={headerV}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div
          variants={itemV}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <motion.span
            variants={lineV}
            className="block h-px w-10"
            style={{
              background: `linear-gradient(90deg,transparent,#C9A84C)`,
              transformOrigin: "right",
            }}
          />
          <span
            style={{
              color: "#C9A84C",
              fontFamily: "'Cinzel',serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {t("badge")}
          </span>
          <motion.span
            variants={lineV}
            className="block h-px w-10"
            style={{
              background: `linear-gradient(90deg,#C9A84C,transparent)`,
              transformOrigin: "left",
            }}
          />
        </motion.div>

        <motion.h2
          variants={itemV}
          className="font-light leading-[1.15] mb-4 tracking-[-0.01em]"
          style={{ fontSize: "clamp(2.2rem,3.8vw,3rem)" }}
        >
          {t("title")}{" "}
          <em style={{ fontStyle: "italic", color: "#C9A84C" }}>
            {t("titleHighlight")}
          </em>
        </motion.h2>

        <motion.p
          variants={itemV}
          className="mx-auto leading-relaxed"
          style={{
            color: "rgba(201,168,76,0.55)",
            fontSize: "clamp(14px,1.7vh,17px)",
            maxWidth: "520px",
          }}
        >
          {t("desc")}
        </motion.p>
      </motion.div>

      {/* ── Map ─────────────────────────────────────────────────────────── */}
      <motion.div
        ref={mapRef}
        variants={mapV}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        // Sadece pozisyon — arka plan yok, overflow visible ki glow kesilmesin
        className="relative"
        style={{ overflow: "visible" }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {tooltip && (
            <motion.div
              key={tooltip.name}
              variants={tipV}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: "absolute",
                pointerEvents: "none",
                left: tooltip.x,
                top: tooltip.y,
                zIndex: 30,
                background: "rgba(14,12,9,0.95)",
                backdropFilter: "blur(12px)",
                borderRadius: "4px",
                padding: "7px 16px",
                border: `1px solid ${GOLD}55`,
                boxShadow: `0 0 20px ${GOLD}22`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: GOLD_BRIGHT,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {tooltip.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading */}
        {loading && (
          <div
            className="flex items-center justify-center gap-3 h-52"
            style={{
              color: GOLD_DIM,
              fontSize: "13px",
              letterSpacing: "0.1em",
            }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.85, ease: "linear" }}
              style={{
                width: 14,
                height: 14,
                border: `1.5px solid ${GOLD_DIM}`,
                borderTopColor: GOLD,
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            {t("loading")}
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="flex items-center justify-center h-52"
            style={{ color: GOLD_DIM, fontSize: "13px" }}
          >
            {t("error")}
          </div>
        )}

        {/* SVG — overflow visible ki kenar glow'ları kesilmesin */}
        {geo && bounds && (
          <svg
            viewBox={`-${EX + 10} -10 ${SVG_W + EX + 20} ${SVG_H + EY + 20}`}
            style={{
              display: "block",
              width: "100%",
              maxHeight: "560px",
              overflow: "visible",
            }}
            aria-label={t("ariaLabel")}
          >
            <defs>
              {/* Tüm haritaya hafif altın ambient */}
              <filter id="ambient" x="-12%" y="-12%" width="124%" height="124%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor={GOLD} floodOpacity="0.07" result="c" />
                <feComposite in="c" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Harita dış glow — il sınırlarına kat */}
              <filter
                id="map-glow"
                x="-15%"
                y="-15%"
                width="130%"
                height="130%"
              >
                <feGaussianBlur
                  in="SourceAlpha"
                  stdDeviation="10"
                  result="blur"
                />
                <feFlood floodColor={GOLD} floodOpacity="0.18" result="color" />
                <feComposite
                  in="color"
                  in2="blur"
                  operator="in"
                  result="shadow"
                />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Shimmer nokta glow */}
              <filter
                id="dot-glow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* İller — dış glow haritanın gerçek şekline uygulanıyor */}
            <g filter="url(#map-glow)">
              <g filter="url(#ambient)">
                {geo.features.map((feature) => {
                  const name = getName(feature);
                  return (
                    <Province3D
                      key={name}
                      d={featureToPath(feature, bounds)}
                      isHovered={hovered === name}
                      onMouseMove={(e) => handleMouseMove(e, name)}
                      onMouseEnter={() => setHovered(name)}
                      onMouseLeave={handleLeave}
                      onClick={() => {
                        const message = t("whatsappMessage", { city: name });
                        window.location.href = getWhatsAppLink(message);
                      }}
                    />
                  );
                })}
              </g>
            </g>

            {/* Parıltı noktaları */}
            <g filter="url(#dot-glow)">
              {SHIMMER_CITIES.map((city, i) => {
                const [cx, cy] = project(city.lon, city.lat, bounds);
                return (
                  <ShimmerDot
                    key={city.name}
                    x={cx}
                    y={cy}
                    name={city.name}
                    delay={i * 0.38}
                  />
                );
              })}
            </g>
          </svg>
        )}
      </motion.div>

      {/* Alt hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="text-center mt-6"
        style={{
          color: GOLD_DIM,
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {t("hint")}
      </motion.p>
    </section>
  );
}
