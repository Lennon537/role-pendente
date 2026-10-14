"use client";

import React, { useState } from "react";
import { Ticket, QrCode, Check, Copy } from "lucide-react";
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

  const ticketCode = `DATE-${new Date().getFullYear()}-VIP#${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  const displayName = guestName?.trim() || "Convidada Especial";

  const handleCopyTicket = async () => {
    const text = `CONVITE OFICIAL DE ENCONTRO\nCódigo: ${ticketCode}\nConvidada Especial: ${displayName}\nRolê: ${
      selectedRole?.title || "Rolê combinado"
    }\nData: ${selectedDia?.title || "A definir"}\nStatus: Confirmado • Zero Perrengue`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <div className="relative w-full max-w-xl mx-auto my-4 transition-all">
      {/* Outer Romantic Letter Card */}
      <div className="relative rounded-3xl bg-white border border-rose-200 p-5 sm:p-7 shadow-xl overflow-hidden">
        {/* Decorative Top Romantic Ribbon Line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

        {/* Ticket Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-600 font-extrabold block">
                Convite Oficial de Encontro
              </span>
              <h4 className="text-base sm:text-lg font-black text-stone-900 tracking-wide">
                PASSE VIP EXCLUSIVO
              </h4>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-stone-400 block uppercase">
              Código Único
            </span>
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {ticketCode}
            </span>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="py-4 space-y-3.5">
          {/* Passenger / Guest Name */}
          <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700/80 block">
                Convidada de Honra
              </span>
              <p className="text-base sm:text-lg font-black text-rose-700">
                {displayName}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block">
                Status
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-rose-600 px-2.5 py-1 rounded-md shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
                CONFIRMADO
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {/* Rolê */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">
                Atividade Oficial
              </span>
              <p className="font-bold text-stone-800 truncate">
                {selectedRole?.title || "Rolê Escolhido"}
              </p>
            </div>

            {/* Data */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">
                Data do Encontro
              </span>
              <p className="font-bold text-stone-800 truncate">
                {selectedDia?.title || "Data Marcada"}
              </p>
            </div>

            {/* Comida / Bebidas */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 sm:col-span-2">
              <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">
                Cardápio do Date
              </span>
              <p className="font-semibold text-stone-800">
                {isSinuca ? (
                  <>{selectedSinucaCombo?.title || "Cervejas e petiscos"}</>
                ) : isFilmeGame ? (
                  <>{selectedComida?.title || "Snacks do Sofá"}</>
                ) : isFoodIncluded ? (
                  <>
                    {selectedRole?.title} +{" "}
                    {selectedSobremesa?.title || "Sobremesa"}
                  </>
                ) : (
                  <>
                    {selectedComida?.title} +{" "}
                    {selectedSobremesa?.title || "Sobremesa"}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Perforation Cutouts - colored with background red #5c0716 */}
        <div className="relative my-3 flex items-center justify-between">
          <div className="w-5 h-5 rounded-full bg-[#5c0716] -ml-8 sm:-ml-10 border-r border-rose-300 shadow-inner" />
          <div className="flex-1 border-t-2 border-dashed border-rose-200 mx-2" />
          <div className="w-5 h-5 rounded-full bg-[#5c0716] -mr-8 sm:-mr-10 border-l border-rose-300 shadow-inner" />
        </div>

        {/* Ticket Footer (Barcode + Action) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Simulated Barcode */}
          <div className="flex items-center gap-2">
            <QrCode className="w-7 h-7 text-rose-600 flex-shrink-0" />
            <div className="font-mono text-[9px] text-stone-400 tracking-widest select-none">
              ||| | ||||| || |||||| | |||| ||||
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyTicket}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-rose-600 stroke-[3]" />
                  <span className="text-rose-700 font-bold">Convite Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-rose-500" />
                  <span>Copiar Convite</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Screenshot Hint */}
        <p className="text-[11px] text-center text-stone-400 mt-3 font-medium">
          Tire um print deste cartão para guardar o comprovante oficial.
        </p>
      </div>
    </div>
  );
}
