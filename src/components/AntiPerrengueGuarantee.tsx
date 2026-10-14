"use client";

import React, { useState } from "react";
import { ShieldCheck, ChevronDown, CheckCircle2, Sparkles, Award } from "lucide-react";

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
    <div className="w-full rounded-2xl bg-slate-950/90 border border-emerald-500/30 p-4 sm:p-5 shadow-lg text-left transition-all">
      {/* Header / Toggle */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-emerald-300 transition-colors">
                Garantia Anti-Perrengue 🛡️
              </h4>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                100% Blindado
              </span>
            </div>
            <p className="text-xs text-slate-400">
              5 Cláusulas Oficiais de Cavalheirismo Moderno & Boa Convivência
            </p>
          </div>
        </div>

        <div className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white transition-colors">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Clauses */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-slate-800 space-y-2.5 animate-in fade-in duration-200">
          {GUARANTEE_CLAUSES.map((clause, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80"
            >
              <span className="text-lg flex-shrink-0 mt-0.5">{clause.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-bold text-slate-200">
                    {clause.title}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {clause.description}
                </p>
              </div>
            </div>
          ))}

          {/* Seal */}
          <div className="mt-3 p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
            <span className="flex items-center gap-1.5 font-bold">
              <Award className="w-4 h-4 text-emerald-400" />
              Selo de Encontro Sem Clichê & Sem Drama
            </span>
            <span className="font-mono text-[10px] text-slate-400">Válido para este rolê</span>
          </div>
        </div>
      )}
    </div>
  );
}
