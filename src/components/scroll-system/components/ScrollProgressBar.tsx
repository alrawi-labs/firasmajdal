'use client';

import { useScrollProgress } from '../hooks/useScrollProgress';

interface ScrollProgressBarProps {
  /** Bar rengi (CSS değeri). Varsayılan: accent renginiz */
  color?: string;
  /** Bar kalınlığı (px). Varsayılan: 3 */
  height?: number;
  /** Bar pozisyonu. Varsayılan: 'top' */
  position?: 'top' | 'bottom';
  /** z-index. Varsayılan: 9999 */
  zIndex?: number;
}

/**
 * ScrollProgressBar — Sayfanın üstüne veya altına sabitlenmiş ince ilerleme çubuğu.
 *
 * layout.tsx içine ekle:
 * ```tsx
 * <ScrollProgressBar color="var(--color-primary)" height={3} />
 * ```
 */
export default function ScrollProgressBar({
  color = 'hsl(220 90% 56%)',
  height = 3,
  position = 'top',
  zIndex = 9999,
}: ScrollProgressBarProps) {
  const { pageProgress } = useScrollProgress();

  return (
    <div
      style={{
        position: 'fixed',
        [position]: 0,
        left: 0,
        right: 0,
        height,
        zIndex,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${pageProgress * 100}%`,
          background: color,
          transition: 'width 60ms linear',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}
