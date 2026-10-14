"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Dices, X, Check, ArrowRight } from "lucide-react";
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
    foodTitle: string;
    sobremesaTitle?: string;
    diaTitle: string;
    selections: DateSelections;
  } | null>(null);

  const spinRoulette = () => {
    setIsSpinning(true);
    setResultCombo(null);

    // Randomize role
    const randomRole =
      ROLE_OPTIONS[Math.floor(Math.random() * ROLE_OPTIONS.length)];

    let foodTitle = "";
    let comidaId: string | null = null;
    let sinucaComboId: string | null = null;
    let sobremesaId: string | null = null;
    let sobremesaTitle: string | undefined = undefined;

    if (randomRole.id === "sinuca") {
      const s =
        SINUCA_OPTIONS[Math.floor(Math.random() * SINUCA_OPTIONS.length)];
      sinucaComboId = s.id;
      foodTitle = s.title;
    } else if (randomRole.id === "filme_game") {
      const f =
        FILME_GAME_COMIDA_OPTIONS[
          Math.floor(Math.random() * FILME_GAME_COMIDA_OPTIONS.length)
        ];
      comidaId = f.id;
      foodTitle = f.title;
    } else if (
      randomRole.id === "espetinho" ||
      randomRole.id === "salgado_role"
    ) {
      foodTitle = "Comida inclusa no rolê";
      const sob =
        SOBREMESA_OPTIONS[Math.floor(Math.random() * SOBREMESA_OPTIONS.length)];
      sobremesaId = sob.id;
      sobremesaTitle = sob.title;
    } else {
      const c =
        COMIDA_OPTIONS[Math.floor(Math.random() * COMIDA_OPTIONS.length)];
      comidaId = c.id;
      foodTitle = c.title;
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
        foodTitle,
        sobremesaTitle,
        diaTitle: randomDia.title,
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
          particleCount: 75,
          spread: 65,
          origin: { y: 0.6 },
          colors: ["#e11d48", "#f43f5e", "#fb7185", "#ffffff"],
        });
      } catch {}
    }, 1000);
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
        title="Sortear uma combinação completa caso esteja indecisa"
        className="min-h-[44px] inline-flex items-center gap-2 text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl border border-rose-200 transition-all cursor-pointer shadow-xs active:scale-95"
      >
        <Dices className="w-4 h-4 text-rose-600" />
        <span>Indecisa? Deixar o destino escolher</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isSpinning) setIsOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="w-full max-w-md bg-white border border-rose-200 rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden">
            {/* Close Button */}
            {!isSpinning && (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar"
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center shadow-xs">
              <Dices
                className={`w-8 h-8 text-rose-600 ${
                  isSpinning ? "animate-spin" : ""
                }`}
              />
            </div>

            <h3 className="text-xl font-black text-stone-900">
              {isSpinning ? "Consultando o destino..." : "O Destino Decidiu!"}
            </h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              {isSpinning
                ? "Sorteando a melhor combinação para zero indecisão..."
                : "Uma combinação infalível pra gente não perder tempo:"}
            </p>

            {/* Spinner or Result Card */}
            {isSpinning ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-3">
                <div className="flex gap-2 justify-center items-center">
                  <div className="w-3 h-3 rounded-full bg-rose-600 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-3 h-3 rounded-full bg-rose-600 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-3 h-3 rounded-full bg-rose-600 animate-bounce" />
                </div>
                <span className="text-xs font-mono text-rose-600 font-bold">
                  Sorteando a combinação perfeita...
                </span>
              </div>
            ) : resultCombo ? (
              <div className="space-y-2.5 text-left bg-rose-50/60 p-4 rounded-2xl border border-rose-100">
                <div className="p-2.5 rounded-xl bg-white border border-rose-100">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">
                    O Rolê
                  </span>
                  <p className="text-xs font-bold text-stone-800 truncate">
                    {resultCombo.roleTitle}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-rose-100">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">
                    A Comida / Petiscos
                  </span>
                  <p className="text-xs font-bold text-stone-800 truncate">
                    {resultCombo.foodTitle}
                  </p>
                </div>

                {resultCombo.sobremesaTitle && (
                  <div className="p-2.5 rounded-xl bg-white border border-rose-100">
                    <span className="text-[10px] font-bold uppercase text-stone-400 block">
                      Sobremesa
                    </span>
                    <p className="text-xs font-bold text-stone-800 truncate">
                      {resultCombo.sobremesaTitle}
                    </p>
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-white border border-rose-100">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">
                    Data Marcada
                  </span>
                  <p className="text-xs font-bold text-stone-800 truncate">
                    {resultCombo.diaTitle}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Actions */}
            {!isSpinning && resultCombo && (
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={spinRoulette}
                  className="flex-1 py-3 px-3 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span>Girar Novamente</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <span>Adotar Esse Rolê</span>
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
