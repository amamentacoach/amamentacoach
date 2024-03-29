import { format } from 'date-fns';

import api from 'services/api';

import type { UserSignUpInfo } from 'services/signUp';

type MotherInfo = Pick<
  UserSignUpInfo,
  'babies' | 'birthDate' | 'birthWeeks' | 'city' | 'hasPartner' | 'state'
>;

// Informa sobre o nascimento de um bebê, consequentemente convertendo um  usuário de gestante para
// mãe.
async function updateBabyBirthInfo(motherInfo: MotherInfo): Promise<boolean> {
  try {
    const updatedUserInfo = {
      cidade: motherInfo.city,
      estado: motherInfo.state,
      companheiro: motherInfo.hasPartner,
      data_parto: motherInfo.birthDate
        ? format(motherInfo.birthDate, 'yyyy-MM-dd')
        : null,
      semanas_gestacao: motherInfo.birthWeeks,
      bebes: motherInfo.babies.map(baby => ({
        instituicao: baby.birthInstitution,
        local_atual: baby.currentLocation,
        local_nascimento: baby.birthLocation,
        nome: baby.name,
      })),
    };
    await api.put('/user/informarNascimento', updatedUserInfo);
    return true;
  } catch (error) {
    return false;
  }
}

export default updateBabyBirthInfo;
