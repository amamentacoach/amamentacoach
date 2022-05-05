import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormPickerInput from 'components/FormPickerInput';
import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import { useAuth } from 'contexts/auth';
import { formatWithLocale } from 'lib/date-fns';
import { PaddedScrollView } from 'lib/sharedStyles';
import { BirthLocation, updateUserProfile } from 'services/user';

import { HeaderIconContainer } from '../Profile/styles';

import type { FormikHelpers } from 'formik';
import type { AuthStackProps } from 'routes/auth';
import type { MotherInfo } from 'services/user';

import { FormContainer, SubmitButtonContainer } from './styles';

import IcEdit from '@assets/images/icons/ic_edit.svg';

type BabyInfo = MotherInfo['babies'][0];

interface BabyProfileProps {
  selectedBaby: BabyInfo;
}

interface EditFormProps extends BabyProfileProps {
  setDisplayEditForm: (isVisible: boolean) => void;
}

const EditForm: React.FC<EditFormProps> = ({
  selectedBaby,
  setDisplayEditForm,
}) => {
  const { motherInfo, refreshMotherInfo } = useAuth();
  const babyFormSchema = Yup.object()
    .shape({
      birthday: Yup.string().required(i18n.t('Yup.Required')),
      postBirthLocation: Yup.string().required(i18n.t('Yup.Required')),
      name: Yup.string().required(i18n.t('Yup.Required')),
    })
    .required();

  async function handleFormSubmit(
    formValues: BabyInfo,
    { setSubmitting }: FormikHelpers<BabyInfo>,
  ): Promise<void> {
    setSubmitting(true);
    let updatedUserInfo = {
      ...motherInfo,
      birthLocation:
        motherInfo.birthLocation === BirthLocation.MATERNITY
          ? i18n.t('MotherFormPage.LocationOptions.Maternity')
          : i18n.t('MotherFormPage.LocationOptions.HU'),
      babies: motherInfo.babies.map(baby => {
        if (baby.id === selectedBaby.id) {
          return { ...selectedBaby, ...formValues };
        }
        return baby;
      }),
    };

    const status = await updateUserProfile(updatedUserInfo);
    setSubmitting(false);
    if (status) {
      await refreshMotherInfo();
      setDisplayEditForm(false);
    }
  }

  return (
    <Formik<BabyInfo>
      initialValues={selectedBaby}
      validateOnChange={false}
      validationSchema={babyFormSchema}
      onSubmit={handleFormSubmit}>
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        dirty,
        errors,
        values,
      }) => (
        <FormContainer>
          <FormTextInput
            error={errors.name}
            label={i18n.t('BabyFormPage.Name')}
            placeholder={i18n.t('Name')}
            value={values.name}
            onChangeText={handleChange('name')}
          />

          <FormDateInput
            error={errors.birthday}
            label={i18n.t('BabyFormPage.BirthDate')}
            placeholder={i18n.t('BabyFormPage.Placeholder.BirthDate')}
            value={values.birthday}
            onChange={handleChange('birthday')}
          />

          <FormRadioGroupInput
            error={errors.postBirthLocation}
            label={i18n.t('BabyFormPage.BirthLocation')}
            options={[
              i18n.t('Lodging'),
              i18n.t('UCI'),
              i18n.t('UCIN Kangaroo'),
              i18n.t('UTI'),
            ]}
            values={[values.postBirthLocation]}
            onChange={fieldValues =>
              setFieldValue('postBirthLocation', fieldValues[0])
            }
          />
          <SubmitButtonContainer>
            <MainButton
              disabled={!dirty}
              text={i18n.t('Actions.Save')}
              onPress={handleSubmit}
            />
          </SubmitButtonContainer>
        </FormContainer>
      )}
    </Formik>
  );
};

const DisplayValues: React.FC<BabyProfileProps> = ({ selectedBaby }) => {
  const birthDay = new Date(selectedBaby.birthday);
  // Corrige a data, removendo as horas referentes ao fuso horário.
  const utcBirthday = new Date(
    birthDay.valueOf() + birthDay.getTimezoneOffset() * 60 * 1000,
  );

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

      <FormTextInput
        editable={false}
        label={i18n.t('BabyFormPage.BirthDate')}
        placeholder={i18n.t('BabyFormPage.Placeholder.BirthDate')}
        selectTextOnFocus={false}
        value={formatWithLocale(utcBirthday, 'P')}
        onChange={() => {}}
      />

      <FormTextInput
        editable={false}
        label={i18n.t('BabyFormPage.BirthLocation')}
        selectTextOnFocus={false}
        value={selectedBaby.postBirthLocation}
        onChange={() => {}}
      />
    </FormContainer>
  );
};

const MyBabies: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { motherInfo } = useAuth();
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [baby, setBaby] = useState(motherInfo.babies[0]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconContainer>
          <IcEdit
            title="Editar"
            onPress={() => setDisplayEditForm(!displayEditForm)}
          />
        </HeaderIconContainer>
      ),
    });
  }, [displayEditForm, navigation, baby]);

  const handleBabySelected = (selectedName: string): void => {
    const selectedBaby = motherInfo.babies.filter(
      ({ name }) => name === selectedName,
    );
    if (selectedBaby.length > 0) {
      setBaby(selectedBaby[0]);
    }
  };

  useEffect(() => {
    const selectedBaby = motherInfo.babies.filter(({ id }) => id === baby.id);
    if (selectedBaby.length > 0) {
      setBaby(selectedBaby[0]);
    }
  }, [motherInfo]);

  return (
    <PaddedScrollView>
      {!displayEditForm && (
        <FormPickerInput
          label={i18n.t('SelectBaby')}
          options={motherInfo.babies.map(({ name }) => name)}
          value={baby.name}
          onChange={handleBabySelected}
        />
      )}
      {displayEditForm ? (
        <EditForm selectedBaby={baby} setDisplayEditForm={setDisplayEditForm} />
      ) : (
        <DisplayValues selectedBaby={baby} />
      )}
    </PaddedScrollView>
  );
};

export default MyBabies;
