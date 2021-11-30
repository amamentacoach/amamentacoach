export interface Pergunta {
  id: number;
  categoria: number;
  descricao: string;
  alternativas: string;
  outro: boolean;
  multiplas: boolean;
  alvo: "GERAL" | "AC" | "UCI/UTI";
}
