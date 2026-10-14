"use client";

import React from "react";
import { Step } from "@/types/invite";

interface StepIndicatorProps {
  currentStep: Step;
  selectedRole?: string | null;
  onNavigateTo?: (step: Step) => void;
}

const DEFAULT_STEPS: { step: Step; label: string; icon: string }[] = [
  { step: "role", label: "O Rolê", icon: "🎯" },
  { step: "comida", label: "A Comida", icon: "🍔" },
  { step: "sobremesa", label: "Sobremesa", icon: "🍨" },
  { step: "dia", label: "O Dia", icon: "📅" },
  { step: "resumo", label: "Resumo", icon: "🚀" },
];

const SINUCA_STEPS: { step: Step; label: string; icon: string }[] = [
  { step: "role", label: "O Rolê", icon: "🎯" },
  { step: "sinuca_custom", label: "Bebida & Petiscos", icon: "🍻" },
  { step: "dia", label: "O Dia", icon: "📅" },
  { step: "resumo", label: "Resumo", icon: "🚀" },
];

const FILME_GAME_STEPS: { step: Step; label: string; icon: string }[] = [
  { step: "role", label: "O Rolê", icon: "🎯" },
  { step: "comida", label: "Snacks do Sofá", icon: "🍿" },
  { step: "dia", label: "O Dia", icon: "📅" },
  { step: "resumo", label: "Resumo", icon: "🚀" },
];

const FOOD_BUNDLED_STEPS: { step: Step; label: string; icon: string }[] = [
  { step: "role", label: "O Rolê", icon: "🎯" },
  { step: "sobremesa", label: "Sobremesa", icon: "🍨" },
  { step: "dia", label: "O Dia", icon: "📅" },
  { step: "resumo", label: "Resumo", icon: "🚀" },
];

export function StepIndicator({
  currentStep,
  selectedRole,
  onNavigateTo,
}: StepIndicatorProps) {
  if (currentStep === "invite") return null;

  let stepsConfig = DEFAULT_STEPS;
  if (selectedRole === "sinuca") {
    stepsConfig = SINUCA_STEPS;
  } else if (selectedRole === "filme_game") {
    stepsConfig = FILME_GAME_STEPS;
  } else if (selectedRole === "espetinho" || selectedRole === "salgado_role") {
    stepsConfig = FOOD_BUNDLED_STEPS;
  }

  const currentIndex = stepsConfig.findIndex((s) => s.step === currentStep);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const progressPercent = Math.round(((safeIndex + 1) / stepsConfig.length) * 100);

  return (
    <div className="w-full mb-6">
      {/* Step Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2.5 px-1">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-400">
          <span>{stepsConfig[safeIndex]?.icon}</span>
          <span className="text-white">
            Etapa {safeIndex + 1} de {stepsConfig.length}
          </span>
          <span className="text-slate-600 font-normal">•</span>
          <span className="text-emerald-300 font-medium">
            {stepsConfig[safeIndex]?.label}
          </span>
        </span>
        <span className="font-mono text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-md font-bold shadow-xs">
          {progressPercent}%
        </span>
      </div>

      {/* Modern Sleek Progress Bar */}
      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(16,185,129,0.5)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Pills */}
      <div className="flex justify-between items-center mt-3 px-1 gap-1.5">
        {stepsConfig.map((item, index) => {
          const isDone = index < safeIndex;
          const isCurrent = index === safeIndex;
          const isClickable = isDone && onNavigateTo;

          return (
            <button
              key={item.step}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onNavigateTo(item.step)}
              className={`flex-1 py-1.5 px-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all text-center flex items-center justify-center gap-1 truncate ${
                isCurrent
                  ? "bg-emerald-500/20 border border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)] font-bold"
                  : isDone
                  ? "bg-slate-900 border border-slate-700/80 text-slate-300 hover:border-emerald-500/40 hover:text-white cursor-pointer"
                  : "bg-slate-950/70 border border-slate-800/80 text-slate-600 cursor-default"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
