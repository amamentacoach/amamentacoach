import { format } from 'date-fns';

import api from 'services/api';

export interface BabySignUpInfo {
  birthLocation: string;
  currentLocation: string;
  birthInstitution: string;
  name: string;
}

export interface UserSignUpInfo {
  birthday: Date;
  email: string;
  name: string;
  institution: string;
  socialMedia: string;
  password: string;
  phone: string;
  userType: string;
  // Campos caso a usuária seja gestante.
  possibleBirthDate: Date | null;
  weeksPregnant: string | null;
  // Campos caso a usuária seja mãe.
  currentGestationCount: number;
  birthDate: Date | null;
  birthWeeks: string;
  city: string;
  hasPartner: boolean;
  state: string;
  babies: BabySignUpInfo[];
}

async function signUp(userInfo: UserSignUpInfo): Promise<boolean> {
  const user = {
    categoria: userInfo.userType,
    data_nascimento: format(userInfo.birthday, 'yyyy-MM-dd'),
    email: userInfo.email,
    localizacao: userInfo.institution,
    nome: userInfo.name,
    senha: userInfo.password,
    veiculo_midia: userInfo.socialMedia,
    // Gestante
    semanas_gestante: userInfo.weeksPregnant || null,
    data_provavel_parto: userInfo.possibleBirthDate
      ? format(userInfo.possibleBirthDate, 'yyyy-MM-dd')
      : null,
    // Mãe de prematuro.
    data_parto: userInfo.birthDate
      ? format(userInfo.birthDate, 'yyyy-MM-dd')
      : null,
    semanas_gestacao: userInfo.birthWeeks,
    cidade: userInfo.city,
    estado: userInfo.state,
    companheiro: userInfo.hasPartner,
    bebes: userInfo.babies.map(baby => ({
      instituicao: baby.birthInstitution,
      local_atual: baby.currentLocation,
      local_nascimento: baby.birthLocation,
      nome: baby.name,
    })),
  };

  try {
    const { data } = await api.post('/user', user);
    return !!data.token;
  } catch (error) {
    return false;
  }
}

export default signUp;
