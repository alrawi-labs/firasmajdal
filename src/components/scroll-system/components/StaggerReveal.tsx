'use client';

import { Children, ReactNode, cloneElement, isValidElement } from 'react';
import ScrollReveal from './ScrollReveal';

interface StaggerRevealProps {
  children: ReactNode;
  /** Her çocuk arasındaki gecikme farkı (ms). Varsayılan: 100 */
  staggerDelay?: number;
  /** İlk öğenin gecikmesi (ms). Varsayılan: 0 */
  initialDelay?: number;
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'scale-up' | 'blur-in';
  duration?: number;
  threshold?: number;
  className?: string;
}

/**
 * StaggerReveal — Çocuk bileşenleri sıralı gecikmeyle görünür kılar.
 *
 * Kullanım:
 * ```tsx
 * <StaggerReveal staggerDelay={120} variant="fade-up">
 *   <Card />
 *   <Card />
 *   <Card />
 * </StaggerReveal>
 * ```
 */
export default function StaggerReveal({
  children,
  staggerDelay = 100,
  initialDelay = 0,
  variant = 'fade-up',
  duration = 600,
  threshold = 0.1,
  className,
}: StaggerRevealProps) {
  const childArray = Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <ScrollReveal
          key={index}
          variant={variant}
          delay={initialDelay + index * staggerDelay}
          duration={duration}
          threshold={threshold}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
