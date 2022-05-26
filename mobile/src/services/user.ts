import { format } from 'date-fns';
import i18n from 'i18n-js';

import api from 'services/api';

import type { BabySignUpInfo, UserSignUpInfo } from './signUp';

export enum Institution {
  HU_UEL,
  MATERNITY,
  OTHER,
}

interface BabyInfo extends BabySignUpInfo {
  id: number;
}

interface MotherUpdateInfo extends UserSignUpInfo {
  babies: BabyInfo[];
}

type FilteredUserSignUpInfo = Omit<
  MotherUpdateInfo,
  | 'birthDate'
  | 'birthWeeks'
  | 'institution'
  | 'city'
  | 'currentGestationCount'
  | 'origin'
  | 'password'
  | 'phone'
  | 'possibleBirthDate'
  | 'socialMedia'
  | 'state'
  | 'weeksPregnant'
>;

export interface UserInfo extends FilteredUserSignUpInfo {
  institution: Institution;
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
    object.institution &&
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
      birthday: new Date(baby.data_parto),
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
    let institution = Institution.HU_UEL;
    switch (dataBirthLocation) {
      case i18n.t('MotherFormPage.LocationOptions.HU').toLowerCase():
        institution = Institution.HU_UEL;
        break;
      case i18n.t('MotherFormPage.LocationOptions.Maternity').toLowerCase():
        institution = Institution.MATERNITY;
        break;
      default:
        institution = Institution.OTHER;
        break;
    }

    return {
      babies,
      babiesBirthLocations,
      birthday: new Date(data.data_nascimento),
      institution,
      email: data.email,
      hasPartner: data.companheiro,
      name: data.nome,
      userType: data.categoria,
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
      data_nascimento: format(userInfo.birthday, 'yyyy-MM-dd'),
      email: userInfo.email,
      localizacao: userInfo.institution,
      data_parto: userInfo.birthDate,
      nome: userInfo.name,
      bebes: userInfo.babies.map(baby => ({
        id: baby.id,
        local_nascimento: baby.birthLocation,
        local_atual: baby.currentLocation,
        nome: baby.name,
      })),
    });
    return true;
  } catch (error) {
    return false;
  }
}
