import { format } from 'date-fns';
import i18n from 'i18n-js';

import api from 'services/api';

import type { BabySignUpInfo, UserSignUpInfo } from './signUp';

export enum Institution {
  HU_UEL,
  HMDI,
  AHC,
  OTHER,
}

export enum UserTypes {
  MOTHER,
  PREGNANT,
  HEALTHCARE_WORKER,
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
  | 'city'
  | 'currentGestationCount'
  | 'institution'
  | 'password'
  | 'phone'
  | 'possibleBirthDate'
  | 'socialMedia'
  | 'state'
  | 'userType'
  | 'weeksPregnant'
>;

export interface UserInfo extends FilteredUserSignUpInfo {
  institution: Institution;
  type: UserTypes;
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
export function isUserInfo(object: any): object is UserInfo {
  return (
    object &&
    object.institution &&
    object.type &&
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
export async function getUserInfo(): Promise<UserInfo | null> {
  try {
    const { data } = await api.get('/maes');
    const babiesBirthLocations: UserInfo['babiesBirthLocations'] = {
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

    const dataUserType = data.categoria?.toLowerCase();
    let userType;
    switch (dataUserType) {
      case i18n.t('MotherFormPage.UserTypeOptions.Mother').toLowerCase():
      case null:
        userType = UserTypes.MOTHER;
        break;
      case i18n.t('MotherFormPage.UserTypeOptions.Pregnant').toLowerCase():
        userType = UserTypes.PREGNANT;
        break;
      case i18n
        .t('MotherFormPage.UserTypeOptions.HealthcareWorker')
        .toLowerCase():
        userType = UserTypes.HEALTHCARE_WORKER;
        break;
      default:
        userType = UserTypes.OTHER;
        break;
    }

    const dataBirthLocation = data.localizacao?.toLowerCase();
    let institution;
    switch (dataBirthLocation) {
      case i18n.t('MotherFormPage.InstitutionOptions.HU').toLowerCase():
      case 'hu':
        institution = Institution.HU_UEL;
        break;
      case i18n.t('MotherFormPage.InstitutionOptions.HMDI').toLowerCase():
      case 'maternidade dona íris':
        institution = Institution.HMDI;
        break;
      case i18n.t('MotherFormPage.InstitutionOptions.AHCH').toLowerCase():
        institution = Institution.AHC;
        break;
      case i18n
        .t('MotherFormPage.InstitutionOptions.SocialMedia')
        .toLowerCase():
      default:
        institution = Institution.OTHER;
        break;
    }

    const userInfo = {
      babies: data.bebes.map((baby: any) => ({
        birthday: new Date(baby.data_parto),
        id: baby.id,
        name: baby.nome,
        postBirthLocation: baby.local,
      })),
      babiesBirthLocations,
      birthday: new Date(data.data_nascimento),
      email: data.email,
      hasPartner: data.companheiro,
      images: {
        mother: data.imagem_mae,
        baby: data.imagem_bebe,
        father: data.imagem_pai,
      },
      institution,
      name: data.nome,
      type: userType,
    };
    console.log(userInfo);

    return userInfo;
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
