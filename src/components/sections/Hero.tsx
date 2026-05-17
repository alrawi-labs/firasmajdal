"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section
      className="relative w-full h-[100dvh] flex items-center overflow-hidden bg-secondary"
      id="hero"
    >
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent z-10" />
        <img
          src="assets/hero_bg.png"
          alt="Luxury Istanbul Bosphorus View"
          className="w-full h-full object-cover ken-burns"
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-8 mt-16 md:mt-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-white font-bold tracking-[0.3em] uppercase text-sm mb-6">
                Guven - DeneyIm - Basari
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            >
              <span className="text-primary  block">
                Profesyonel Gayrimenkul
              </span>
              <span className="text-white italic block mt-2">
                Yeminli Tercüman
              </span>
              <span className="text-primary italic block mt-2">
                ve Hukuki Danismanlik
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light"
            >
              Türkiye'nin en prestijli lokasyonlarında lüks emlak
              yatırımlarınız, hukuki süreçleriniz ve Arapça-Türkçe yeminli
              tercümanlık hizmetleriniz için kişiselleştirilmiş, üst düzey
              danışmanlık hizmeti.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-base tracking-widest uppercase rounded-none border-none cursor-pointer"
                >
                  İletişime Geçin
                </Button>
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-base tracking-widest uppercase rounded-none text-white border-white/30 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  Hizmetlerimizi Keşfet
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-100 lg:w-2/5 hidden lg:flex justify-end"
          ></motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-primary absolute top-0"
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
