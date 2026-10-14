"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Settings,
  X,
  Check,
  Phone,
  Calendar,
  Clock,
  Compass,
  ChevronDown,
} from "lucide-react";

export interface ScheduleModalProps {
  currentPhone: string;
  onSavePhone: (newPhone: string) => void;
  selectedRole?: string | null;
  onSelectRole?: (roleId: string) => void;
  selectedDia?: string | null;
  onSelectDia?: (diaId: string) => void;
  onSaveSchedule?: (data: {
    phone: string;
    role: string;
    dia: string;
    customDate?: string;
    customTime?: string;
  }) => void;
}

const ROLE_CHOICES = [
  { id: "filme_game", label: "🍿 Filme no sofá, videogame ou baralho" },
  { id: "sinuca", label: "🎱 Partida de sinuca com cerveja e petisco" },
  { id: "bar_raiz", label: "🍻 Barzinho com cerveja trincando e petiscos" },
  { id: "espetinho", label: "🍢 Espetinho na brasa com farofa & vinagrete" },
  { id: "salgado_role", label: "🥟 Parar numa lanchonete clássica para salgado" },
  { id: "caminhada", label: "🚶 Caminhada ou passeio noturno descontraído" },
];

const DIA_CHOICES = [
  { id: "sexta", label: "⚡ Sexta-feira à noite" },
  { id: "sabado", label: "🎯 Sábado" },
  { id: "domingo", label: "🌅 Domingo fim de tarde" },
  { id: "voce_escolhe", label: "🎲 Você escolhe (livre)" },
];

export function PhoneModal({
  currentPhone,
  onSavePhone,
  selectedRole,
  onSelectRole,
  selectedDia,
  onSelectDia,
  onSaveSchedule,
}: ScheduleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState(currentPhone);
  const [roleInput, setRoleInput] = useState<string>(selectedRole || "filme_game");
  const [diaInput, setDiaInput] = useState<string>(selectedDia || "sexta");
  const [customDate, setCustomDate] = useState<string>("");
  const [customTime, setCustomTime] = useState<string>("20:00");
  const [error, setError] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  // Sync state when props change or modal opens
  const handleOpen = () => {
    setPhoneInput(currentPhone);
    setRoleInput(selectedRole || "filme_game");
    setDiaInput(selectedDia || "sexta");
    setError("");
    setIsOpen(true);
  };

  const handleClose = () => {
    setError("");
    setIsOpen(false);
  };

  // 1. Accessibility: Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // 2. Technical: Body scroll lock when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // 3. Save handler
  const handleSave = () => {
    const cleaned = phoneInput.replace(/\D/g, "");
    if (cleaned.length < 10) {
      setError("Digite um número com DDD válido (ex: 5569999999999)");
      return;
    }

    onSavePhone(cleaned);

    if (onSelectRole && roleInput) {
      onSelectRole(roleInput);
    }

    if (onSelectDia && diaInput) {
      onSelectDia(diaInput);
    }

    if (onSaveSchedule) {
      onSaveSchedule({
        phone: cleaned,
        role: roleInput,
        dia: diaInput,
        customDate: customDate || undefined,
        customTime: customTime || undefined,
      });
    }

    setIsOpen(false);
  };

  // Close when clicking directly on the backdrop overlay
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {/* Trigger Button - Meets min-h-[44px] touch target requirements */}
      <button
        type="button"
        id="btn-open-schedule-modal"
        onClick={handleOpen}
        title="Configurar agendamento e número do WhatsApp"
        className="min-h-[44px] inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-xs transition-all cursor-pointer active:scale-98 select-none"
      >
        <Settings className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span className="truncate">
          Agendamento & WhatsApp:{" "}
          <strong className="font-mono text-emerald-300">{currentPhone}</strong>
        </span>
      </button>

      {/* Modal Dialog Portal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-modal-title"
          aria-describedby="schedule-modal-desc"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        >
          {/* Modal Container:
              - Mobile (<640px): Bottom sheet anchored at bottom, rounded-t-2xl, w-full, max-h-[85dvh]
              - Tablet & Desktop (>=641px): Centered, rounded-2xl, max-w-lg, max-h-[90vh]
          */}
          <div
            ref={modalRef}
            className="w-full sm:max-w-lg bg-slate-900 border-t sm:border border-slate-700/80 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[85dvh] sm:max-h-[90vh] overflow-hidden text-left relative transition-all duration-300 animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95"
          >
            {/* Mobile Bottom Sheet Pull Bar */}
            <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto mt-2.5 mb-1 sm:hidden flex-shrink-0" />

            {/* Header: Sticky on top with close button */}
            <header className="sticky top-0 z-10 bg-slate-900 px-4 sm:px-6 pt-2 sm:pt-4 pb-3 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    id="schedule-modal-title"
                    className="font-bold text-white text-base sm:text-lg leading-tight"
                  >
                    Agendamento do Encontro
                  </h3>
                  <p id="schedule-modal-desc" className="text-xs text-slate-400">
                    Defina o rolê, data, horário e número de destino
                  </p>
                </div>
              </div>

              {/* Close Button - Minimum touch target 44px */}
              <button
                type="button"
                id="btn-close-schedule-modal"
                onClick={handleClose}
                aria-label="Fechar modal"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Scrollable Content Area: overflow-y-auto to avoid keyboard overflow on mobile */}
            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-4 space-y-4">
              {/* Field 1: Tipo de Encontro */}
              <div>
                <label
                  htmlFor="input-schedule-role"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tipo de Encontro (Rolê)</span>
                </label>
                <div className="relative">
                  <select
                    id="input-schedule-role"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    className="w-full min-h-[44px] sm:min-h-[48px] px-3.5 pr-10 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-base sm:text-sm appearance-none cursor-pointer"
                  >
                    {ROLE_CHOICES.map((rc) => (
                      <option key={rc.id} value={rc.id} className="bg-slate-900 text-white">
                        {rc.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Field 2: Seleção de Data */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Seleção de Data</span>
                </label>
                {/* Quick selection pills with min-h-[44px] */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {DIA_CHOICES.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setDiaInput(d.id);
                        setCustomDate("");
                      }}
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border text-center flex items-center justify-center cursor-pointer select-none ${
                        diaInput === d.id && !customDate
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)] font-bold"
                          : "bg-slate-950/70 border-slate-700/80 text-slate-300 hover:border-slate-600 hover:text-white"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Optional custom calendar picker */}
                <div className="mt-2">
                  <label
                    htmlFor="input-custom-date"
                    className="block text-[11px] text-slate-400 mb-1"
                  >
                    Ou selecione um dia específico no calendário:
                  </label>
                  <input
                    id="input-custom-date"
                    type="date"
                    value={customDate}
                    onChange={(e) => {
                      setCustomDate(e.target.value);
                      setDiaInput("");
                    }}
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-base sm:text-sm cursor-pointer"
                  />
                </div>
              </div>

              {/* Field 3: Horário Previsto */}
              <div>
                <label
                  htmlFor="input-schedule-time"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Horário Previsto</span>
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    id="input-schedule-time"
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="flex-1 min-h-[44px] px-3.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white font-mono text-base sm:text-sm cursor-pointer"
                  />
                  {/* Quick preset chips */}
                  <div className="flex gap-1.5">
                    {["19:00", "20:00", "21:00"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setCustomTime(t)}
                        className={`min-h-[44px] px-2.5 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                          customTime === t
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                            : "bg-slate-950/80 border-slate-700 text-slate-400 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Field 4: WhatsApp de Destino */}
              <div>
                <label
                  htmlFor="input-schedule-phone"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp de Destino (DDI + DDD + Número)</span>
                </label>
                <input
                  id="input-schedule-phone"
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => {
                    setPhoneInput(e.target.value);
                    setError("");
                  }}
                  placeholder="Ex: 5569999999999"
                  className="w-full min-h-[44px] sm:min-h-[48px] px-3.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white font-mono text-base sm:text-sm placeholder:text-slate-600"
                />
                {error && <p className="text-xs text-rose-400 mt-1 font-semibold">{error}</p>}
                <p className="text-[11px] text-slate-500 mt-1">
                  Número que receberá a mensagem oficial de confirmação do rolê.
                </p>
              </div>
            </div>

            {/* Footer: Sticky on bottom with action buttons meeting min-h-[44px] */}
            <footer className="sticky bottom-0 bg-slate-900 border-t border-slate-800 p-4 sm:p-6 flex gap-3 flex-shrink-0">
              <button
                type="button"
                id="btn-cancel-schedule-modal"
                onClick={handleClose}
                className="flex-1 min-h-[44px] sm:min-h-[48px] py-2.5 px-4 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center active:scale-98"
              >
                Cancelar
              </button>
              <button
                type="button"
                id="btn-save-schedule-modal"
                onClick={handleSave}
                className="flex-1 min-h-[44px] sm:min-h-[48px] py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all cursor-pointer active:scale-98"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Salvar Agendamento</span>
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

// Export aliases for flexible usage
export const ScheduleModal = PhoneModal;
export default PhoneModal;
