import api from './api';

export interface IMotherInfo {
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

export async function signUp({
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
}: IMotherInfo): Promise<number> {
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

export async function signIn(email: string, password: string): Promise<string> {
  const request = await api.post('/login', {
    email,
    senha: password,
  });
  return request.data.token;
}
