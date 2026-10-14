"use client";

import React from "react";
import { Step } from "@/types/invite";

interface StepIndicatorProps {
  currentStep: Step;
  selectedRole?: string | null;
  onNavigateTo?: (step: Step) => void;
}

const DEFAULT_STEPS: { step: Step; label: string; icon: string }[] = [
  { step: "role", label: "O Rolê", icon: "💌" },
  { step: "comida", label: "A Comida", icon: "🍔" },
  { step: "sobremesa", label: "Sobremesa", icon: "🍨" },
  { step: "dia", label: "O Dia", icon: "📅" },
  { step: "resumo", label: "Resumo", icon: "✨" },
];

const SINUCA_STEPS: { step: Step; label: string; icon: string }[] = [
  { step: "role", label: "O Rolê", icon: "💌" },
  { step: "sinuca_custom", label: "Bebida & Petiscos", icon: "🍻" },
  { step: "dia", label: "O Dia", icon: "📅" },
  { step: "resumo", label: "Resumo", icon: "✨" },
];

const FILME_GAME_STEPS: { step: Step; label: string; icon: string }[] = [
  { step: "role", label: "O Rolê", icon: "💌" },
  { step: "comida", label: "Snacks do Sofá", icon: "🍿" },
  { step: "dia", label: "O Dia", icon: "📅" },
  { step: "resumo", label: "Resumo", icon: "✨" },
];

const FOOD_BUNDLED_STEPS: { step: Step; label: string; icon: string }[] = [
  { step: "role", label: "O Rolê", icon: "💌" },
  { step: "sobremesa", label: "Sobremesa", icon: "🍨" },
  { step: "dia", label: "O Dia", icon: "📅" },
  { step: "resumo", label: "Resumo", icon: "✨" },
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
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-rose-600">
          <span>{stepsConfig[safeIndex]?.icon}</span>
          <span className="text-stone-800">
            Etapa {safeIndex + 1} de {stepsConfig.length}
          </span>
          <span className="text-stone-300 font-normal">•</span>
          <span className="text-rose-600 font-medium">
            {stepsConfig[safeIndex]?.label}
          </span>
        </span>
        <span className="font-mono text-xs bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-md font-bold shadow-xs">
          {progressPercent}%
        </span>
      </div>

      {/* Romantic Progress Bar */}
      <div className="w-full h-2.5 bg-rose-100/80 rounded-full overflow-hidden p-0.5 border border-rose-200 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(225,29,72,0.35)]"
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
                  ? "bg-rose-600 border border-rose-600 text-white shadow-sm font-bold"
                  : isDone
                  ? "bg-rose-50 border border-rose-200 text-rose-700 hover:border-rose-300 hover:bg-rose-100 cursor-pointer"
                  : "bg-white border border-stone-200 text-stone-400 cursor-default"
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
