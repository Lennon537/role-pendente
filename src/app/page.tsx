"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Calendar,
  UtensilsCrossed,
  IceCream,
  Compass,
  Sparkles,
  RefreshCw,
  Send,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Beer,
  Popcorn,
  Heart,
  Mail,
} from "lucide-react";

import { Step, DateSelections } from "@/types/invite";
import {
  ROLE_OPTIONS,
  SINUCA_OPTIONS,
  COMIDA_OPTIONS,
  FILME_GAME_COMIDA_OPTIONS,
  SOBREMESA_OPTIONS,
  DIA_OPTIONS,
} from "@/data/options";
import { FloatingHearts } from "@/components/FloatingHearts";
import { StepIndicator } from "@/components/StepIndicator";
import { OptionCard } from "@/components/OptionCard";
import { VipTicket } from "@/components/VipTicket";
import { AntiPerrengueGuarantee } from "@/components/AntiPerrengueGuarantee";
import { DestinyRouletteModal } from "@/components/DestinyRouletteModal";

// Dynamic persuasive phrases displayed inside the fugitive "Não" button
const NO_BUTTON_PHRASES = [
  "Prefiro o tédio 🥱", // initial
  "Tem certeza disso? 🤔",
  "Vai ter comida boa pô! 🤤",
  "Eu pago a primeira rodada! 🍻",
  "Prometo que sou legal! 😇",
  "Dá uma chance pro rolê! 🥺",
  "Olha a batata frita esperando! 🍟",
  "Nem cansa o dedo tentando! 😂",
  "O botão vermelho é bem mais bonito! 💖",
  "Eu até deixo você escolher a música! 🎶",
  "Até meu cachorro apoia esse date! 🐶",
  "Você tá rindo né? Clica no sim! 😏",
  "Cansei de correr, aceita logo! 🏃‍♂️💨",
];

// Reaction banner messages trying to convince with humor
const PERSUASIVE_MESSAGES = [
  "",
  "Pensa com carinho: comida boa, risada garantida e clima leve! 🤤",
  "Eu prometo que a conversa é boa e o rolê vai valer a pena! 😏",
  "Você já perdeu calorias tentando clicar no Não... o Sim tá bem ali! 😂",
  "Olha o esforço pra fugir! Aceita logo, vai ser muito bom! 💖",
  "Não adianta caçar pela tela toda, esse rolê já tá decretado! 💌",
  "Até o botão desistiu de ser clicado... a resposta certa é aceitar! ✨",
];

function InviteAppContent() {
  const searchParams = useSearchParams();
  const rawParamName = searchParams.get("nome") || searchParams.get("para") || "";

  // Step state machine: "invite" -> "role" -> "sinuca_custom" | "comida" -> "sobremesa" -> "dia" -> "resumo"
  const [step, setStep] = useState<Step>("invite");

  // Guest name personalization
  const [guestName, setGuestName] = useState<string>(rawParamName);

  useEffect(() => {
    if (rawParamName && !guestName) {
      setGuestName(rawParamName);
    }
  }, [rawParamName]);

  // Detect if user is on desktop to prioritize WhatsApp Web directly without app prompts
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsDesktop(!isMobileDevice);
    }
  }, []);

  // User selections
  const [selections, setSelections] = useState<DateSelections>({
    role: null,
    comida: null,
    sobremesa: null,
    dia: null,
    sinuca_combo: null,
  });

  // Fugitive "Não" button state - flees across the entire viewport screen
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noEvasions, setNoEvasions] = useState(0);

  // Validation warning state
  const [validationError, setValidationError] = useState<string | null>(null);

  // Copy to clipboard state
  const [copied, setCopied] = useState(false);

  // Refs
  const simBtnRef = useRef<HTMLButtonElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  // Role checks for dynamic smart routing
  const isSinuca = selections.role === "sinuca";
  const isFilmeGame = selections.role === "filme_game";
  const isFoodIncluded =
    selections.role === "espetinho" || selections.role === "salgado_role";

  // Fire celebratory romantic confetti when arriving at summary
  useEffect(() => {
    if (step === "resumo") {
      try {
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.5 },
          colors: ["#e11d48", "#f43f5e", "#fb7185", "#fbbf24", "#ffffff"],
        });
      } catch {
        // Fallback
      }
    }
  }, [step]);

  // Handler for fugitive button fleeing the entire screen with persuasive phrases
  const handleNoEvade = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // At 10 evasions, button surrenders humorously and accepts!
    if (noEvasions >= 10) {
      handleAcceptInvite();
      return;
    }

    if (typeof window === "undefined") return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const btnWidth = noBtnRef.current?.offsetWidth || 180;
    const btnHeight = noBtnRef.current?.offsetHeight || 54;
    const margin = 24;

    const maxX = Math.max(20, screenWidth - btnWidth - margin);
    const maxY = Math.max(20, screenHeight - btnHeight - margin);

    let randomX = Math.floor(Math.random() * maxX) + margin / 2;
    let randomY = Math.floor(Math.random() * maxY) + margin / 2;

    // Avoid overlapping with the static "Sim" button in the center
    if (simBtnRef.current) {
      const simRect = simBtnRef.current.getBoundingClientRect();
      const isOverlapping =
        Math.abs(randomX - simRect.left) < 170 &&
        Math.abs(randomY - simRect.top) < 90;

      if (isOverlapping) {
        randomX = (randomX + 220) % maxX;
        randomY = (randomY + 180) % maxY;
      }
    }

    setNoPosition({ x: randomX, y: randomY });
    setHasMovedNo(true);
    setNoEvasions((prev) => prev + 1);
  };

  // Handler for accepting the invite on Step 1
  const handleAcceptInvite = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e11d48", "#f43f5e", "#fb7185", "#fbbf24", "#ffffff"],
      });
    } catch {}
    setStep("role");
  };

  // Step progression validation & advancement
  const handleNextStep = () => {
    setValidationError(null);

    if (step === "role") {
      if (!selections.role) {
        setValidationError("Selecione um dos rolês acima para continuar! 💌");
        return;
      }
      if (isSinuca) {
        setStep("sinuca_custom");
      } else if (isFoodIncluded) {
        setStep("sobremesa");
      } else {
        setStep("comida");
      }
    } else if (step === "sinuca_custom") {
      if (!selections.sinuca_combo) {
        setValidationError("Escolha o combo de cerveja e petisco da partida! 🍻");
        return;
      }
      // Sinuca skips sobremesa completely, jumps directly to dia!
      setStep("dia");
    } else if (step === "comida") {
      if (!selections.comida) {
        setValidationError(
          isFilmeGame
            ? "Selecione as guloseimas da nossa sessão para continuar! 🍿"
            : "Selecione o que vamos comer para continuar! 🍔"
        );
        return;
      }
      if (isFilmeGame) {
        // Filme & Jogos pula a sobremesa e vai direto para o dia!
        setStep("dia");
      } else {
        setStep("sobremesa");
      }
    } else if (step === "sobremesa") {
      if (!selections.sobremesa) {
        setValidationError("Escolha uma sobremesa para fechar com estilo! 🍨");
        return;
      }
      setStep("dia");
    } else if (step === "dia") {
      if (!selections.dia) {
        setValidationError("Escolha o melhor dia na sua agenda! 📅");
        return;
      }
      setStep("resumo");
    }
  };

  // Navigation back
  const handleBackStep = () => {
    setValidationError(null);
    if (step === "role") {
      setStep("invite");
    } else if (step === "sinuca_custom") {
      setStep("role");
    } else if (step === "comida") {
      setStep("role");
    } else if (step === "sobremesa") {
      if (isFoodIncluded) {
        setStep("role");
      } else {
        setStep("comida");
      }
    } else if (step === "dia") {
      if (isSinuca) {
        setStep("sinuca_custom");
      } else if (isFilmeGame) {
        setStep("comida");
      } else {
        setStep("sobremesa");
      }
    } else if (step === "resumo") {
      setStep("dia");
    }
  };

  // Reset
  const handleReset = () => {
    setSelections({
      role: null,
      comida: null,
      sobremesa: null,
      dia: null,
      sinuca_combo: null,
    });
    setHasMovedNo(false);
    setNoEvasions(0);
    setValidationError(null);
    setStep("invite");
  };

  // Current phrase displayed inside the fugitive button
  const currentNoButtonText =
    noEvasions >= 10
      ? "Tá bom, você venceu... clica no vermelho! 💖"
      : NO_BUTTON_PHRASES[noEvasions % NO_BUTTON_PHRASES.length];

  // Helper text for persuasive reactions with persistence milestones
  const getEvasionMessage = () => {
    if (noEvasions === 0) return null;
    if (noEvasions >= 10) {
      return "O botão de recusar já pediu arrego e aceitou a cartinha 🏳️... Clica no Sim!";
    }
    if (noEvasions >= 7) {
      return `Você já tentou fugir ${noEvasions} vezes... com essa energia a gente já tinha ido e voltado do rolê! 😂`;
    }
    const index = Math.min(noEvasions, PERSUASIVE_MESSAGES.length - 1);
    return PERSUASIVE_MESSAGES[index] || PERSUASIVE_MESSAGES[PERSUASIVE_MESSAGES.length - 1];
  };

  // Selected items
  const selectedRole = ROLE_OPTIONS.find((o) => o.id === selections.role);
  const selectedComida =
    FILME_GAME_COMIDA_OPTIONS.find((o) => o.id === selections.comida) ||
    COMIDA_OPTIONS.find((o) => o.id === selections.comida);
  const selectedSobremesa = SOBREMESA_OPTIONS.find((o) => o.id === selections.sobremesa);
  const selectedDia = DIA_OPTIONS.find((o) => o.id === selections.dia);
  const selectedSinucaCombo = SINUCA_OPTIONS.find((o) => o.id === selections.sinuca_combo);

  // Response introduction from the girl back to the sender
  const responseIntro = guestName?.trim()
    ? `Oi! Aceitei seu convite, ${guestName.trim()} aqui! 💌✨`
    : `Convite aceito! O nosso rolê tá confirmado. 💌✨`;

  // Formatted WhatsApp message with confidence and charm
  let formattedWhatsAppMessage = "";
  if (isSinuca) {
    formattedWhatsAppMessage = `${responseIntro}

Aqui está a nossa programação oficial:
🎱 Rolê: ${selectedRole?.title || "Partida de sinuca"}
🍻 Cervejas & Petisco: ${selectedSinucaCombo?.title || "A definir"}
📅 Dia: ${selectedDia?.title || "A definir"}

Garantia de date sem perrengue ativada! 🛡️
Qual horário fica melhor pra gente se encontrar? 🚀`;
  } else if (isFilmeGame) {
    formattedWhatsAppMessage = `${responseIntro}

Aqui está a nossa programação oficial:
🎮 Rolê: ${selectedRole?.title || "Filme no sofá, videogame ou baralho"}
🍿 Snacks & Guloseimas: ${selectedComida?.title || "A definir"}
📅 Dia: ${selectedDia?.title || "A definir"}

Garantia de date sem perrengue ativada! 🛡️
Qual horário fica melhor pra gente se encontrar? 🚀`;
  } else if (isFoodIncluded) {
    formattedWhatsAppMessage = `${responseIntro}

Aqui está a nossa programação oficial:
🎯 Rolê & Comida: ${selectedRole?.title || "A definir"}
🍨 Sobremesa: ${selectedSobremesa?.title || "A definir"}
📅 Dia: ${selectedDia?.title || "A definir"}

Garantia de date sem perrengue ativada! 🛡️
Qual horário fica melhor pra gente se encontrar? 🚀`;
  } else {
    formattedWhatsAppMessage = `${responseIntro}

Aqui está a nossa programação oficial:
🎯 Rolê: ${selectedRole?.title || "A definir"}
🍔 Comida: ${selectedComida?.title || "A definir"}
🍨 Sobremesa: ${selectedSobremesa?.title || "A definir"}
📅 Dia: ${selectedDia?.title || "A definir"}

Garantia de date sem perrengue ativada! 🛡️
Qual horário fica melhor pra gente se encontrar? 🚀`;
  }

  // WhatsApp URLs:
  const encodedWhatsAppText = encodeURIComponent(formattedWhatsAppMessage);
  // Direct WhatsApp Web link (opens web.whatsapp.com directly in browser without asking to download/open desktop app)
  const whatsappWebUrl = `https://web.whatsapp.com/send?text=${encodedWhatsAppText}`;
  // Direct WhatsApp Mobile link (opens native app on smartphone)
  const whatsappAppUrl = `https://api.whatsapp.com/send?text=${encodedWhatsAppText}`;

  // Automatically select the best destination based on device (Web on desktop, App on mobile)
  const primaryWhatsAppUrl = isDesktop ? whatsappWebUrl : whatsappAppUrl;

  // Copy text to clipboard
  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(formattedWhatsAppMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {}
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden bg-mesh-letter">
      {/* Background ambient floating particles */}
      <FloatingHearts />

      {/* ========================================================
          FUGITIVE "NÃO" BUTTON (Flees across entire screen with persuasive phrases)
         ======================================================== */}
      {step === "invite" && hasMovedNo && (
        <button
          ref={noBtnRef}
          type="button"
          id="btn-nao-fugindo"
          onMouseEnter={(e) => handleNoEvade(e)}
          onTouchStart={(e) => handleNoEvade(e)}
          onClick={(e) => handleNoEvade(e)}
          style={{
            position: "fixed",
            left: `${noPosition.x}px`,
            top: `${noPosition.y}px`,
            zIndex: 60,
            transition: "all 0.16s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          className={`font-bold text-sm sm:text-base py-3 px-5 rounded-xl border shadow-lg cursor-pointer select-none whitespace-nowrap active:scale-95 transition-all ${
            noEvasions >= 10
              ? "bg-rose-100 text-rose-800 border-rose-400 shadow-[0_4px_20px_rgba(225,29,72,0.3)] animate-bounce"
              : "bg-white/95 hover:bg-rose-50 text-rose-700 border-2 border-rose-300 shadow-[0_4px_20px_rgba(244,63,94,0.25)] animate-pulse"
          }`}
        >
          {currentNoButtonText}
        </button>
      )}

      {/* Main Container: Styled like an elegant, warm love letter */}
      <div className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(225,29,72,0.12),0_4px_25px_rgba(0,0,0,0.04)] border border-rose-200/90 p-6 sm:p-8 md:p-10 transition-all duration-300 text-stone-800">
        {/* Accent top romantic ribbon line */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-t-3xl opacity-90" />

        {/* Step Indicator */}
        <StepIndicator
          currentStep={step}
          selectedRole={selections.role}
          onNavigateTo={(targetStep) => {
            setValidationError(null);
            setStep(targetStep);
          }}
        />

        {/* ========================================================
            ETAPA 1: TELA INICIAL (A CARTA-CONVITE CHARMOSA)
           ======================================================== */}
        {step === "invite" && (
          <div className="text-center py-2 sm:py-4">
            {/* Stamp Badge */}
            <div className="mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wide uppercase shadow-xs">
              <Mail className="w-3.5 h-3.5 text-rose-600" />
              <span>Carta-Convite Especial</span>
            </div>

            {/* Central Question with Guest Name personalization */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight mb-4 mt-1">
              {guestName ? (
                <>
                  <span className="text-rose-600 block sm:inline">{guestName}, </span>
                  <span>temos um rolê pendente. 💌</span>
                </>
              ) : (
                "Temos um rolê pendente. 💌"
              )}
            </h1>

            {/* Personalized Invitation badge */}
            {guestName ? (
              <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50/80 border border-rose-200 text-rose-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Convite exclusivo e intransferível para {guestName}</span>
              </div>
            ) : null}

            {/* Stage Arena styled as warm letter note */}
            <div className="relative w-full rounded-2xl bg-gradient-to-b from-rose-50/70 to-pink-50/30 border border-rose-200/80 p-6 sm:p-7 flex flex-col items-center justify-center overflow-hidden transition-all shadow-xs">
              {/* Evasion helper badge */}
              {noEvasions > 0 && (
                <div className="mb-5 animate-in fade-in slide-in-from-top duration-200">
                  <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 border border-rose-300 text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-xs font-mono text-center">
                    <Zap className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                    <span>{getEvasionMessage()}</span>
                  </span>
                </div>
              )}

              {/* Botões: Ao lado um do outro inicialmente (inclusive no mobile), e perfeitamente centralizado ao mover o 'Não' */}
              <div
                className={`w-full mx-auto min-h-[64px] transition-all duration-300 ${
                  hasMovedNo
                    ? "flex justify-center max-w-sm"
                    : "grid grid-cols-2 gap-2.5 sm:gap-3.5 max-w-md"
                }`}
              >
                {/* Botão SIM! (Fixo, vermelho apaixonante & confiante - centraliza perfeitamente quando o Não foge) */}
                <button
                  ref={simBtnRef}
                  type="button"
                  id="btn-sim"
                  onClick={handleAcceptInvite}
                  className={`min-h-[48px] bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-base py-4 px-6 rounded-xl shadow-[0_8px_25px_rgba(225,29,72,0.35)] border border-red-400/40 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group text-center ${
                    hasMovedNo ? "w-full max-w-sm" : "w-full"
                  }`}
                >
                  <span>Bora, desafio aceito! 💖</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Botão NÃO inicial */}
                {!hasMovedNo && (
                  <button
                    ref={noBtnRef}
                    type="button"
                    id="btn-nao-inicial"
                    onMouseEnter={(e) => handleNoEvade(e)}
                    onTouchStart={(e) => handleNoEvade(e)}
                    onClick={(e) => handleNoEvade(e)}
                    className="w-full min-h-[48px] bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-700 font-semibold text-base py-4 px-6 rounded-xl border border-stone-200 cursor-pointer select-none whitespace-nowrap active:scale-95 transition-all text-center flex items-center justify-center shadow-xs"
                  >
                    {currentNoButtonText}
                  </button>
                )}
              </div>

              {/* Hint */}
              <p className="text-[11px] text-stone-500 mt-5 font-medium">
                {hasMovedNo
                  ? "O botão de recusar tá te dando motivos pra aceitar... clica no vermelho! 🤭"
                  : "Dica: você pode até tentar recusar, mas este convite foi feito com carinho. 😉"}
              </p>
            </div>
          </div>
        )}

        {/* ========================================================
            ETAPA 2: O ROLÊ (ATIVIDADE ECONÔMICA)
           ======================================================== */}
        {step === "role" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="text-center">
              <div className="inline-flex p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 mb-2">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Qual vai ser o rolê? 🎯
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 mb-2">
                Escolha a vibe da noite para a gente se divertir sem frescura
              </p>

              {/* Roleta do Destino para pessoas indecisas */}
              <div className="flex justify-center pt-1 pb-1">
                <DestinyRouletteModal
                  onApplyCombo={(combo) => {
                    setSelections(combo);
                    setStep("resumo");
                  }}
                />
              </div>
            </div>

            {/* 6 Cards de Opções: Grid 2 Colunas */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {ROLE_OPTIONS.map((item) => (
                <OptionCard
                  key={item.id}
                  option={item}
                  isSelected={selections.role === item.id}
                  onSelect={(id) => {
                    setSelections((prev) => {
                      if (prev.role !== id) {
                        return {
                          ...prev,
                          role: id,
                          comida: null,
                          sinuca_combo: null,
                          sobremesa: null,
                        };
                      }
                      return prev;
                    });
                    setValidationError(null);
                  }}
                />
              ))}
            </div>

            {/* Validation warning */}
            {validationError && (
              <p className="text-xs text-rose-700 text-center font-semibold bg-rose-50 py-2 px-3 rounded-xl border border-rose-200">
                {validationError}
              </p>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleBackStep}
                className="min-h-[44px] py-3 px-4 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                id="btn-role-continuar"
                onClick={handleNextStep}
                disabled={!selections.role}
                className={`flex-1 min-h-[44px] py-3 px-5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
                  selections.role
                    ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white shadow-[0_6px_22px_rgba(225,29,72,0.3)] active:scale-98 cursor-pointer"
                    : "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed shadow-none"
                }`}
              >
                <span>
                  {isSinuca
                    ? "Avançar para Cervejas & Petisco 🍻"
                    : isFilmeGame
                    ? "Avançar para os Snacks do Sofá 🍿"
                    : isFoodIncluded
                    ? "Avançar para a Sobremesa 🍨"
                    : "Avançar para a Comida 🍔"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            ETAPA PERSONALIZADA: SINUCA (Bebidas & Petiscos da Partida)
           ======================================================== */}
        {step === "sinuca_custom" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="text-center">
              <div className="inline-flex p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 mb-2 shadow-xs">
                <Beer className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Bebidas & Petiscos da Sinuca 🍻🎱
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Quantas geladas vamos tomar e qual petisco vai pra mesa?
              </p>
            </div>

            {/* 4 Cards de Combos da Sinuca: Grid 2 Colunas */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {SINUCA_OPTIONS.map((item) => (
                <OptionCard
                  key={item.id}
                  option={item}
                  isSelected={selections.sinuca_combo === item.id}
                  onSelect={(id) => {
                    setSelections((prev) => ({ ...prev, sinuca_combo: id }));
                    setValidationError(null);
                  }}
                />
              ))}
            </div>

            {/* Validation warning */}
            {validationError && (
              <p className="text-xs text-rose-700 text-center font-semibold bg-rose-50 py-2 px-3 rounded-xl border border-rose-200">
                {validationError}
              </p>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleBackStep}
                className="min-h-[44px] py-3 px-4 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                id="btn-sinuca-continuar"
                onClick={handleNextStep}
                disabled={!selections.sinuca_combo}
                className={`flex-1 min-h-[44px] py-3 px-5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
                  selections.sinuca_combo
                    ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white shadow-[0_6px_22px_rgba(225,29,72,0.3)] active:scale-98 cursor-pointer"
                    : "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed shadow-none"
                }`}
              >
                <span>Avançar para o Dia 📅</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            ETAPA 3: A COMIDA / SNACKS DO SOFÁ
           ======================================================== */}
        {step === "comida" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="text-center">
              {isFilmeGame ? (
                <div className="inline-flex p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 mb-2 shadow-xs">
                  <Popcorn className="w-6 h-6" />
                </div>
              ) : (
                <div className="inline-flex p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 mb-2">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {isFilmeGame
                  ? "Snacks & Guloseimas do Sofá 🍿🎮"
                  : "O que vai forrar o estômago? 🍔"}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                {isFilmeGame
                  ? "Pipoca, brigadeiro, batata frita ou doces: escolha os petiscos da nossa sessão"
                  : "Lanches de respeito que matam a fome com dignidade"}
              </p>
            </div>

            {/* 4 Cards de Comida / Snacks: Grid 2 Colunas */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {(isFilmeGame ? FILME_GAME_COMIDA_OPTIONS : COMIDA_OPTIONS).map((item) => (
                <OptionCard
                  key={item.id}
                  option={item}
                  isSelected={selections.comida === item.id}
                  onSelect={(id) => {
                    setSelections((prev) => ({ ...prev, comida: id }));
                    setValidationError(null);
                  }}
                />
              ))}
            </div>

            {/* Validation warning */}
            {validationError && (
              <p className="text-xs text-rose-700 text-center font-semibold bg-rose-50 py-2 px-3 rounded-xl border border-rose-200">
                {validationError}
              </p>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleBackStep}
                className="min-h-[44px] py-3 px-4 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                id="btn-comida-continuar"
                onClick={handleNextStep}
                disabled={!selections.comida}
                className={`flex-1 min-h-[44px] py-3 px-5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
                  selections.comida
                    ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white shadow-[0_6px_22px_rgba(225,29,72,0.3)] active:scale-98 cursor-pointer"
                    : "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed shadow-none"
                }`}
              >
                <span>{isFilmeGame ? "Avançar para o Dia 📅" : "Escolher Sobremesa"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            ETAPA 4: A SOBREMESA (Pula para quem escolheu sinuca e filme_game)
           ======================================================== */}
        {step === "sobremesa" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="text-center">
              <div className="inline-flex p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 mb-2">
                <IceCream className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Para adoçar a vida 🍨
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Aquele docinho essencial para fechar a noite em alto nível
              </p>
            </div>

            {/* 4 Cards de Sobremesa: Grid 2 Colunas */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {SOBREMESA_OPTIONS.map((item) => (
                <OptionCard
                  key={item.id}
                  option={item}
                  isSelected={selections.sobremesa === item.id}
                  onSelect={(id) => {
                    setSelections((prev) => ({ ...prev, sobremesa: id }));
                    setValidationError(null);
                  }}
                />
              ))}
            </div>

            {/* Validation warning */}
            {validationError && (
              <p className="text-xs text-rose-700 text-center font-semibold bg-rose-50 py-2 px-3 rounded-xl border border-rose-200">
                {validationError}
              </p>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleBackStep}
                className="min-h-[44px] py-3 px-4 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                id="btn-sobremesa-continuar"
                onClick={handleNextStep}
                disabled={!selections.sobremesa}
                className={`flex-1 min-h-[44px] py-3 px-5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
                  selections.sobremesa
                    ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white shadow-[0_6px_22px_rgba(225,29,72,0.3)] active:scale-98 cursor-pointer"
                    : "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed shadow-none"
                }`}
              >
                <span>Definir o Dia 📅</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            ETAPA 5: O DIA
           ======================================================== */}
        {step === "dia" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="text-center">
              <div className="inline-flex p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 mb-2">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Qual dia fica melhor para você? 📅
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Escolha o momento perfeito para reservarmos na agenda
              </p>
            </div>

            {/* 4 Cards de Dias: Grid 2 Colunas */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {DIA_OPTIONS.map((item) => (
                <OptionCard
                  key={item.id}
                  option={item}
                  isSelected={selections.dia === item.id}
                  onSelect={(id) => {
                    setSelections((prev) => ({ ...prev, dia: id }));
                    setValidationError(null);
                  }}
                />
              ))}
            </div>

            {/* Validation warning */}
            {validationError && (
              <p className="text-xs text-rose-700 text-center font-semibold bg-rose-50 py-2 px-3 rounded-xl border border-rose-200">
                {validationError}
              </p>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleBackStep}
                className="min-h-[44px] py-3 px-4 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                id="btn-dia-continuar"
                onClick={handleNextStep}
                disabled={!selections.dia}
                className={`flex-1 min-h-[44px] py-3 px-5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
                  selections.dia
                    ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white shadow-[0_8px_25px_rgba(225,29,72,0.35)] active:scale-98 cursor-pointer"
                    : "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed shadow-none"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Ver Resumo e Enviar no WhatsApp ✨</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            ETAPA 6: RESUMO E ENVIO (A CARTA FINALIZADA)
           ======================================================== */}
        {step === "resumo" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header */}
            <div className="text-center">
              <div className="inline-block p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 mb-2 shadow-xs">
                <Heart className="w-8 h-8 fill-rose-600 text-rose-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Convite Fechado com Sucesso! 💌
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Tudo alinhado para o nosso encontro. Só mandar a confirmação:
              </p>
            </div>

            {/* VIP Date Boarding Pass / Ticket Exclusivo */}
            <VipTicket
              guestName={guestName}
              selectedRole={selectedRole}
              selectedComida={selectedComida}
              selectedSinucaCombo={selectedSinucaCombo}
              selectedSobremesa={selectedSobremesa}
              selectedDia={selectedDia}
              isSinuca={isSinuca}
              isFilmeGame={isFilmeGame}
              isFoodIncluded={isFoodIncluded}
            />

            {/* VIP Date Summary Card */}
            <div className="rounded-2xl border border-rose-200 bg-white p-5 sm:p-6 shadow-xs relative overflow-hidden">
              {/* Header Status */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-100">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> CONFIRMAÇÃO DO ROLÊ 💌
                </span>
                <span className="text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-md">
                  Conta Justa & Boas Risadas
                </span>
              </div>

              {/* Items summary */}
              <div
                className={`grid ${
                  isSinuca || isFoodIncluded || isFilmeGame
                    ? "grid-cols-1 sm:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2"
                } gap-2.5 text-left`}
              >
                {/* 1. Rolê */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                  <span className="text-2xl flex-shrink-0">
                    {selectedRole?.emoji || "🍢"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold uppercase text-stone-500 block tracking-wider">
                      {isFoodIncluded ? "O Rolê & Comida" : "O Rolê"}
                    </span>
                    <p className="text-sm font-bold text-stone-800 leading-snug">
                      {selectedRole?.title}
                    </p>
                  </div>
                </div>

                {/* Se for Sinuca: exibe Cervejas & Petiscos */}
                {isSinuca && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                    <span className="text-2xl flex-shrink-0">
                      {selectedSinucaCombo?.emoji || "🍻"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-extrabold uppercase text-stone-500 block tracking-wider">
                        Cervejas & Petiscos
                      </span>
                      <p className="text-sm font-bold text-stone-800 leading-snug">
                        {selectedSinucaCombo?.title}
                      </p>
                    </div>
                  </div>
                )}

                {/* Comida tradicional ou Snacks do Sofá */}
                {!isSinuca && !isFoodIncluded && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                    <span className="text-2xl flex-shrink-0">
                      {selectedComida?.emoji || (isFilmeGame ? "🍿" : "🍔")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-extrabold uppercase text-stone-500 block tracking-wider">
                        {isFilmeGame ? "Snacks do Sofá" : "A Comida"}
                      </span>
                      <p className="text-sm font-bold text-stone-800 leading-snug">
                        {selectedComida?.title}
                      </p>
                    </div>
                  </div>
                )}

                {/* Sobremesa (NÃO exibida para Sinuca E NEM para Filme no Sofá!) */}
                {!isSinuca && !isFilmeGame && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                    <span className="text-2xl flex-shrink-0">
                      {selectedSobremesa?.emoji || "🍨"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-extrabold uppercase text-stone-500 block tracking-wider">
                        A Sobremesa
                      </span>
                      <p className="text-sm font-bold text-stone-800 leading-snug">
                        {selectedSobremesa?.title}
                      </p>
                    </div>
                  </div>
                )}

                {/* Dia */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                  <span className="text-2xl flex-shrink-0">
                    {selectedDia?.emoji || "📅"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold uppercase text-stone-500 block tracking-wider">
                      Data Marcada
                    </span>
                    <p className="text-sm font-bold text-stone-800 leading-snug">
                      {selectedDia?.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-stone-500">
                <span>Garantia: Boas risadas</span>
                <span className="font-semibold text-rose-600">Zero perrengue 💖</span>
              </div>
            </div>

            {/* Garantia Anti-Perrengue (5 Cláusulas Modernas) */}
            <AntiPerrengueGuarantee />

            {/* Action button */}
            <div className="space-y-3 pt-1">
              {/* Main Button: Opens WhatsApp Web on desktop or WhatsApp App on mobile */}
              <a
                id="btn-whatsapp"
                href={primaryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  try {
                    confetti({
                      particleCount: 90,
                      spread: 65,
                      origin: { y: 0.7 },
                      colors: ["#e11d48", "#f43f5e", "#fb7185", "#fbbf24", "#ffffff"],
                    });
                  } catch {}
                }}
                className="w-full min-h-[48px] bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-black text-base sm:text-lg py-4 px-6 rounded-xl shadow-[0_8px_30px_rgba(37,211,102,0.35)] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer text-center group"
              >
                <Send className="w-5 h-5 fill-current group-hover:translate-x-1 transition-transform" />
                <span>
                  {isDesktop
                    ? "Enviar no WhatsApp Web ✨"
                    : "Enviar no WhatsApp ✨"}
                </span>
              </a>

              {/* Alternative choice (Web vs App) so user is never stuck looking for desktop app */}
              <div className="text-center pt-0.5">
                {isDesktop ? (
                  <a
                    href={whatsappAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-stone-500 hover:text-rose-600 underline underline-offset-4 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Prefere abrir no aplicativo do WhatsApp? Clique aqui 📱</span>
                  </a>
                ) : (
                  <a
                    href={whatsappWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-stone-500 hover:text-rose-600 underline underline-offset-4 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Abrir no WhatsApp Web 💻</span>
                  </a>
                )}
              </div>

              {/* Secondary actions: Copy & Refazer */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-rose-600 stroke-[3]" />
                      <span className="text-rose-700 font-bold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-rose-500" />
                      <span>Copiar Mensagem</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2.5 px-3 min-h-[44px] rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refazer</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Romantic Footer */}
      <footer className="fixed bottom-2 text-center text-stone-400 text-[11px] pointer-events-none select-none">
        Feito com carinho para quem gosta de comida boa e risada garantida 💌
      </footer>
    </main>
  );
}

export default function InvitePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf6f5] flex items-center justify-center text-rose-600 font-mono text-sm">
          Carregando a cartinha... 💌
        </div>
      }
    >
      <InviteAppContent />
    </Suspense>
  );
}
