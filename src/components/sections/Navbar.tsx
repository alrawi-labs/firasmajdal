"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useLenis } from "@/components/scroll-system/providers/SmoothScrollProvider";

// ─── Animation Variants ───────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN:  [number, number, number, number] = [0.55, 0, 1, 0.45];

const navbarVariants: Variants = {
  hidden: { y: -80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};
const logoVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.2 } },
};
const navLinksContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};
const navLinkVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};
const actionsVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.5 } },
};
const drawerVariants: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
  exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.3, ease: EASE_IN } },
};
const drawerLinksContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};
const drawerLinkVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.25, ease: EASE_IN } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("nav");
  const t_wp = useTranslations("whatsapp");

  const { lenis } = useLenis();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Lenis smooth scroll — anchor link click handler
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (lenis) {
      lenis.scrollTo(href, {
        offset: -80,          // navbar yüksekliği
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      });
    } else {
      // Lenis henüz hazır değilse native fallback
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: t("home"),       href: "#hero"       },
    { label: t("about"),      href: "#about"      },
    { label: t("law"),        href: "#law"         },
    { label: t("estates"),    href: "#estates"    },
    { label: t("translator"), href: "#translator" },
    { label: t("contact"),    href: "#contact"    },
  ];

  return (
    <>
      <motion.nav
        variants={shouldReduceMotion ? undefined : navbarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow,backdrop-filter] duration-500 ease-out ${
          isScrolled
            ? "bg-secondary/95 backdrop-blur-md py-4 shadow-[0_4px_32px_rgba(0,0,0,0.18)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-3"
              variants={shouldReduceMotion ? undefined : logoVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <img
                src="assets/firas_logo_just.png"
                alt="Firas Real Estate"
                className="h-15 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-widest font-bold text-primary">
                  FİRAS
                </span>
                <span
                  className={`text-[0.65rem] tracking-[0.2em] font-medium transition-colors duration-500 ${
                    isScrolled ? "text-secondary-foreground/70" : "text-white/80"
                  }`}
                >
                  REAL ESTATE
                </span>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <motion.div
              className="hidden lg:flex items-center space-x-8"
              variants={shouldReduceMotion ? undefined : navLinksContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  variants={shouldReduceMotion ? undefined : navLinkVariants}
                  className={`text-sm font-medium tracking-wide relative group transition-colors duration-300 ${
                    isScrolled ? "text-secondary-foreground" : "text-white"
                  }`}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                </motion.a>
              ))}
            </motion.div>

            {/* Desktop Actions */}
            <motion.div
              className="hidden lg:flex items-center space-x-6"
              variants={shouldReduceMotion ? undefined : actionsVariants}
              initial="hidden"
              animate="visible"
            >
              <LanguageSwitcher light={!isScrolled} />
              <motion.a
                href={getWhatsAppLink(t_wp("default"))}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-6 py-2 h-auto tracking-wide uppercase text-xs font-bold border-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] cursor-pointer transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  {t("whatsapp")}
                </Button>
              </motion.a>
            </motion.div>

            {/* Mobile Hamburger */}
            <motion.button
              className="lg:hidden p-1 rounded"
              onClick={() => setIsMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Menüyü aç"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0, opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6 text-white" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={shouldReduceMotion ? undefined : drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-secondary/97 backdrop-blur-2xl lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between relative z-10">
  <LanguageSwitcher light />
  <motion.button
    onClick={() => setIsMobileMenuOpen(false)}
    whileHover={{ scale: 1.1, rotate: 90 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
    aria-label="Menüyü kapat"
  >
    <X className="w-8 h-8 text-white" />
  </motion.button>
</div>

            {/* Nav Links */}
            <motion.div
              className="flex-1 flex flex-col items-center justify-center space-y-2"
              variants={shouldReduceMotion ? undefined : drawerLinksContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  variants={shouldReduceMotion ? undefined : drawerLinkVariants}
                  className="font-serif text-3xl text-white/90 hover:text-primary transition-colors duration-300 py-3 px-8 relative group"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-4" />
                  {link.label}
                </motion.a>
              ))}

              {/* WhatsApp CTA */}
              <motion.div
                className="pt-10 w-full px-12"
                variants={shouldReduceMotion ? undefined : drawerLinkVariants}
              >
                <motion.a
                  href={getWhatsAppLink(t_wp("default"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  whileTap={{ scale: 0.97 }}
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-none py-6 text-base tracking-widest uppercase transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    {t("whatsapp")}
                  </Button>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Alt dekoratif çizgi */}
            <motion.div
              className="h-[1px] bg-primary/20 mx-6 mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}