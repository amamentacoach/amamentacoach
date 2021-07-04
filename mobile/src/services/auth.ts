import api from './api';

export interface MotherSignUpInfo {
  email: string;
  password: string;
  name: string;
  phone: string;
  pregnantCount: number;
  alreadyBreastfeed: boolean;
  timeSpentBreastFeeding: string;
  birthday: string;
  partner: boolean;
  liveTogether: string;
  education: string;
  wage: string;
  plannedPregnancy: boolean;
  firstVisit: string;
  firstStimulus: boolean;
  timeFirstStimulus: string;
  childrenAlive: string;
  receivedPreNatalGuidance: boolean;
  occupation: boolean;
  maternityLeave: number | null;
}

export interface BabySignUpInfo {
  name: string;
  birthday: string;
  gestationWeeks: number;
  gestationDays: number;
  weight: number;
  apgar1: number | null;
  apgar2: number | null;
  birthType: boolean;
  touched: boolean;
  birthLocation: string;
  difficulties: boolean;
}

export interface MotherInfo {
  name: string;
  birthday: string;
  images: {
    mother: string | null;
    baby: string | null;
    father: string | null;
  };
  babiesBirthLocations: {
    AC: boolean;
    UCI: boolean;
    UTI: boolean;
  };
  partner: boolean;
  babies: { id: number; name: string }[];
}

export enum LoginStatus {
  Success,
  AccountNotAuthorized,
  IncorrectLogin,
  FailedToConnect,
}

// Cadastra uma mãe no sistema.
export async function signUpMother(
  motherInfo: MotherSignUpInfo,
): Promise<string | null> {
  try {
    const request = await api.post('/maes', {
      email: motherInfo.email,
      senha: motherInfo.password,
      nome: motherInfo.name,
      data_nascimento: motherInfo.birthday,
      whatsapp: motherInfo.phone,
      amamentou_antes: motherInfo.alreadyBreastfeed,
      companheiro: motherInfo.partner,
      moram_juntos: motherInfo.liveTogether,
      escolaridade: motherInfo.education,
      renda: motherInfo.wage,
      qtd_gravidez: motherInfo.pregnantCount,
      tempo_amamentacao: motherInfo.timeSpentBreastFeeding,
      gestacao_planejada: motherInfo.plannedPregnancy,
      primeira_visita: motherInfo.firstVisit,
      primeiro_estimulo: motherInfo.firstStimulus,
      tempo_primeiro_estimulo: motherInfo.timeFirstStimulus,
      qtd_filhos_vivos: motherInfo.childrenAlive,
      orientacao_prenatal: motherInfo.receivedPreNatalGuidance,
      ocupacao: motherInfo.occupation,
      licenca_maternidade: motherInfo.maternityLeave,
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
      nome: babyInfo.name,
      data_parto: babyInfo.birthday,
      semanas_gest: babyInfo.gestationWeeks,
      dias_gest: babyInfo.gestationDays,
      complicacoes: babyInfo.difficulties,
      contato_pele: babyInfo.touched,
      peso: babyInfo.weight,
      apgar1: babyInfo.apgar1,
      apgar2: babyInfo.apgar2,
      tipo_parto: babyInfo.birthType,
      local: babyInfo.birthLocation,
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
): Promise<{ token: string; status: LoginStatus }> {
  const login = {
    token: '',
    status: LoginStatus.FailedToConnect,
  };

  try {
    const request = await api.post('/login', {
      email,
      senha: password,
    });
    login.token = request.data.token;
    login.status = LoginStatus.Success;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        login.status = LoginStatus.IncorrectLogin;
      } else if (error.response.status === 404) {
        login.status = LoginStatus.AccountNotAuthorized;
      }
    }
  }
  return login;
}

// Retorna os dados de uma mãe.
export async function getMotherInfo(): Promise<MotherInfo | null> {
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
      birthday: data.data_nascimento,
      partner: data.companheiro,
      images: {
        mother: data.imagem_mae,
        baby: data.imagem_bebe,
        father: data.imagem_pai,
      },
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
