import i18n from 'i18n-js';

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

enum BirthLocation {
  HU_UEL,
  MATERNITY,
}

export interface MotherInfo {
  birthday: string;
  birthLocation: BirthLocation;
  name: string;
  partner: boolean;
  babies: {
    id: number;
    name: string;
  }[];
  babiesBirthLocations: {
    AC: boolean;
    UCI: boolean;
    UCIN: boolean;
    UTI: boolean;
  };
  images: {
    mother: string | null;
    baby: string | null;
    father: string | null;
  };
}

interface LoginResponse {
  status: LoginStatus;
  token: string;
}

export enum LoginStatus {
  AccountNotAuthorized,
  FailedToConnect,
  IncorrectLogin,
  Success,
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

// Loga uma mãe no sistema.
export async function signIn(
  email: string,
  password: string,
): Promise<LoginResponse> {
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
  } catch (error: any) {
    switch (error.response?.status) {
      case 401:
        login.status = LoginStatus.IncorrectLogin;
        break;
      case 404:
        login.status = LoginStatus.AccountNotAuthorized;
        break;
      default:
        break;
    }
  }
  return login;
}

// Verifica se um objeto carrega as informações da mãe.
export function isMotherInfo(object: any): object is MotherInfo {
  return (
    object &&
    object.babies &&
    object.babiesBirthLocations &&
    object.babiesBirthLocations.AC !== undefined &&
    object.babiesBirthLocations.UCI !== undefined &&
    object.babiesBirthLocations.UTI !== undefined &&
    object.birthday &&
    object.images &&
    object.images.baby !== undefined &&
    object.images.father !== undefined &&
    object.images.mother !== undefined &&
    object.location &&
    object.name &&
    object.partner
  );
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
      UCIN: false,
      UTI: false,
    };
    // Recebe todos os locais de nascimento dos bebês e marca como verdadeiro os valores
    // apropriados.
    Object.values(data.bebes).forEach((baby: any) => {
      const babyBirthPlace: string = baby.local.toLowerCase();
      switch (babyBirthPlace) {
        case i18n.t('Lodging').toLowerCase():
          babiesBirthLocations.AC = true;
          break;
        case i18n.t('UCI').toLowerCase():
          babiesBirthLocations.UCI = true;
          break;
        case i18n.t('UCIN Kangaroo').toLowerCase():
          babiesBirthLocations.UCIN = true;
          break;
        case i18n.t('UTI').toLowerCase():
          babiesBirthLocations.UTI = true;
          break;
        default:
          break;
      }
    });

    const dataBirthLocation = data.localizacao.toLowerCase();
    let birthLocation = BirthLocation.HU_UEL;
    switch (dataBirthLocation) {
      case i18n.t('MotherFormPage.LocationOptions.HU').toLowerCase():
        birthLocation = BirthLocation.HU_UEL;
        break;
      case i18n.t('MotherFormPage.LocationOptions.Maternity').toLowerCase():
        birthLocation = BirthLocation.MATERNITY;
        break;
      default:
        break;
    }

    return {
      babies,
      babiesBirthLocations,
      birthLocation,
      birthday: data.data_nascimento,
      name: data.nome,
      partner: data.companheiro,
      images: {
        mother: data.imagem_mae,
        baby: data.imagem_bebe,
        father: data.imagem_pai,
      },
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
