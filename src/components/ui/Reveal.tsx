'use client';
import { useEffect, useRef, useState } from 'react';

/** Short, low-amplitude entrance. Disabled entirely under reduced motion. */
export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect(); } },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${shown ? 'reveal-in' : 'reveal'} ${className}`} style={{ transitionDelay: shown ? `${delay}ms` : undefined }}>
      {children}
    </div>
  );
}
