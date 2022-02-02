import api from 'services/api';

export interface MotherSignUpInfo {
  birthday: string;
  currentGestationCount: number;
  email: string;
  hasPartner: boolean;
  location: string;
  name: string;
  password: string;
}

export interface BabySignUpInfo {
  birthday: string;
  birthLocation: string;
  name: string;
}

// Cadastra uma mãe no sistema.
async function signUpMother(
  motherInfo: MotherSignUpInfo,
): Promise<string | null> {
  try {
    const request = await api.post('/maes', {
      companheiro: motherInfo.hasPartner,
      data_nascimento: motherInfo.birthday,
      email: motherInfo.email,
      localizacao: motherInfo.location,
      nome: motherInfo.name,
      senha: motherInfo.password,
    });
    return request.data.token;
  } catch (error) {
    return null;
  }
}

// Cadastra um bebê no sistema.
async function signUpBaby(
  token: string,
  babyInfo: BabySignUpInfo,
): Promise<void> {
  await api.post(
    '/bebes',
    {
      data_parto: babyInfo.birthday,
      local: babyInfo.birthLocation,
      nome: babyInfo.name,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );
}

// Cadastra uma mãe e seus bebês.
async function signUp(
  motherInfo: MotherSignUpInfo,
  babiesInfo: BabySignUpInfo[],
): Promise<boolean> {
  const token = await signUpMother(motherInfo);
  if (token === null) {
    return false;
  }
  await Promise.all(babiesInfo.map(async baby => signUpBaby(token, baby)));
  return true;
}

export default signUp;
