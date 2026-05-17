'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
  lerp?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

export default function SmoothScrollProvider({
  children,
  lerp = 0.08,
  wheelMultiplier = 1.2,
  touchMultiplier = 1.4,
}: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const instance = new Lenis({
      lerp: prefersReduced ? 1 : lerp,
      wheelMultiplier: prefersReduced ? 1 : wheelMultiplier,
      touchMultiplier: prefersReduced ? 1 : touchMultiplier,
      syncTouch: true,
    });

    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [lerp, wheelMultiplier, touchMultiplier]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}