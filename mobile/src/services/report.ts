import api from './api';
import { ISurveyQuestion } from './survey';

export interface IDailyReport {
  breastfeedEntries: {
    id: number;
    baby_name: string;
    breast: 'E' | 'D';
    duration: number;
    date: string;
  }[];
  registryEntries: {
    id: number;
    breast: 'E' | 'D';
    duration: number;
    quantity: number;
    date: string;
  }[];
  questions: ISurveyQuestion[];
}

export interface IWeeklyReport {
  question: string;
  answers: string[];
}

// Retorna o relatório diário da mãe
export async function getDailyReport(): Promise<IDailyReport> {
  const { data } = await api.get('relatorios/diario');

  const breastfeedEntries = data.mamadas.map((item: any) => ({
    id: item.id,
    baby_name: item.bebe,
    breast: item.mama,
    duration: item.duracao,
    date: item.data_hora,
  }));
  const registryEntries = data.ordenhas.map((item: any) => ({
    id: item.id,
    breast: item.mama,
    duration: item.duracao,
    quantity: item.qtd_leite,
    date: item.data_hora,
  }));
  const questions = data.perguntas.map((question: any) => ({
    id: question.id,
    target: question.alvo,
    category: question.categoria,
    description: question.descricao,
    options: question.alternativas,
    displayOther: question.outro,
    multipleSelection: question.multiplas,
  }));

  return {
    breastfeedEntries,
    registryEntries,
    questions,
  };
}

// Retorna o relatório semanal da mãe
export async function getWeeklyReport(): Promise<IWeeklyReport[]> {
  const { data } = await api.get('relatorios/semanal');
  return data.map((entry: any) => ({
    question: entry.pergunta,
    answers: entry.respostas,
  }));
}
