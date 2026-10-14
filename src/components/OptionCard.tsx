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
      className={`group relative flex flex-col sm:flex-row items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200 text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-rose-500 border h-full ${
        isSelected
          ? "bg-rose-50/90 border-2 border-rose-500 shadow-[0_6px_20px_rgba(225,29,72,0.15)] ring-1 ring-rose-300/40 scale-[1.01]"
          : "bg-white hover:bg-rose-50/40 border-stone-200 hover:border-rose-300 shadow-xs hover:shadow-md hover:scale-[1.008]"
      }`}
    >
      {/* Icon container */}
      <div
        className={`flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-200 shadow-xs ${
          isSelected
            ? "bg-gradient-to-br from-red-500 to-rose-600 text-white scale-105 shadow-rose-500/25 ring-2 ring-rose-200"
            : "bg-rose-50/80 border border-rose-100 group-hover:scale-105 group-hover:bg-rose-100/70"
        }`}
      >
        <span>{option.emoji}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-4 sm:pr-6">
        <div className="flex items-center gap-1.5 flex-wrap mb-1">
          <h3
            className={`font-bold text-xs sm:text-sm leading-snug transition-colors ${
              isSelected ? "text-stone-900" : "text-stone-800 group-hover:text-rose-700"
            }`}
          >
            {option.title}
          </h3>
          {option.badge && (
            <span
              className={`text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider border ${
                isSelected
                  ? "bg-rose-600 text-white border-rose-600"
                  : "bg-stone-100 text-stone-600 border-stone-200 group-hover:border-rose-200 group-hover:text-rose-700"
              }`}
            >
              {option.badge}
            </span>
          )}
        </div>
        <p className="text-[11px] sm:text-xs text-stone-500 group-hover:text-stone-700 line-clamp-2 leading-relaxed">
          {option.description}
        </p>
      </div>

      {/* Stylized Checkmark Circle */}
      <div className="absolute right-2.5 top-2.5 sm:right-3.5 sm:top-3.5 flex items-center justify-center">
        <div
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            isSelected
              ? "border-rose-600 bg-rose-600 text-white shadow-[0_0_10px_rgba(225,29,72,0.4)] scale-110"
              : "border-stone-300 group-hover:border-rose-400 bg-white"
          }`}
        >
          {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />}
        </div>
      </div>
    </div>
  );
}
