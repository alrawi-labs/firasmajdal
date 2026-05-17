'use client';

import { useEffect, useRef, RefObject } from 'react';
import { useLenis } from '../providers/SmoothScrollProvider';

type AnimationVariant =
  | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right'
  | 'fade' | 'scale-up' | 'blur-in';

interface UseScrollAnimationOptions {
  variant?: AnimationVariant;
  threshold?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const VARIANTS: Record<AnimationVariant, { hidden: string; visible: string }> = {
  'fade-up':    { hidden: 'opacity: 0; transform: translateY(40px);',  visible: 'opacity: 1; transform: translateY(0px);' },
  'fade-down':  { hidden: 'opacity: 0; transform: translateY(-40px);', visible: 'opacity: 1; transform: translateY(0px);' },
  'fade-left':  { hidden: 'opacity: 0; transform: translateX(40px);',  visible: 'opacity: 1; transform: translateX(0px);' },
  'fade-right': { hidden: 'opacity: 0; transform: translateX(-40px);', visible: 'opacity: 1; transform: translateX(0px);' },
  'fade':       { hidden: 'opacity: 0;',                               visible: 'opacity: 1;' },
  'scale-up':   { hidden: 'opacity: 0; transform: scale(0.92);',       visible: 'opacity: 1; transform: scale(1);' },
  'blur-in':    { hidden: 'opacity: 0; filter: blur(12px); transform: translateY(20px);', visible: 'opacity: 1; filter: blur(0px); transform: translateY(0px);' },
};

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): RefObject<T | null> {
  const { variant = 'fade-up', threshold = 0.15, delay = 0, duration = 700, once = true } = options;
  const ref = useRef<T>(null);
  const { lenis } = useLenis();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const { hidden, visible } = VARIANTS[variant];

    el.style.cssText += `${hidden} transition: opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms; will-change: transform, opacity;`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.cssText += visible;
            if (once) {
              observer.unobserve(el);
              setTimeout(() => { el.style.willChange = 'auto'; }, duration + delay + 100);
            }
          } else if (!once) {
            el.style.cssText += hidden;
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    // Lenis scroll'unda IntersectionObserver'ı manuel tetikle
    const onLenisScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * (1 - threshold) && rect.bottom > 0;
      if (inView) {
        el.style.cssText += visible;
        if (once) {
          lenis?.off('scroll', onLenisScroll);
          observer.unobserve(el);
          setTimeout(() => { el.style.willChange = 'auto'; }, duration + delay + 100);
        }
      }
    };

    lenis?.on('scroll', onLenisScroll);

    return () => {
      observer.disconnect();
      lenis?.off('scroll', onLenisScroll);
    };
  }, [variant, threshold, delay, duration, once, lenis]);

  return ref;
}