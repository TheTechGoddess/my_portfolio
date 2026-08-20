"use client";

import { useEffect, useMemo } from "react";

const PARTICLE_COUNT = 48;

const FireworksCelebration = ({ show, message, onComplete }) => {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const particles = useMemo(() => {
    const symbols = ["✦", "✶", "★", "❤", "•"];
    const colors = ["#FC458A", "#4599fc", "#FDE7EF", "#D1D5DB"];

    return Array.from({ length: PARTICLE_COUNT }).map((_, index) => {
      const angle = (Math.PI * 2 * index) / PARTICLE_COUNT;
      const distance = 80 + Math.random() * 160;
      return {
        id: `particle_${index}`,
        symbol: symbols[index % symbols.length],
        color: colors[index % colors.length],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        delay: (index % 8) * 40,
        size: 12 + Math.random() * 14,
      };
    });
  }, []);

  useEffect(() => {
    if (!show) return undefined;

    const timeout = setTimeout(
      () => {
        onComplete?.();
      },
      prefersReducedMotion ? 900 : 2400,
    );

    return () => clearTimeout(timeout);
  }, [onComplete, prefersReducedMotion, show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-[2px] pointer-events-none"
      role="status"
      aria-live="polite"
      aria-label="Feedback submitted celebration"
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {!prefersReducedMotion
          ? particles.map((particle) => (
              <span
                key={particle.id}
                className="absolute font-semibold select-none animate-[fireworkBurst_1.2s_ease-out_forwards]"
                style={{
                  color: particle.color,
                  fontSize: `${particle.size}px`,
                  transform: `translate(0px, 0px)`,
                  animationDelay: `${particle.delay}ms`,
                  // CSS variables for keyframe destination
                  "--burstX": `${particle.x}px`,
                  "--burstY": `${particle.y}px`,
                }}
              >
                {particle.symbol}
              </span>
            ))
          : null}

        <div className="relative z-10 text-center px-6">
          <p className="text-3xl md:text-5xl font-bold text-[#FDE7EF] drop-shadow-lg">
            {message}
          </p>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fireworkBurst {
          0% {
            transform: translate(0px, 0px) scale(0.4);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--burstX), var(--burstY)) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FireworksCelebration;
