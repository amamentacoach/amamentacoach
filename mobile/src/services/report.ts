import api from './api';
import { BreastfeedEntry, ExtractionEntry } from './diaryRegistry';
import { SurveyQuestion } from './survey';

export interface DailyReport {
  breastfeedEntries: BreastfeedEntry[];
  registryEntries: ExtractionEntry[];
  questions: SurveyQuestion[];
}

export interface WeeklyReport {
  question: string;
  answers: string[];
}

// Retorna o relatório diário da mãe
export async function getDailyReport(): Promise<DailyReport> {
  const { data } = await api.get('relatorios/diario');

  const breastfeedEntries = data.bebes.map((baby: any) => ({
    id: baby.id,
    name: baby.nome,
    entries: baby.mamadas.map((entry: any) => ({
      id: entry.id,
      baby_id: entry.bebe_id,
      date: entry.data_hora,
      duration: entry.duracao,
      breast: entry.mama,
    })),
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
export async function getWeeklyReport(): Promise<WeeklyReport[]> {
  const { data } = await api.get('relatorios/semanal');
  return data.map((entry: any) => ({
    question: entry.pergunta,
    answers: entry.respostas,
  }));
}
