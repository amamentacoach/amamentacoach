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
  timeSpentBreastFeeding: string[];
}

interface IBabySignUpInfo {
  name: string;
  birthday: string;
  gestationWeeks: number;
  gestationDays: number;
  weight: number;
  apgar1: number | null;
  apgar2: number | null;
  birthType: boolean;
  birthLocation: string;
  difficulties: boolean;
}

export interface IMotherInfo {
  name: string;
  babiesBirthLocations: {
    AC: boolean;
    UCI: boolean;
    UTI: boolean;
  };
  babies: { id: number; name: string }[];
}

// Cadastra uma mãe no sistema.
export async function signUpMother(
  motherInfo: IMotherSignUpInfo,
): Promise<string | null> {
  try {
    const request = await api.post('/maes', {
      email: motherInfo.email,
      senha: motherInfo.password,
      nome: motherInfo.name,
      data_nascimento: motherInfo.birthday,
      amamentou_antes: motherInfo.alreadyBreastfeed,
      companheiro: motherInfo.married,
      moram_juntos: motherInfo.liveTogether,
      escolaridade: motherInfo.education,
      renda: motherInfo.wage,
      qtd_gravidez: motherInfo.pregnantCount,
      tempo_amamentacao: motherInfo.timeSpentBreastFeeding,
    });
    return request.data.token;
  } catch (error) {
    return null;
  }
}

// Cadastra um bebê no sistema.
export async function signUpBaby(
  token: string,
  babyInfo: IBabySignUpInfo,
): Promise<void> {
  await api.post(
    '/bebes',
    {
      nome: babyInfo.name,
      data_parto: babyInfo.birthday,
      semanas_gest: babyInfo.gestationWeeks,
      dias_gest: babyInfo.gestationDays,
      peso: babyInfo.weight,
      apgar1: babyInfo.apgar1,
      apgar2: babyInfo.apgar2,
      tipo_parto: babyInfo.birthType,
      local: babyInfo.birthLocation,
      complicacoes: babyInfo.difficulties,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  );
}

// Loga uma mãe no sistema.
export async function signIn(
  email: string,
  password: string,
): Promise<string | null> {
  try {
    const request = await api.post('/login', {
      email,
      senha: password,
    });
    return request.data.token;
  } catch (error) {
    return null;
  }
}

// Retorna os dados de uma mãe.
export async function getMotherInfo(): Promise<IMotherInfo | null> {
  try {
    const { data } = await api.get('/maes');
    // Recebe todos os ids e nome dos bebês.
    const babies: { id: number; name: string }[] = data.bebes.map(
      (baby: any) => ({
        id: baby.id,
        name: baby.nome,
      }),
    );
    const babiesBirthLocations = {
      AC: false,
      UCI: false,
      UTI: false,
    };
    // Recebe todos os locais de nascimento dos bebês e marca como verdadeiro os valores
    // apropriados.
    Object.values(data.bebes).forEach((baby: any) => {
      const babyBirthPlace: string = baby.local.toLowerCase();
      switch (babyBirthPlace) {
        case 'alojamento conjunto':
          babiesBirthLocations.AC = true;
          break;
        case 'uci neonatal':
          babiesBirthLocations.UCI = true;
          break;
        case 'uti neonatal':
          babiesBirthLocations.UTI = true;
          break;
        default:
          break;
      }
    });

    return {
      name: data.nome,
      babiesBirthLocations,
      babies,
    };
  } catch (error) {
    return null;
  }
}

// Envia um email de alteração de senha para a mãe.
export async function forgotPassword(email: string): Promise<boolean> {
  try {
    await api.post('/esqueceusenha', {
      email,
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Altera a senha de uma mãe.
export async function newPassword(password: string): Promise<boolean> {
  try {
    await api.post('/alterarsenha', {
      senha: password,
    });
    return true;
  } catch (error) {
    return false;
  }
}
