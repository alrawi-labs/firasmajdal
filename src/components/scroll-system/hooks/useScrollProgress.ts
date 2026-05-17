'use client';

import { useEffect, useRef, useState, RefObject } from 'react';
import { useLenis } from '../providers/SmoothScrollProvider';

interface ScrollProgress {
  pageProgress: number;
  elementProgress: number;
  isVisible: boolean;
  scrollY: number;
}

export function useScrollProgress(elementRef?: RefObject<HTMLElement>): ScrollProgress {
  const [progress, setProgress] = useState<ScrollProgress>({
    pageProgress: 0, elementProgress: 0, isVisible: false, scrollY: 0,
  });
  const { lenis } = useLenis();

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

      let elementProgress = 0;
      let isVisible = false;

      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const viewH = window.innerHeight;
        isVisible = rect.top < viewH && rect.bottom > 0;
        const start = viewH;
        const end = -rect.height;
        elementProgress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      }

      setProgress({ pageProgress, elementProgress, isVisible, scrollY });
    };

    // Lenis varsa ona bağlan, yoksa native scroll
    if (lenis) {
      lenis.on('scroll', update);
      update();
      return () => lenis.off('scroll', update);
    } else {
      window.addEventListener('scroll', update, { passive: true });
      update();
      return () => window.removeEventListener('scroll', update);
    }
  }, [lenis, elementRef]);

  return progress;
}