"use client";


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Anasayfa", href: "#hero" },
    { label: "Hakkımızda", href: "#about" },
    { label: "Hukuk", href: "#law" },
    { label: "Gayrımenkuller", href: "#estates" },
    { label: "Tercüman", href: "#translator" },
    { label: "İletisim", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-secondary/95 backdrop-blur-md py-4 shadow-md"
            : "bg-transparent py-6"
          }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <img src="assets/firas_logo_just.png" alt="Firas Real Estate" className="h-15 w-auto object-contain" />
              <div className="flex flex-col">
                <span className={`font-serif text-2xl tracking-widest font-bold ${isScrolled ? "text-primary" : "text-primary"}`}>
                  FİRAS
                </span>
                <span className={`text-[0.65rem] tracking-[0.2em] font-medium ${isScrolled ? "text-secondary-foreground/70" : "text-white/80"}`}>
                  REAL ESTATE
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide relative group ${isScrolled ? "text-secondary-foreground" : "text-white"
                    }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <button className={`flex items-center space-x-2 text-sm font-medium ${isScrolled ? "text-secondary-foreground" : "text-white"} hover:text-primary transition-colors`}>
                <Globe className="w-4 h-4" />
                <span>TR / EN</span>
              </button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-6 py-2 h-auto tracking-wide uppercase text-xs font-bold border-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]">
                WhatsApp
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className={`w-6 h-6 ${isScrolled ? "text-white" : "text-white"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-secondary/95 backdrop-blur-xl lg:hidden flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-8 w-full px-12 flex flex-col space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-none py-6 text-base tracking-widest uppercase">
                  WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
