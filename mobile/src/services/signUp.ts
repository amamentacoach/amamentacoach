import { format } from 'date-fns';

import api from 'services/api';

export interface MotherSignUpInfo {
  birthday: Date;
  email: string;
  name: string;
  origin: string;
  password: string;
  phone: string;
  socialMedia: string;
  userType: string;
  // Campos caso a usuária seja gestante.
  possibleBirthDate: Date | null;
  weeksPregnant: string;
  // Campos caso a usuária seja mãe.
  birthDate: Date | null;
  birthLocation: string;
  birthWeeks: string;
  currentGestationCount: number;
  hasPartner: boolean;
}

export interface BabySignUpInfo {
  birthday: Date;
  postBirthLocation: string;
  name: string;
}

// Cadastra uma mãe e seus bebês.
async function signUp(
  motherInfo: MotherSignUpInfo,
  babiesInfo: BabySignUpInfo[],
): Promise<boolean> {
  try {
    const { data } = await api.post('/user', {
      companheiro: motherInfo.hasPartner,
      data_nascimento: format(motherInfo.birthday, 'yyyy-MM-dd'),
      email: motherInfo.email,
      localizacao: motherInfo.birthLocation,
      nome: motherInfo.name,
      senha: motherInfo.password,
      bebes: babiesInfo.map(info => ({
        data_parto: format(info.birthday, 'yyyy-MM-dd'),
        local: info.postBirthLocation,
        nome: info.name,
      })),
    });
    return !!data.token;
  } catch (error) {
    return false;
  }
}

export default signUp;
