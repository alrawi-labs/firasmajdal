"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  tr: "Türkçe",
  ar: "العربية",
  en: "English",
  fa: "فارسی",
  ru: "Русский",
  de: "Deutsch",
  tk: "Türkmençe",
  uz: "O'zbekcha",
};

const localeShort: Record<Locale, string> = {
  tr: "TR",
  ar: "AR",
  en: "EN",
  fa: "FA",
  ru: "RU",
  de: "DE",
  tk: "TK",
  uz: "UZ",
};

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Recalculate position on scroll/resize so the fixed dropdown stays aligned
  useEffect(() => {
    if (!open) return;
    function recalc() {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 160;
      const viewportWidth = window.innerWidth;

      // Anchor to left edge of button; if it overflows right, anchor to right edge instead
      let left = rect.left;
      if (left + dropdownWidth > viewportWidth - 8) {
        left = rect.right - dropdownWidth;
      }
      // Clamp so it never goes off-screen on the left either
      left = Math.max(8, left);

      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left,
        minWidth: dropdownWidth,
      });
    }
    recalc();
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
    };
  }, [open]);

  function handleToggle() {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 160;
      const viewportWidth = window.innerWidth;
      let left = rect.left;
      if (left + dropdownWidth > viewportWidth - 8) {
        left = rect.right - dropdownWidth;
      }
      left = Math.max(8, left);
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left,
        minWidth: dropdownWidth,
      });
    }
    setOpen((o) => !o);
  }

  function switchLocale(next: Locale) {
    if (next === locale) {
      setOpen(false);
      return;
    }
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
    setOpen(false);
  }

  const textColor = light ? "text-white" : "text-secondary-foreground";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`flex items-center gap-1.5 text-sm font-medium ${textColor} hover:text-primary transition-colors cursor-pointer`}
      >
        <Globe className="w-4 h-4" />
        <span>{localeShort[locale]}</span>
        <ChevronDown
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          style={{
            ...dropdownStyle,
            background: "rgba(14,11,7,0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "8px",
            overflow: "hidden",
            zIndex: 9999,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {routing.locales.map((l) => {
            const isActive = l === locale;
            return (
              <button
                key={l}
                onClick={() => switchLocale(l as Locale)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  background: isActive
                    ? "rgba(201,168,76,0.12)"
                    : "transparent",
                  borderBottom: "1px solid rgba(201,168,76,0.08)",
                  cursor: isActive ? "default" : "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(201,168,76,0.07)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: isActive ? "#C9A84C" : "rgba(255,255,255,0.5)",
                    minWidth: "24px",
                  }}
                >
                  {localeShort[l as Locale]}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {localeLabels[l as Locale]}
                </span>
                {isActive && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#C9A84C",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}