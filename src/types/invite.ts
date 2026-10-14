export type Step =
  | "invite"
  | "role"
  | "comida"
  | "sobremesa"
  | "dia"
  | "resumo"
  | "sinuca_custom";

export interface OptionItem {
  id: string;
  emoji: string;
  title: string;
  description: string;
  badge?: string;
}

export interface DateSelections {
  role: string | null;
  comida: string | null;
  sobremesa: string | null;
  dia: string | null;
  sinuca_combo: string | null;
}
