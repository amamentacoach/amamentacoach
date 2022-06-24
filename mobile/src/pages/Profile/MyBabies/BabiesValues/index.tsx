import i18n from 'i18n-js';

import FormTextInput from 'components/FormTextInput';
import { formatWithLocale } from 'lib/date-fns';

import type { userInfo } from 'services/user';

import { FormContainer } from './styles';

type BabyInfo = userInfo['babies'][0];

interface BabyProfileProps {
  selectedBaby: BabyInfo;
}

const DisplayValues: React.FC<BabyProfileProps> = ({ selectedBaby }) => {
  // const birthDay = new Date(selectedBaby.birthday);
  // // Corrige a data, removendo as horas referentes ao fuso horário.
  // const utcBirthday = new Date(
  //   birthDay.valueOf() + birthDay.getTimezoneOffset() * 60 * 1000,
  // );

  return (
    <FormContainer>
      <FormTextInput
        editable={false}
        label={i18n.t('BabyFormPage.Name')}
        placeholder={i18n.t('Name')}
        selectTextOnFocus={false}
        value={selectedBaby.name}
        onChange={() => {}}
      />

      {/*
       TODO Mover para o perfil da mãe.
      <FormTextInput
        editable={false}
        label={i18n.t('BabyFormPage.BirthDate')}
        placeholder={i18n.t('BabyFormPage.Placeholder.BirthDate')}
        selectTextOnFocus={false}
        value={formatWithLocale(utcBirthday, 'P')}
        onChange={() => {}}
      /> */}

      <FormTextInput
        editable={false}
        label={i18n.t('BabyFormPage.BirthLocation')}
        selectTextOnFocus={false}
        value={selectedBaby.birthLocation}
        onChange={() => {}}
      />
    </FormContainer>
  );
};

export default DisplayValues;
