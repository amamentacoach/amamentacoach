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
  weeksPregnant: string | null;
  // Campos caso a usuária seja mãe.
  birthDate: Date | null;
  birthLocation: string;
  birthWeeks: string;
  city: string;
  currentGestationCount: number;
  hasPartner: boolean;
  state: string;
}

export interface BabySignUpInfo {
  birthLocation: string;
  currentLocation: string;
  institution: string;
  name: string;
}

// Cadastra uma mãe e seus bebês.
async function signUp(
  motherInfo: MotherSignUpInfo,
  babiesInfo: BabySignUpInfo[],
): Promise<boolean> {
  const userData = {
    companheiro: motherInfo.hasPartner,
    data_nascimento: format(motherInfo.birthday, 'yyyy-MM-dd'),
    email: motherInfo.email,
    localizacao: motherInfo.birthLocation,
    nome: motherInfo.name,
    senha: motherInfo.password,
    cidade: motherInfo.city,
    estado: motherInfo.state,
    // Gestante
    semanas_gestante: motherInfo.weeksPregnant || null,
    data_provavel_parto: motherInfo.possibleBirthDate
      ? format(motherInfo.possibleBirthDate, 'yyyy-MM-dd')
      : null,
    // Mãe de prematuro.
    data_parto: motherInfo.birthDate
      ? format(motherInfo.birthDate, 'yyyy-MM-dd')
      : null,
    semanas_gestacao: motherInfo.birthWeeks,
    bebes: babiesInfo.map(baby => ({
      instituicao: baby.institution,
      local_atual: baby.currentLocation,
      local_nascimento: baby.birthLocation,
      nome: baby.name,
    })),
  };

  try {
    const { data } = await api.post('/user', userData);
    return !!data.token;
  } catch (error) {
    return false;
  }
}

export default signUp;
