"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Dices, Sparkles, X, Check, ArrowRight } from "lucide-react";
import {
  ROLE_OPTIONS,
  SINUCA_OPTIONS,
  COMIDA_OPTIONS,
  FILME_GAME_COMIDA_OPTIONS,
  SOBREMESA_OPTIONS,
  DIA_OPTIONS,
} from "@/data/options";
import { DateSelections } from "@/types/invite";

interface DestinyRouletteModalProps {
  onApplyCombo: (selections: DateSelections) => void;
}

export function DestinyRouletteModal({ onApplyCombo }: DestinyRouletteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultCombo, setResultCombo] = useState<{
    roleId: string;
    roleTitle: string;
    roleEmoji: string;
    foodTitle: string;
    foodEmoji: string;
    sobremesaTitle?: string;
    diaTitle: string;
    diaEmoji: string;
    selections: DateSelections;
  } | null>(null);

  const spinRoulette = () => {
    setIsSpinning(true);
    setResultCombo(null);

    // Randomize role
    const randomRole =
      ROLE_OPTIONS[Math.floor(Math.random() * ROLE_OPTIONS.length)];

    let foodTitle = "";
    let foodEmoji = "";
    let comidaId: string | null = null;
    let sinucaComboId: string | null = null;
    let sobremesaId: string | null = null;
    let sobremesaTitle: string | undefined = undefined;

    if (randomRole.id === "sinuca") {
      const s =
        SINUCA_OPTIONS[Math.floor(Math.random() * SINUCA_OPTIONS.length)];
      sinucaComboId = s.id;
      foodTitle = s.title;
      foodEmoji = s.emoji;
    } else if (randomRole.id === "filme_game") {
      const f =
        FILME_GAME_COMIDA_OPTIONS[
          Math.floor(Math.random() * FILME_GAME_COMIDA_OPTIONS.length)
        ];
      comidaId = f.id;
      foodTitle = f.title;
      foodEmoji = f.emoji;
    } else if (
      randomRole.id === "espetinho" ||
      randomRole.id === "salgado_role"
    ) {
      foodTitle = "Comida já inclusa no rolê";
      foodEmoji = randomRole.emoji;
      const sob =
        SOBREMESA_OPTIONS[Math.floor(Math.random() * SOBREMESA_OPTIONS.length)];
      sobremesaId = sob.id;
      sobremesaTitle = sob.title;
    } else {
      const c =
        COMIDA_OPTIONS[Math.floor(Math.random() * COMIDA_OPTIONS.length)];
      comidaId = c.id;
      foodTitle = c.title;
      foodEmoji = c.emoji;
      const sob =
        SOBREMESA_OPTIONS[Math.floor(Math.random() * SOBREMESA_OPTIONS.length)];
      sobremesaId = sob.id;
      sobremesaTitle = sob.title;
    }

    // Randomize day (favor sexta or sábado)
    const randomDia =
      DIA_OPTIONS[Math.floor(Math.random() * (DIA_OPTIONS.length - 1))];

    setTimeout(() => {
      setIsSpinning(false);
      setResultCombo({
        roleId: randomRole.id,
        roleTitle: randomRole.title,
        roleEmoji: randomRole.emoji,
        foodTitle,
        foodEmoji,
        sobremesaTitle,
        diaTitle: randomDia.title,
        diaEmoji: randomDia.emoji,
        selections: {
          role: randomRole.id,
          comida: comidaId,
          sobremesa: sobremesaId,
          dia: randomDia.id,
          sinuca_combo: sinucaComboId,
        },
      });

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#10b981", "#6366f1", "#f59e0b"],
        });
      } catch {}
    }, 1100);
  };

  const handleOpen = () => {
    setIsOpen(true);
    spinRoulette();
  };

  const handleConfirm = () => {
    if (resultCombo) {
      onApplyCombo(resultCombo.selections);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        id="btn-destiny-roulette"
        onClick={handleOpen}
        title="Sortear um combo completo caso esteja indecisa"
        className="min-h-[44px] inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-2 rounded-xl border border-amber-500/30 transition-all cursor-pointer shadow-sm active:scale-95"
      >
        <Dices className="w-4 h-4 text-amber-400 animate-spin-slow" />
        <span>Indecisa? Deixa o Destino Escolher! 🎲</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isSpinning) setIsOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden">
            {/* Close Button */}
            {!isSpinning && (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar"
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center shadow-lg">
              <Dices
                className={`w-8 h-8 text-amber-400 ${
                  isSpinning ? "animate-spin" : ""
                }`}
              />
            </div>

            <h3 className="text-xl font-black text-white">
              {isSpinning ? "Consultando os Deuses do Rolê... 🎲" : "O Destino Decidiu! 🎯"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              {isSpinning
                ? "Sorteando a melhor combinação para zero indecisão..."
                : "Uma combinação infalível pra gente não perder tempo escolhendo:"}
            </p>

            {/* Spinner or Result Card */}
            {isSpinning ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-3">
                <div className="text-4xl animate-bounce">🍢 ➔ 🎱 ➔ 🍿 ➔ 🍻</div>
                <span className="text-xs font-mono text-emerald-400">
                  Calibrando a vibe perfeita...
                </span>
              </div>
            ) : resultCombo ? (
              <div className="space-y-2.5 text-left bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{resultCombo.roleEmoji}</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">
                      O Rolê
                    </span>
                    <p className="text-xs font-bold text-slate-100 truncate">
                      {resultCombo.roleTitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{resultCombo.foodEmoji}</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">
                      A Comida / Petiscos
                    </span>
                    <p className="text-xs font-bold text-slate-100 truncate">
                      {resultCombo.foodTitle}
                    </p>
                  </div>
                </div>

                {resultCombo.sobremesaTitle && (
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🍨</span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">
                        Sobremesa
                      </span>
                      <p className="text-xs font-bold text-slate-100 truncate">
                        {resultCombo.sobremesaTitle}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{resultCombo.diaEmoji}</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">
                      Data Marcada
                    </span>
                    <p className="text-xs font-bold text-slate-100 truncate">
                      {resultCombo.diaTitle}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Actions */}
            {!isSpinning && resultCombo && (
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={spinRoulette}
                  className="flex-1 py-3 px-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span>Girar Novamente</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <span>Adotar Esse Rolê! 🚀</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
