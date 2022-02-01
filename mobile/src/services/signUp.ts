import api from 'services/api';

export interface MotherSignUpInfo {
  abortionCount: number;
  alreadyBreastfeed: boolean;
  birthday: string;
  childrenAlive: string;
  currentGestationCount: number;
  education: string;
  email: string;
  hasPartner: boolean;
  timeLivingWithPartner: string | null;
  location: string;
  maternityLeave: number | null;
  name: string;
  occupation: boolean;
  password: string;
  phone1: string;
  phone2: string;
  plannedPregnancy: boolean;
  pregnantCount: number;
  preNatalCheckupCount: string;
  problemsDuringPregnancy: string;
  receivedBreastfeedingGuidance: boolean;
  timeSpentBreastFeeding: string[];
  wage: string;
}

export interface BabySignUpInfo {
  apgar1: number | null;
  apgar2: number | null;
  birthday: string;
  birthLocation: string;
  birthType: boolean;
  gestationDays: number;
  gestationWeeks: number;
  hadFirstContact: boolean;
  hadFirstStimulus: string[];
  hadPostPartumComplications: string;
  name: string;
  timeFirstStimulus: string | null;
  timeFirstVisit: string | null;
  weight: number;
}

// Cadastra uma mãe no sistema.
export async function signUpMother(
  motherInfo: MotherSignUpInfo,
): Promise<string | null> {
  try {
    const request = await api.post('/maes', {
      amamentou_antes: motherInfo.alreadyBreastfeed,
      companheiro: motherInfo.hasPartner,
      complicacoes_gestacao: motherInfo.problemsDuringPregnancy,
      consultas_prenatal: motherInfo.preNatalCheckupCount,
      data_nascimento: motherInfo.birthday,
      email: motherInfo.email,
      escolaridade: motherInfo.education,
      gestacao_planejada: motherInfo.plannedPregnancy,
      licenca_maternidade: motherInfo.maternityLeave,
      localizacao: motherInfo.location,
      moram_juntos: motherInfo.timeLivingWithPartner,
      nome: motherInfo.name,
      ocupacao: motherInfo.occupation,
      orientacao_prenatal: motherInfo.receivedBreastfeedingGuidance,
      qtd_abortos: motherInfo.abortionCount,
      qtd_filhos_vivos: motherInfo.childrenAlive,
      qtd_gravidez: motherInfo.pregnantCount,
      renda: motherInfo.wage,
      senha: motherInfo.password,
      telefone2: motherInfo.phone2,
      tempo_amamentacao: motherInfo.timeSpentBreastFeeding,
      whatsapp: motherInfo.phone1,
    });
    return request.data.token;
  } catch (error) {
    return null;
  }
}

// Cadastra um bebê no sistema.
export async function signUpBaby(
  token: string,
  babyInfo: BabySignUpInfo,
): Promise<void> {
  await api.post(
    '/bebes',
    {
      apgar1: babyInfo.apgar1,
      apgar2: babyInfo.apgar2,
      complicacoes: babyInfo.hadPostPartumComplications,
      contato_pele: babyInfo.hadFirstContact,
      data_parto: babyInfo.birthday,
      dias_gest: babyInfo.gestationDays,
      local: babyInfo.birthLocation,
      nome: babyInfo.name,
      peso: babyInfo.weight,
      primeira_visita: babyInfo.timeFirstVisit,
      primeiro_estimulo: babyInfo.hadFirstStimulus,
      semanas_gest: babyInfo.gestationWeeks,
      tempo_primeiro_estimulo: babyInfo.timeFirstStimulus,
      tipo_parto: babyInfo.birthType,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );
}
