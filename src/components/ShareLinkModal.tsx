"use client";

import React, { useState, useEffect } from "react";
import { Link2, Copy, Check, X, Sparkles, User, Phone } from "lucide-react";

interface ShareLinkModalProps {
  currentPhone: string;
  initialGuestName?: string;
}

export function ShareLinkModal({
  currentPhone,
  initialGuestName = "",
}: ShareLinkModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetName, setTargetName] = useState(initialGuestName);
  const [targetPhone, setTargetPhone] = useState(currentPhone);
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.origin}${window.location.pathname}`);
    }
  }, []);

  const handleOpen = () => {
    setTargetName(initialGuestName);
    setTargetPhone(currentPhone);
    setIsOpen(true);
  };

  const cleanedPhone = targetPhone.replace(/\D/g, "");

  // Build the dynamic URL
  const queryParts: string[] = [];
  if (targetName.trim()) {
    queryParts.push(`nome=${encodeURIComponent(targetName.trim())}`);
  }
  if (cleanedPhone) {
    queryParts.push(`tel=${encodeURIComponent(cleanedPhone)}`);
  }

  const generatedLink = queryParts.length > 0 ? `${baseUrl}?${queryParts.join("&")}` : baseUrl;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <>
      <button
        type="button"
        id="btn-open-share-link-modal"
        onClick={handleOpen}
        title="Gerar link de convite personalizado para enviar para ela"
        className="min-h-[44px] inline-flex items-center justify-center gap-2 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 px-3.5 py-2 rounded-xl border border-emerald-500/30 transition-all cursor-pointer shadow-xs active:scale-95"
      >
        <Link2 className="w-4 h-4 text-emerald-400" />
        <span>Gerar Link Personalizado para Enviar 🔗</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl text-left relative overflow-hidden">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar"
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg">
                  Criar Convite com Resposta Direta
                </h3>
                <p className="text-xs text-slate-400">
                  A garota abre o convite e a resposta volta direto pro seu WhatsApp
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5">
              {/* Field 1: Nome da Convidada */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nome da Garota (Opcional)</span>
                </label>
                <input
                  type="text"
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  placeholder="Ex: Camila, Mariana..."
                  className="w-full min-h-[44px] px-3.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white text-sm placeholder:text-slate-600"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  O site vai abrir com: &quot;{targetName.trim() || "Nome"}, temos um rolê pendente.&quot;
                </p>
              </div>

              {/* Field 2: Seu número de WhatsApp */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Seu WhatsApp (onde ela vai te responder)</span>
                </label>
                <input
                  type="tel"
                  value={targetPhone}
                  onChange={(e) => setTargetPhone(e.target.value)}
                  placeholder="Ex: 5569999999999"
                  className="w-full min-h-[44px] px-3.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-white font-mono text-sm placeholder:text-slate-600"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Quando ela clicar no botão verde no final, abre uma conversa com você!
                </p>
              </div>

              {/* Generated Link Preview */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Link pronto para enviar:
                </span>
                <p className="text-xs font-mono text-emerald-300 break-all select-all">
                  {generatedLink}
                </p>
              </div>

              {/* Actions */}
              <button
                type="button"
                onClick={handleCopy}
                className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer active:scale-98"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Link Copiado com Sucesso! 🚀</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Link para Enviar pra Ela 📋</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
