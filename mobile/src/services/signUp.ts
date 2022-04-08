import api from 'services/api';

export interface MotherSignUpInfo {
  birthday: string;
  birthLocation: string;
  currentGestationCount: number;
  email: string;
  hasPartner: boolean;
  name: string;
  password: string;
}

export interface BabySignUpInfo {
  birthday: string;
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
      data_nascimento: motherInfo.birthday,
      email: motherInfo.email,
      localizacao: motherInfo.birthLocation,
      nome: motherInfo.name,
      senha: motherInfo.password,
      bebes: babiesInfo.map(info => ({
        data_parto: info.birthday,
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
