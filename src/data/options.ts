import { OptionItem } from "@/types/invite";

export const ROLE_OPTIONS: OptionItem[] = [
  {
    id: "espetinho",
    emoji: "🍢",
    title: "Comer um espetinho na brasa com farofa & vinagrete",
    description: "Clássico supremo. Zero frescura, espetinho saindo na brasa e papo leve sem pressa.",
    badge: "Já inclui comida 🍢",
  },
  {
    id: "salgado_role",
    emoji: "🥟",
    title: "Parar numa lanchonete clássica para comer um salgado",
    description: "Aquela parada sagrada no balcão pra comer um salgado quentinho jogando conversa fora.",
    badge: "Já inclui comida 🥟",
  },
  {
    id: "sinuca",
    emoji: "🎱",
    title: "Partida de sinuca com cerveja e petisco",
    description: "Quem perder paga a próxima rodada. Cerveja gelada, petiscos na mesa e tacadas de respeito.",
    badge: "Cerveja & Petiscos 🍻",
  },
  {
    id: "caminhada",
    emoji: "🚶",
    title: "Caminhada ou passeio noturno com salgado de esquina",
    description: "Dar uma volta pela cidade sem hora pra voltar, vento fresco e parada no salgado de esquina.",
    badge: "Vibe Descontraída",
  },
  {
    id: "filme_game",
    emoji: "🎮",
    title: "Filme no sofá, videogame ou baralho",
    description: "Vibe caseira e confortável: filmes, risadas e disputa sadia no controle ou nas cartas.",
    badge: "Sessão Sofá 🍿",
  },
  {
    id: "bar_raiz",
    emoji: "🍻",
    title: "Barzinho com cerveja trincando e petiscos",
    description: "Mesa na calçada, copo americano, cerveja trincando e aquela porção de petiscos pra acompanhar o papo.",
    badge: "Resenha Completa",
  },
];

// Special beer and snack combos specifically for sinuca
export const SINUCA_OPTIONS: OptionItem[] = [
  {
    id: "sinuca_leve",
    emoji: "🍻",
    title: "2 geladas trincando + Porção de batata frita",
    description: "Só pra molhar a palavra, esquentar o braço e rir das tacadas tortas.",
    badge: "Modo Leve",
  },
  {
    id: "sinuca_classica",
    emoji: "🍻",
    title: "4 cervejas geladas + Porção de calabresa acebolada",
    description: "Clássico de boteco: quem errar a caçapa paga a próxima rodada no balcão.",
    badge: "O Mais Pedido",
  },
  {
    id: "sinuca_balde",
    emoji: "🧊",
    title: "Balde com 6 cervejas + Petisco misto caprichado",
    description: "Modo torneio ativado: a noite vai render e a resenha tá garantida.",
    badge: "Campeonato 🏆",
  },
  {
    id: "sinuca_zero",
    emoji: "🥤",
    title: "Refrigerante / Suco gelado + Porção caprichada",
    description: "Sem álcool, mas com foco total em ganhar o jogo e zerar os petiscos.",
    badge: "Sem Álcool 🎯",
  },
];

// Special snacks specifically for Movie / Gaming session at home
export const FILME_GAME_COMIDA_OPTIONS: OptionItem[] = [
  {
    id: "pipoca_refri",
    emoji: "🍿",
    title: "Balde de pipoca amanteigada + Refrigerante gelado",
    description: "Clássico supremo do cinema em casa: pipoca estalando e refri no copo.",
    badge: "O Favorito do Sofá",
  },
  {
    id: "brigadeiro_doces",
    emoji: "🍫",
    title: "Brigadeiro de panela + Guloseimas e doces variados",
    description: "Para comer de colher direto da panela enquanto a gente assiste ou joga.",
    badge: "Guloseimas & Doce",
  },
  {
    id: "batata_snack",
    emoji: "🍟",
    title: "Porção de batata frita crocante + Molhinhos",
    description: "Petisco salgado perfeito pra ir beliscando entre uma partida e outra.",
    badge: "Pra Beliscar",
  },
  {
    id: "combo_completo",
    emoji: "🎮",
    title: "Combo completo: Pipoca, Brigadeiro, Batata frita & Doces",
    description: "O kit supremo do sofá: salgado e doce pra não faltar absolutamente nada na sessão.",
    badge: "Kit Campeão 🏆",
  },
];

export const COMIDA_OPTIONS: OptionItem[] = [
  {
    id: "dogao",
    emoji: "🌭",
    title: "Dogão de rua completo (com tudo que tem direito)",
    description: "Purê, batata palha, milho e respeito. Se não sujar o guardanapo, comeu errado.",
    badge: "Sustança Pura",
  },
  {
    id: "salgadinhos",
    emoji: "🥟",
    title: "Combo coxinha quentinha + suco gelado",
    description: "A clássica parada no balcão que nunca falhou na história da humanidade.",
    badge: "Imbatível",
  },
  {
    id: "pizza",
    emoji: "🍕",
    title: "Pizza honesta dividida 50/50",
    description: "Queijo derretendo, massa crocante no ponto certo e divisão 50/50.",
    badge: "Sem Erro",
  },
  {
    id: "batata",
    emoji: "🍟",
    title: "Porção caprichada de batata frita",
    description: "Crocante e perfeita pra ir petiscando enquanto a gente discute teorias malucas.",
    badge: "Pra Petiscar",
  },
];

export const SOBREMESA_OPTIONS: OptionItem[] = [
  {
    id: "acai",
    emoji: "🍨",
    title: "Açaí turbinado sem economia de adicionais",
    description: "Leite condensado, morango, granola e energia pra fechar a noite no topo.",
    badge: "Combo de Elite",
  },
  {
    id: "sorvete",
    emoji: "🍦",
    title: "Casquinha dupla na sorveteria de bairro",
    description: "Sorvete na mão, clima leve e a desculpa perfeita pra continuar conversando.",
    badge: "Nostálgico",
  },
  {
    id: "bolo_pote",
    emoji: "🧁",
    title: "Bolo de pote recheado ou docinho de padaria",
    description: "Aquele bem molhadinho de ninho com Nutella, brigadeiro ou pudim pra comer de colher.",
    badge: "Fácil & Certeiro",
  },
  {
    id: "churros",
    emoji: "🍩",
    title: "Churros recheado na praça pingando doce",
    description: "Aquele clássico crocante com doce de leite que todo mundo respeita.",
    badge: "Doce Certeiro",
  },
];

export const DIA_OPTIONS: OptionItem[] = [
  {
    id: "sexta",
    emoji: "⚡",
    title: "Sexta-feira à noite",
    description: "Pra encerrar a semana com chave de ouro e esquecer todo o estresse.",
    badge: "Modo Fim de Semana",
  },
  {
    id: "sabado",
    emoji: "🎯",
    title: "Sábado",
    description: "Sem hora pra acordar no dia seguinte. O dia oficial dos melhores rolês.",
    badge: "O Favorito",
  },
  {
    id: "domingo",
    emoji: "🌅",
    title: "Domingo fim de tarde",
    description: "Passeio descontraído, pôr do sol e bateria social renovada com estilo.",
    badge: "Vibe Relax",
  },
  {
    id: "voce_escolhe",
    emoji: "🎲",
    title: "Você escolhe (deixo por sua conta)",
    description: "Qualquer dia que ficar melhor na sua agenda, eu me viro pra gente ir.",
    badge: "Carta Branca 🎯",
  },
];

export const DEFAULT_PHONE = "5569999999999";
