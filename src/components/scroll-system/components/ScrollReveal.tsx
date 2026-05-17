'use client';

import { ReactNode, ElementType } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type AnimationVariant =
  | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right'
  | 'fade' | 'scale-up' | 'blur-in';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: ElementType; // JSX.IntrinsicElements yerine ElementType
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
  className,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useScrollAnimation<HTMLDivElement>({
    variant, delay, duration, threshold, once,
  });

  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}