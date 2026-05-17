'use client';

import { useEffect, useRef, RefObject } from 'react';
import { useLenis } from '../providers/SmoothScrollProvider';

interface UseParallaxOptions {
  speed?: number;
  horizontal?: number;
  breakpoint?: number;
}

export function useParallax<T extends HTMLElement>(
  options: UseParallaxOptions = {}
): RefObject<T | null> {
  const { speed = 0.2, horizontal = 0, breakpoint = 768 } = options;
  const ref = useRef<T>(null);
  const { lenis } = useLenis();

  const currentY = useRef(0);
  const currentX = useRef(0);
  const targetY = useRef(0);
  const targetX = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    el.style.willChange = 'transform';

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function calculate() {
      if (!el || window.innerWidth < breakpoint) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
      targetY.current = progress * speed * 100;
      targetX.current = progress * horizontal * 100;
    }

    function animate() {
      calculate();
      currentY.current = lerp(currentY.current, targetY.current, 0.1);
      currentX.current = lerp(currentX.current, targetX.current, 0.1);
      if (el) {
        el.style.transform = `translate3d(${currentX.current.toFixed(3)}px, ${currentY.current.toFixed(3)}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    // Lenis scroll event'ine bağla — native scroll yerine
    const onLenisScroll = () => { calculate(); };
    lenis?.on('scroll', onLenisScroll);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis?.off('scroll', onLenisScroll);
      if (el) el.style.willChange = 'auto';
    };
  }, [speed, horizontal, breakpoint, lenis]);

  return ref;
}