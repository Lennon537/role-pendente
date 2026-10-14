"use client";

import React, { useState } from "react";
import { Ticket, QrCode, Sparkles, Check, Copy, Share2 } from "lucide-react";
import { OptionItem } from "@/types/invite";

interface VipTicketProps {
  guestName?: string;
  selectedRole?: OptionItem;
  selectedComida?: OptionItem;
  selectedSinucaCombo?: OptionItem;
  selectedSobremesa?: OptionItem;
  selectedDia?: OptionItem;
  isSinuca?: boolean;
  isFilmeGame?: boolean;
  isFoodIncluded?: boolean;
}

export function VipTicket({
  guestName,
  selectedRole,
  selectedComida,
  selectedSinucaCombo,
  selectedSobremesa,
  selectedDia,
  isSinuca,
  isFilmeGame,
  isFoodIncluded,
}: VipTicketProps) {
  const [copied, setCopied] = useState(false);

  const ticketCode = `ROLE-${new Date().getFullYear()}-VIP#${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  const displayName = guestName?.trim() || "Convidada Especial";

  const handleCopyTicket = async () => {
    const text = `🎟️ TICKET OFICIAL DO ROLÊ 🎟️\nCódigo: ${ticketCode}\nConvidada: ${displayName}\nRolê: ${
      selectedRole?.title || "Rolê combinado"
    }\nData: ${selectedDia?.title || "A definir"}\nStatus: 100% Confirmado & Zero Perrengue 🚀`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-4 transition-all">
      {/* Outer Golden/Emerald Glow Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/30 p-5 sm:p-7 shadow-[0_0_40px_rgba(16,185,129,0.15)] overflow-hidden">
        {/* Decorative Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-300 to-indigo-500" />

        {/* Ticket Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-extrabold block">
                Passe Oficial de Date
              </span>
              <h4 className="text-base sm:text-lg font-black text-white tracking-wide">
                VIP BOARDING PASS 🚀
              </h4>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-500 block uppercase">
              Código Único
            </span>
            <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              {ticketCode}
            </span>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="py-4 space-y-3.5">
          {/* Passenger / Guest Name */}
          <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/90 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Convidada de Honra
              </span>
              <p className="text-base sm:text-lg font-black text-emerald-300">
                {displayName} ✨
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Status
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                <Check className="w-3 h-3 stroke-[3]" />
                CONFIRMADO
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {/* Rolê */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                Atividade Oficial
              </span>
              <p className="font-bold text-slate-200 truncate">
                {selectedRole?.emoji} {selectedRole?.title || "Rolê Escolhido"}
              </p>
            </div>

            {/* Data */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                Data do Encontro
              </span>
              <p className="font-bold text-slate-200 truncate">
                {selectedDia?.emoji} {selectedDia?.title || "Data Marcada"}
              </p>
            </div>

            {/* Comida / Bebidas */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 sm:col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                Cardápio do Date
              </span>
              <p className="font-semibold text-slate-300">
                {isSinuca ? (
                  <>🍻 {selectedSinucaCombo?.title || "Cervejas e petiscos"}</>
                ) : isFilmeGame ? (
                  <>🍿 {selectedComida?.title || "Snacks do Sofá"}</>
                ) : isFoodIncluded ? (
                  <>
                    🍢 {selectedRole?.title} + 🍨{" "}
                    {selectedSobremesa?.title || "Sobremesa"}
                  </>
                ) : (
                  <>
                    🍔 {selectedComida?.title} + 🍨{" "}
                    {selectedSobremesa?.title || "Sobremesa"}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Perforation Cutouts (Left & Right) */}
        <div className="relative my-3 flex items-center justify-between">
          <div className="w-5 h-5 rounded-full bg-[#080c14] -ml-8 sm:-ml-10 border-r border-slate-700/60 shadow-inner" />
          <div className="flex-1 border-t-2 border-dashed border-slate-800 mx-2" />
          <div className="w-5 h-5 rounded-full bg-[#080c14] -mr-8 sm:-mr-10 border-l border-slate-700/60 shadow-inner" />
        </div>

        {/* Ticket Footer (Barcode + Action) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Simulated Barcode */}
          <div className="flex items-center gap-2">
            <QrCode className="w-7 h-7 text-emerald-400/80 flex-shrink-0" />
            <div className="font-mono text-[9px] text-slate-500 tracking-widest select-none">
              ||| | ||||| || |||||| | |||| ||||
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyTicket}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  <span className="text-emerald-400 font-bold">Ticket Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Comprovante</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Screenshot Hint */}
        <p className="text-[11px] text-center text-slate-500 mt-3 font-medium">
          📸 Tire um print deste ticket para guardar o nosso comprovante oficial!
        </p>
      </div>
    </div>
  );
}
