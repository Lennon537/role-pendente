"use client";

import React from "react";
import { OptionItem } from "@/types/invite";
import { Check } from "lucide-react";

interface OptionCardProps {
  option: OptionItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function OptionCard({ option, isSelected, onSelect }: OptionCardProps) {
  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(option.id)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onSelect(option.id);
        }
      }}
      className={`group relative flex flex-col sm:flex-row items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200 text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 border h-full ${
        isSelected
          ? "bg-slate-900/95 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.18)] ring-1 ring-emerald-500/40 scale-[1.01]"
          : "bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700 hover:shadow-lg hover:scale-[1.008]"
      }`}
    >
      {/* Icon container */}
      <div
        className={`flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-200 shadow-sm ${
          isSelected
            ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white scale-105 shadow-emerald-500/25 ring-1 ring-emerald-400/40"
            : "bg-slate-800/90 border border-slate-700 group-hover:scale-105 group-hover:bg-slate-700/80"
        }`}
      >
        <span>{option.emoji}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-4 sm:pr-6">
        <div className="flex items-center gap-1.5 flex-wrap mb-1">
          <h3
            className={`font-bold text-xs sm:text-sm leading-snug transition-colors ${
              isSelected ? "text-white" : "text-slate-200 group-hover:text-white"
            }`}
          >
            {option.title}
          </h3>
          {option.badge && (
            <span
              className={`text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider border ${
                isSelected
                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-800 text-slate-400 border-slate-700 group-hover:text-slate-300"
              }`}
            >
              {option.badge}
            </span>
          )}
        </div>
        <p className="text-[11px] sm:text-xs text-slate-400 group-hover:text-slate-300 line-clamp-2 leading-relaxed">
          {option.description}
        </p>
      </div>

      {/* Stylized Checkmark Circle */}
      <div className="absolute right-2.5 top-2.5 sm:right-3.5 sm:top-3.5 flex items-center justify-center">
        <div
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            isSelected
              ? "border-emerald-500 bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.5)] scale-110"
              : "border-slate-600 group-hover:border-slate-400 bg-slate-900"
          }`}
        >
          {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
}
