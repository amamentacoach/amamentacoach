import { Formik } from 'formik';
import i18n from 'i18n-js';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import { useAuth } from 'contexts/auth';
import { Institution, updateUserProfile } from 'services/user';

import type { FormikHelpers } from 'formik';
import type { userInfo } from 'services/user';

import { FormContainer, SubmitButtonContainer } from './styles';

type BabyInfo = userInfo['babies'][0];

interface Props {
  selectedBaby: BabyInfo;
  setDisplayEditForm: (isVisible: boolean) => void;
}

const EditInfoForm: React.FC<Props> = ({
  selectedBaby,
  setDisplayEditForm,
}) => {
  const { userInfo, refreshUserInfo } = useAuth();
  const babyFormSchema = Yup.object()
    .shape({
      birthday: Yup.date().required(i18n.t('Yup.Required')),
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
      ...userInfo,
      birthLocation:
        userInfo.birthLocation === Institution.MATERNITY
          ? i18n.t('MotherFormPage.LocationOptions.Maternity')
          : i18n.t('MotherFormPage.LocationOptions.HU'),
      babies: userInfo.babies.map(baby => {
        if (baby.id === selectedBaby.id) {
          return { ...selectedBaby, ...formValues };
        }
        return baby;
      }),
    };

    const status = await updateUserProfile(updatedUserInfo);
    setSubmitting(false);
    if (status) {
      await refreshUserInfo();
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
            onChange={date => setFieldValue('birthday', date)}
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

export default EditInfoForm;
