import { useEffect, useRef, useState } from "react";

interface Options {
  end: number;
  duration?: number;
  startOnView?: boolean;
}

export function useCountUp({ end, duration = 2, startOnView = true }: Options) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const animate = () => {
      if (hasRun.current) return;
      hasRun.current = true;
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(step);
        else setValue(end);
      };
      requestAnimationFrame(step);
    };

    if (!startOnView) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animate();
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return { ref, value };
}
