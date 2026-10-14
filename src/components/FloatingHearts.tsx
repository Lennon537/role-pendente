"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  icon: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const ROMANTIC_PARTICLES = ["💌", "💖", "🌹", "✨", "❤️", "🕊️", "🍓", "🌸", "💕", "🤍"];

export function FloatingHearts() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate romantic ambient floating icons on client
    const items: Particle[] = Array.from({ length: 18 }).map((_, index) => ({
      id: index,
      icon: ROMANTIC_PARTICLES[index % ROMANTIC_PARTICLES.length],
      left: Math.random() * 92 + 4,
      top: Math.random() * 90 + 5,
      size: Math.floor(Math.random() * 12) + 16,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.35 + 0.15,
    }));
    setParticles(items);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute inline-block transition-opacity animate-subtle-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.icon}
        </span>
      ))}
    </div>
  );
}
