"use client";

import React, { useEffect, useState } from "react";

interface LightOrb {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FloatingHearts() {
  const [orbs, setOrbs] = useState<LightOrb[]>([]);

  useEffect(() => {
    // Generate subtle glowing ambient light orbs (no emojis)
    const items: LightOrb[] = Array.from({ length: 14 }).map((_, index) => ({
      id: index,
      left: Math.random() * 94 + 3,
      top: Math.random() * 92 + 4,
      size: Math.floor(Math.random() * 120) + 60,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.05,
    }));
    setOrbs(items);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-red-600/25 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-rose-600/15 blur-[100px]" />

      {/* Subtle floating light particles */}
      {orbs.map((o) => (
        <span
          key={o.id}
          className="absolute rounded-full bg-rose-300/30 blur-xl animate-subtle-float pointer-events-none"
          style={{
            left: `${o.left}%`,
            top: `${o.top}%`,
            width: `${o.size}px`,
            height: `${o.size}px`,
            opacity: o.opacity,
            animationDuration: `${o.duration}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
