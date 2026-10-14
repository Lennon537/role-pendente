"use client";

import React from "react";
import { Step } from "@/types/invite";

interface StepIndicatorProps {
  currentStep: Step;
  selectedRole?: string | null;
  onNavigateTo?: (step: Step) => void;
}

const DEFAULT_STEPS: { step: Step; label: string }[] = [
  { step: "role", label: "O Rolê" },
  { step: "comida", label: "A Comida" },
  { step: "sobremesa", label: "Sobremesa" },
  { step: "dia", label: "O Dia" },
  { step: "resumo", label: "Resumo" },
];

const SINUCA_STEPS: { step: Step; label: string }[] = [
  { step: "role", label: "O Rolê" },
  { step: "sinuca_custom", label: "Bebida & Petiscos" },
  { step: "dia", label: "O Dia" },
  { step: "resumo", label: "Resumo" },
];

const FILME_GAME_STEPS: { step: Step; label: string }[] = [
  { step: "role", label: "O Rolê" },
  { step: "comida", label: "Snacks do Sofá" },
  { step: "dia", label: "O Dia" },
  { step: "resumo", label: "Resumo" },
];

const FOOD_BUNDLED_STEPS: { step: Step; label: string }[] = [
  { step: "role", label: "O Rolê" },
  { step: "sobremesa", label: "Sobremesa" },
  { step: "dia", label: "O Dia" },
  { step: "resumo", label: "Resumo" },
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
          <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">
            {safeIndex + 1}
          </span>
          <span className="text-stone-800">
            Etapa {safeIndex + 1} de {stepsConfig.length}
          </span>
          <span className="text-stone-300 font-normal">•</span>
          <span className="text-rose-600 font-medium">
            {stepsConfig[safeIndex]?.label}
          </span>
        </span>
        <span className="font-mono text-xs bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-md font-bold shadow-xs">
          {progressPercent}%
        </span>
      </div>

      {/* Romantic Progress Bar */}
      <div className="w-full h-2 bg-rose-100 rounded-full overflow-hidden p-0.5 border border-rose-200">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 rounded-full transition-all duration-500 ease-out shadow-sm"
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
              className={`flex-1 py-1.5 px-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all text-center flex items-center justify-center gap-1.5 truncate ${
                isCurrent
                  ? "bg-rose-600 border border-rose-600 text-white shadow-xs font-bold"
                  : isDone
                  ? "bg-rose-50 border border-rose-200 text-rose-700 hover:border-rose-300 hover:bg-rose-100 cursor-pointer"
                  : "bg-stone-50 border border-stone-200 text-stone-400 cursor-default"
              }`}
            >
              <span className="text-[10px] opacity-75 font-mono">{index + 1}.</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
