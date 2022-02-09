import i18n from 'i18n-js';

import api from 'services/api';

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

export enum LoginStatus {
  AccountNotAuthorized,
  FailedToConnect,
  IncorrectLogin,
  Success,
}

interface LoginResponse {
  status: LoginStatus;
  token: string;
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
    const babies: MotherInfo['babies'] = data.bebes.map((baby: any) => ({
      id: baby.id,
      name: baby.nome,
    }));

    const babiesBirthLocations: MotherInfo['babiesBirthLocations'] = {
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

    const dataBirthLocation = data.localizacao?.toLowerCase();
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
