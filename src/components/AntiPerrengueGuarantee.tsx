"use client";

import React, { useState } from "react";
import { ShieldCheck, ChevronDown, CheckCircle2, Award } from "lucide-react";

const GUARANTEE_CLAUSES = [
  {
    icon: "🚫",
    title: "Cláusula Anti-Tédio & Assuntos Proibidos",
    description:
      "Terminantemente proibido falar sobre ex, política chata, reuniões de trabalho intermináveis ou crises existenciais nos primeiros 60 minutos.",
  },
  {
    icon: "🍻",
    title: "Padrão Ouro Gastronômico",
    description:
      "A comida chega quentinha na mesa e a cerveja/refrigerante vem trincando de gelado. Zero perrengue com pedido ruim.",
  },
  {
    icon: "⏱️",
    title: "Garantia de Saída dos 40 Minutos",
    description:
      "Se em 40 minutos o papo estiver estranho, qualquer um pode dizer que esqueceu o feijão no fogo sem ressentimentos (embora a probabilidade seja de ficarmos horas rindo).",
  },
  {
    icon: "🏆",
    title: "Acordo de Fair Play (Sinuca / Videogame)",
    description:
      "Quem perder a partida paga a próxima rodada no balcão ou posta um story sincero me elogiando.",
  },
  {
    icon: "🤝",
    title: "Sem 'Show' na Conta",
    description:
      "Sem climão, sem disputa de calculadora e sem drama: tudo dividido de forma justa, cavalheiresca e descomplicada.",
  },
];

export function AntiPerrengueGuarantee() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-full rounded-2xl bg-white border border-rose-200 p-4 sm:p-5 shadow-xs text-left transition-all">
      {/* Header / Toggle */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center flex-shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-stone-900 text-sm sm:text-base group-hover:text-rose-700 transition-colors">
                Garantia de Date Sem Perrengue 🛡️
              </h4>
              <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
                100% Blindado
              </span>
            </div>
            <p className="text-xs text-stone-500">
              5 Cláusulas Oficiais de Cavalheirismo Moderno & Boa Convivência
            </p>
          </div>
        </div>

        <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 group-hover:bg-rose-100 transition-colors">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Clauses */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-rose-100 space-y-2.5 animate-in fade-in duration-200">
          {GUARANTEE_CLAUSES.map((clause, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-50/50 border border-rose-100"
            >
              <span className="text-lg flex-shrink-0 mt-0.5">{clause.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-bold text-stone-800">
                    {clause.title}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {clause.description}
                </p>
              </div>
            </div>
          ))}

          {/* Seal */}
          <div className="mt-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-700">
            <span className="flex items-center gap-1.5 font-bold">
              <Award className="w-4 h-4 text-rose-600" />
              Selo de Encontro Sem Clichê & Sem Drama 💖
            </span>
            <span className="font-mono text-[10px] text-stone-500">Válido para este rolê</span>
          </div>
        </div>
      )}
    </div>
  );
}
