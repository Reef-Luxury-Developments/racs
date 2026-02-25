import { useEffect, useRef, useState } from 'react';

interface AnimatedMetricProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3;

export const AnimatedMetric = ({ end, prefix = '', suffix = '', duration = 1200 }: AnimatedMetricProps): JSX.Element => {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;

        hasAnimatedRef.current = true;
        const startTime = performance.now();

        const tick = (now: number): void => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutCubic(progress);
          const nextValue = Math.round(end * easedProgress);

          setValue(nextValue);

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [duration, end]);

  const formatted = new Intl.NumberFormat('en-US').format(value);

  return (
    <span ref={elementRef}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
