'use client';

import { ReactNode } from 'react';
import { useParallax } from '../hooks/useParallax';

interface ParallaxLayerProps {
  children: ReactNode;
  /**
   * Kayma hızı:
   * - 0.1–0.3 = ince, zarif bir his (arka plan için ideal)
   * - 0.4–0.6 = belirgin parallax
   * - negatif = ters yön
   */
  speed?: number;
  horizontal?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ParallaxLayer — Scroll ile parallax hareketi veren wrapper.
 *
 * Kullanım:
 * ```tsx
 * // Arka plan görsel
 * <ParallaxLayer speed={0.2}>
 *   <img src="/hero-bg.jpg" alt="" />
 * </ParallaxLayer>
 *
 * // Öne çıkan ikon (ters yön)
 * <ParallaxLayer speed={-0.1}>
 *   <FloatingIcon />
 * </ParallaxLayer>
 * ```
 */
export default function ParallaxLayer({
  children,
  speed = 0.2,
  horizontal = 0,
  className,
  style,
}: ParallaxLayerProps) {
  const ref = useParallax<HTMLDivElement>({ speed, horizontal });

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
