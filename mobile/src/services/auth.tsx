import api from './api';

export interface IMotherSignUpInfo {
  email: string;
  password: string;
  name: string;
  alreadyBreastfeed: boolean;
  birthday: string;
  married: boolean;
  liveTogether?: string | null;
  education: string;
  wage: string;
  pregnantCount: number;
}

interface IBabySignUpInfo {
  name: string;
  birthday: string;
  gestationWeeks: number;
  gestationDays: number;
  weight: number;
  apgar1: number;
  apgar2: number;
  birthType: boolean;
  birthLocation: string;
  difficulties: string;
}

export async function signUpMother({
  email,
  password,
  name,
  birthday,
  alreadyBreastfeed,
  married,
  liveTogether,
  education,
  wage,
  pregnantCount,
}: IMotherSignUpInfo): Promise<number> {
  const request = await api.post('/maes', {
    email,
    senha: password,
    nome: name,
    data_nascimento: birthday,
    amamentou_antes: alreadyBreastfeed,
    companheiro: married,
    moram_juntos: liveTogether,
    escolaridade: education,
    renda: wage,
    qtd_gravidez: pregnantCount,
  });
  return request.data.id;
}

export async function signUpBaby(
  token: string,
  {
    name,
    birthday,
    gestationWeeks,
    gestationDays,
    weight,
    apgar1,
    apgar2,
    birthType,
    birthLocation,
    difficulties,
  }: IBabySignUpInfo,
): Promise<void> {
  // TODO Add difficulties
  // difficulties
  await api.post(
    '/bebes',
    {
      nome: name,
      data_parto: birthday,
      semanas_gest: gestationWeeks,
      dias_gest: gestationDays,
      peso: weight,
      apgar1,
      apgar2,
      tipo_parto: birthType,
      local: birthLocation,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );
}

export async function signIn(email: string, password: string): Promise<string> {
  const request = await api.post('/login', {
    email,
    senha: password,
  });
  return request.data.token;
}
