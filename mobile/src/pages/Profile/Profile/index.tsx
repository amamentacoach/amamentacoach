import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import React, { useLayoutEffect, useState } from 'react';
import config from 'react-native-config';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormPickerInput from 'components/FormPickerInput';
import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import { useAuth } from 'contexts/auth';
import { formatWithLocale } from 'lib/date-fns';
import { Center, Flex, PaddedScrollView } from 'lib/sharedStyles';
import { BirthLocation, updateUserProfile } from 'services/user';

import type { FormikHelpers } from 'formik';
import type { RootStackProps } from 'routes/app';
import type { AuthStackProps } from 'routes/auth';

import {
  FormContainer,
  UploadText,
  HeaderIconContainer,
  SubmitButtonContainer,
  UserImage,
} from './styles';

import IcEdit from '@assets/images/icons/ic_edit.svg';

interface FormValues {
  birthday: string;
  hasPartner: boolean | undefined;
  birthLocation: string;
  name: string;
}

interface EditFormProps {
  setDisplayEditForm: (isVisible: boolean) => void;
}

const EditForm: React.FC<EditFormProps> = ({ setDisplayEditForm }) => {
  const { motherInfo, refreshMotherInfo } = useAuth();
  const motherFormSchema = Yup.object({
    birthday: Yup.string().required(i18n.t('Yup.Required')),
    hasPartner: Yup.boolean().required(i18n.t('Yup.Required')),
    birthLocation: Yup.string().required(i18n.t('Yup.Required')),
    name: Yup.string().required(i18n.t('Yup.Required')),
  }).required();

  const initialValues = {
    birthday: motherInfo.birthday,
    hasPartner: motherInfo.hasPartner!,
    birthLocation:
      motherInfo.birthLocation === BirthLocation.MATERNITY
        ? i18n.t('MotherFormPage.LocationOptions.Maternity')
        : i18n.t('MotherFormPage.LocationOptions.HU'),
    name: motherInfo.name,
  };

  // Avança para a próxima página passando as informações do usuário.
  async function handleFormSubmit(
    formValues: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ): Promise<void> {
    setSubmitting(true);
    const updatedUserInfo = {
      email: motherInfo.email,
      name: formValues.name,
      birthday: formValues.birthday,
      hasPartner: formValues.hasPartner!,
      birthLocation: formValues.birthLocation,
      babies: motherInfo.babies,
    };
    const status = await updateUserProfile(updatedUserInfo);
    setSubmitting(false);
    if (status) {
      await refreshMotherInfo();
      setDisplayEditForm(false);
    }
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={motherFormSchema}
      onSubmit={handleFormSubmit}>
      {({
        handleChange,
        setFieldValue,
        handleSubmit,
        dirty,
        errors,
        values,
      }) => (
        <FormContainer>
          <FormTextInput
            error={errors.name}
            label={i18n.t('MotherFormPage.Name')}
            placeholder={i18n.t('Name')}
            value={values.name}
            onChangeText={handleChange('name')}
          />

          <FormDateInput
            error={errors.birthday}
            label={i18n.t('MotherFormPage.Birthday')}
            placeholder={i18n.t('MotherFormPage.BirthdayPlaceholder')}
            value={motherInfo.birthday}
            onChange={handleChange('birthday')}
          />

          <FormRadioGroupInput
            error={errors.hasPartner}
            label={i18n.t('MotherFormPage.Partner')}
            options={[i18n.t('Yes'), i18n.t('No')]}
            values={motherInfo.hasPartner ? [i18n.t('Yes')] : [i18n.t('No')]}
            onChange={fieldValues =>
              setFieldValue('hasPartner', fieldValues[0] === i18n.t('Yes'))
            }
          />

          <FormPickerInput
            error={errors.birthLocation}
            label={i18n.t('MotherFormPage.Location')}
            options={[
              i18n.t('MotherFormPage.LocationOptions.HU'),
              i18n.t('MotherFormPage.LocationOptions.Maternity'),
            ]}
            value={
              motherInfo.birthLocation === BirthLocation.MATERNITY
                ? i18n.t('MotherFormPage.LocationOptions.Maternity')
                : i18n.t('MotherFormPage.LocationOptions.HU')
            }
            onChange={handleChange('location')}
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

const DisplayValues: React.FC = () => {
  const { motherInfo } = useAuth();
  const navigation = useNavigation<RootStackProps>();

  return (
    <Flex>
      <Center>
        <UserImage
          source={{
            uri: `${config.API_URL}/uploads/${motherInfo.images.mother}`,
          }}
        />
        <UploadText onPress={() => navigation.navigate('UploadMotherPhoto')}>
          Editar foto
        </UploadText>
      </Center>
      <FormContainer>
        <FormTextInput
          editable={false}
          label={i18n.t('MotherFormPage.Name')}
          selectTextOnFocus={false}
          value={motherInfo.name}
        />
        <FormTextInput
          editable={false}
          label={i18n.t('MotherFormPage.Birthday')}
          selectTextOnFocus={false}
          value={formatWithLocale(new Date(motherInfo.birthday), 'P')}
        />
        <FormTextInput
          editable={false}
          label={i18n.t('MotherFormPage.Partner')}
          selectTextOnFocus={false}
          value={motherInfo.hasPartner ? i18n.t('Yes') : i18n.t('No')}
        />
        <FormTextInput
          editable={false}
          label={i18n.t('MotherFormPage.Location')}
          selectTextOnFocus={false}
          value={
            motherInfo.birthLocation === BirthLocation.MATERNITY
              ? i18n.t('MotherFormPage.LocationOptions.Maternity')
              : i18n.t('MotherFormPage.LocationOptions.HU')
          }
        />
      </FormContainer>
    </Flex>
  );
};

const Profile: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const [displayEditForm, setDisplayEditForm] = useState(false);

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
  }, [displayEditForm, navigation]);

  return (
    <PaddedScrollView>
      {displayEditForm ? (
        <EditForm setDisplayEditForm={setDisplayEditForm} />
      ) : (
        <DisplayValues />
      )}
    </PaddedScrollView>
  );
};

export default Profile;