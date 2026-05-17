"use client";

import { getWhatsAppLink } from "@/lib/whatsapp";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = "#C9A84C";
const GOLD_DIM = "#7f6c35ad";
const GOLD_HOVER = "rgba(201,168,76,0.12)";
const GEOJSON_URL = "/tr-cities.json";
const SVG_W = 1000;
const SVG_H = 420;

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
      .map(([lon, lat], i) => {
        const [x, y] = project(lon, lat, b);
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
  if (g.type === "MultiPolygon")
    return (g.coordinates as number[][][][])
      .map((p) => p.map((r) => ringToPath(r, b)).join(" "))
      .join(" ");
  return "";
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
  const pLon = (maxLon - minLon) * 0.02;
  const pLat = (maxLat - minLat) * 0.03;
  return {
    minLon: minLon - pLon,
    maxLon: maxLon + pLon,
    minLat: minLat - pLat,
    maxLat: maxLat + pLat,
  };
}

function getFeatureName(f: Feature): string {
  return (f.properties.name as string) || (f.properties.NAME as string) || "";
}

// ─── Province ─────────────────────────────────────────────────────────────────

interface ProvinceProps {
  d: string;
  isHovered: boolean;
  onMouseMove: (e: React.MouseEvent<SVGPathElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function Province({
  d,
  isHovered,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ProvinceProps) {
  return (
    <path
      d={d}
      fill={isHovered ? GOLD_HOVER : "#EDE8DE"}
      stroke={isHovered ? GOLD : GOLD_DIM}
      strokeWidth={isHovered ? 1.0 : 0.6}
      strokeDasharray={isHovered ? "none" : "3 2"}
      style={{
        cursor: "pointer",
        transition: "fill 0.2s ease, stroke 0.2s ease",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    />
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function TurkeyMap() {
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
    (e: React.MouseEvent<SVGPathElement>, name: string) => {
      if (!mapRef.current) return;
      const rect = mapRef.current.getBoundingClientRect();
      setTooltip({
        name,
        x: Math.min(e.clientX - rect.left + 12, rect.width - 150),
        y: Math.max(e.clientY - rect.top - 36, 6),
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  return (
    <>
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeIn  { from { opacity:0; transform:translateY(3px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <section
        className="mt-16 mb-25"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          userSelect: "none",
        }}
      >
        {/* ── Header ── */}
        <div
          className="mb-10"
          style={{ textAlign: "center", padding: "1.5rem 1rem 1rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                display: "block",
                height: "1px",
                width: "36px",
                background: `linear-gradient(90deg, transparent, ${GOLD})`,
              }}
            />
            <span
              style={{
                color: GOLD,
                fontFamily: "'Cinzel', serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.28em",
              }}
            >
              HİZMET KAPSAMIMIZ
            </span>
            <span
              style={{
                display: "block",
                height: "1px",
                width: "36px",
                background: `linear-gradient(90deg, ${GOLD}, transparent)`,
              }}
            />
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 3.8vw, 3rem)",
              lineHeight: 1.2,
              marginBottom: "8px",
              letterSpacing: "-0.01em",
            }}
          >
            Türkiye'nin 81 İlinde{" "}
            <em style={{ fontStyle: "italic", color: GOLD }}>Yanınızdayız</em>
          </h2>

          <p
            style={{
              color: "var(--muted-foreground, rgba(140,130,110,0.9))",
              fontSize: "18px",
              lineHeight: 1.6,
              maxWidth: "580px",
              margin: "0 auto",
            }}
          >
            Gayrimenkul, hukuki danışmanlık ve Arapça-Türkçe yeminli tercümanlık
            hizmetlerimiz tüm Türkiye'de geçerlidir.
          </p>
        </div>

        {/* ── Map ── */}
        <div
          ref={mapRef}
          style={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* Tooltip */}
          {tooltip && (
            <div
              style={{
                position: "absolute",
                pointerEvents: "none",
                left: tooltip.x,
                top: tooltip.y,
                zIndex: 20,
                animation: "fadeIn 0.15s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: GOLD,
                  textTransform: "uppercase",
                }}
              >
                {tooltip.name}
              </span>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
                gap: "10px",
                color: GOLD_DIM,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "14px",
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  border: `1.5px solid ${GOLD_DIM}`,
                  borderTopColor: GOLD,
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.85s linear infinite",
                }}
              />
              Harita yükleniyor…
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
                color: GOLD_DIM,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "14px",
              }}
            >
              Harita yüklenemedi. Sayfayı yenileyin.
            </div>
          )}

          {/* SVG */}
          {geo && bounds && (
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              style={{ display: "block", width: "100%", maxHeight: "540px" }}
              aria-label="Türkiye İl Haritası"
            >
              {geo.features.map((feature) => {
                const name = getFeatureName(feature);
                return (
                  <Province
                    key={name}
                    d={featureToPath(feature, bounds)}
                    isHovered={hovered === name}
                    onMouseMove={(e) => handleMouseMove(e, name)}
                    onMouseEnter={() => setHovered(name)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      window.open(
                        getWhatsAppLink(
                          `Merhaba, ${name} ilinde hizmetleriniz hakkında bilgi almak istiyorum.`,
                        ),
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                  />
                );
              })}
            </svg>
          )}
        </div>
      </section>
    </>
  );
}
