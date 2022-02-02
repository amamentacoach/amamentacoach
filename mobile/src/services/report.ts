import api from 'services/api';
import SurveyQuestionsRepository from 'utils/surveyQuestionsRepository';

import type { BreastfeedEntry, ExtractionEntry } from 'services/diaryRegistry';

export interface DailyReport {
  breastfeedEntries: BreastfeedEntry[];
  registryEntries: ExtractionEntry[];
}

export interface WeeklyReportQuestion {
  id: number;
  description: string;
  answers: string[];
}

// Retorna o relatório diário da mãe
export async function getDailyReport(): Promise<DailyReport> {
  const { data } = await api.get('relatorios/diario');

  const breastfeedEntries: BreastfeedEntry[] = data.bebes.map((baby: any) => ({
    id: baby.id,
    name: baby.nome,
    entries: baby.mamadas.map((entry: any) => ({
      id: entry.id,
      baby_id: entry.bebe_id,
      breasts: entry.mama.split(','),
      date: entry.data_hora,
      duration: entry.duracao,
    })),
  }));
  const registryEntries: ExtractionEntry[] = data.ordenhas.map((item: any) => ({
    id: item.id,
    breasts: item.mama.split(','),
    duration: item.duracao,
    quantity: item.qtd_leite,
    date: item.data_hora,
  }));

  return {
    breastfeedEntries,
    registryEntries,
  };
}

// Retorna o relatório semanal da mãe
export async function getWeeklyReport(): Promise<WeeklyReportQuestion[]> {
  const surveyQuestionsRepo = new SurveyQuestionsRepository();
  const { data } = await api.get('relatorios/semanal');
  return data.map((entry: any) => {
    // Busca a questão correspondente ao id.
    let question = surveyQuestionsRepo.findById(entry.pergunta);
    const description = question ? question.description : '';

    return {
      id: entry.pergunta,
      description,
      answers: entry.respostas,
    };
  });
}
