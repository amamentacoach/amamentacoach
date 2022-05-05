import i18n from 'i18n-js';

import api from 'services/api';

export enum BirthLocation {
  HU_UEL,
  MATERNITY,
}

interface BabyInfo {
  birthday: string;
  id: number;
  name: string;
  postBirthLocation: string;
}

interface MotherUpdateInfo {
  babies: BabyInfo[];
  birthday: string;
  birthLocation: string;
  email: string;
  hasPartner: boolean;
  name: string;
}

export interface MotherInfo {
  birthday: string;
  birthLocation: BirthLocation;
  email: string;
  name: string;
  hasPartner: boolean;
  babies: BabyInfo[];
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
    object.email &&
    object.images &&
    object.images.baby !== undefined &&
    object.images.father !== undefined &&
    object.images.mother !== undefined &&
    object.location &&
    object.name &&
    object.hasPartner
  );
}

// Retorna os dados de uma mãe.
export async function getMotherInfo(): Promise<MotherInfo | null> {
  try {
    const { data } = await api.get('/maes');
    // Recebe todos os ids e nome dos bebês.
    const babies: MotherInfo['babies'] = data.bebes.map((baby: any) => ({
      birthday: baby.data_parto,
      id: baby.id,
      name: baby.nome,
      postBirthLocation: baby.local,
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
      email: data.email,
      birthday: data.data_nascimento,
      name: data.nome,
      hasPartner: data.companheiro,
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

// Atualiza os dados de um usuário.
export async function updateUserProfile(
  userInfo: MotherUpdateInfo,
): Promise<boolean> {
  try {
    await api.put('/user', {
      companheiro: userInfo.hasPartner,
      data_nascimento: userInfo.birthday,
      email: userInfo.email,
      localizacao: userInfo.birthLocation,
      nome: userInfo.name,
      bebes: userInfo.babies.map(baby => ({
        id: baby.id,
        data_parto: baby.birthday,
        local: baby.postBirthLocation,
        nome: baby.name,
      })),
    });
    return true;
  } catch (error) {
    return false;
  }
}
