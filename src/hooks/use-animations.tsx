import { useEffect, useRef, useState, type ReactNode } from "react";

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px", ...options },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [inView, options]);
  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transform: inView ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
        filter: inView ? "blur(0px)" : "blur(4px)",
        opacity: inView ? 1 : 0,
      }}
      className={`transition-all duration-[900ms] will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

export function CountUp({
  end,
  duration = 2200,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    // easeOutExpo for premium feel
    const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(end * ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  const formatted = val.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/**
 * Animated ROI / performance chart. Renders an SVG line + bars that draw in
 * when the chart scrolls into view.
 */
export function ROIChart({
  data,
  labels,
  height = 220,
  className = "",
}: {
  data: number[];
  labels: string[];
  height?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1800;
    const ease = (p: number) => 1 - Math.pow(1 - p, 3);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const W = 600;
  const H = height;
  const pad = { l: 36, r: 16, t: 20, b: 28 };
  const max = Math.max(...data) * 1.1;
  const stepX = (W - pad.l - pad.r) / (data.length - 1);
  const points = data.map((v, i) => {
    const x = pad.l + i * stepX;
    const y = pad.t + (H - pad.t - pad.b) * (1 - (v * progress) / max);
    return [x, y] as const;
  });
  const pathD = points
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");
  const areaD = `${pathD} L${points[points.length - 1][0]},${H - pad.b} L${points[0][0]},${H - pad.b} Z`;
  const yTicks = 4;

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
        <defs>
          <linearGradient id="roi-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="roi-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {/* grid */}
        {Array.from({ length: yTicks + 1 }).map((_, i) => {
          const y = pad.t + ((H - pad.t - pad.b) / yTicks) * i;
          const v = Math.round((max / yTicks) * (yTicks - i));
          return (
            <g key={i}>
              <line x1={pad.l} x2={W - pad.r} y1={y} y2={y} stroke="#E0F2FE" strokeWidth={1} />
              <text x={pad.l - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#64748B">
                {v}
              </text>
            </g>
          );
        })}
        {/* bars */}
        {points.map((p, i) => {
          const barH = H - pad.b - p[1];
          return (
            <rect
              key={i}
              x={p[0] - 10}
              y={p[1]}
              width={20}
              height={barH}
              rx={4}
              fill="url(#roi-area)"
              opacity={0.6}
            />
          );
        })}
        {/* area */}
        <path d={areaD} fill="url(#roi-area)" />
        {/* line */}
        <path d={pathD} fill="none" stroke="url(#roi-line)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {/* dots */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r={5} fill="#fff" stroke="#0EA5E9" strokeWidth={2.5} />
          </g>
        ))}
        {/* labels */}
        {labels.map((l, i) => (
          <text key={l} x={pad.l + i * stepX} y={H - 8} textAnchor="middle" fontSize="10" fill="#64748B">
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}
