import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import { Center, PaddedScrollView } from 'lib/sharedStyles';

import type { FormikErrors } from 'formik';
import type { AuthRouteProp, AuthStackProps } from 'routes/auth';
import type { BabySignUpInfo } from 'services/signUp';

import {
  FirstSubOptionContainer,
  FormContainer,
  HeaderSubText,
  HeaderText,
  SubmitButtonContainer,
} from './styles';

interface FormBabyInfo {
  birthday: string;
  postBirthLocation: string;
  name: string;
}

type FormValues = FormBabyInfo[];

const BabyForm: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { motherInfo } = useRoute<AuthRouteProp<'BabyForm'>>().params;

  const formInitialValues: FormValues = [
    ...Array(motherInfo.currentGestationCount),
  ].map(_ => ({
    name: '',
    birthday: '',
    postBirthLocation: '',
  }));

  const babyFormSchema = Yup.array()
    .of(
      Yup.object().shape({
        birthday: Yup.string().required(i18n.t('Yup.Required')),
        postBirthLocation: Yup.string().required(i18n.t('Yup.Required')),
        name: Yup.string().required(i18n.t('Yup.Required')),
      }),
    )
    .required();

  function getBabyError(
    errors: FormikErrors<FormValues>,
    index: number,
    field: string,
  ): string {
    if (errors && errors[index]) {
      return (errors[index] as { [key: string]: any })[field];
    }
    return '';
  }

  function prepareNewBabiesData(formValues: FormValues): BabySignUpInfo[] {
    const babiesInfo: BabySignUpInfo[] = formValues.map(baby => ({
      birthday: baby.birthday,
      postBirthLocation: baby.postBirthLocation,
      name: baby.name,
    }));
    return babiesInfo;
  }

  function handleFormSubmit(formValues: FormValues): void {
    const babiesInfo = prepareNewBabiesData(formValues);
    navigation.navigate('AcceptTermsOfService', { motherInfo, babiesInfo });
  }

  return (
    <PaddedScrollView>
      <HeaderText>
        {i18n.t('Auth.SignUpStep', { current: '3', max: '4' })}
      </HeaderText>

      <HeaderSubText>{i18n.t('BabyFormPage.Header')}</HeaderSubText>
      <Formik
        initialValues={formInitialValues}
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
            {values.map((_, index) => (
              <View key={index}>
                <FormTextInput
                  error={getBabyError(errors, index, 'name')}
                  label={i18n.t('BabyFormPage.Name')}
                  placeholder={i18n.t('Name')}
                  value={values[index].name}
                  onChangeText={handleChange(`${index}.name`)}
                />

                <FormDateInput
                  error={getBabyError(errors, index, 'birthday')}
                  label={i18n.t('BabyFormPage.BirthDate')}
                  placeholder={i18n.t('BabyFormPage.Placeholder.BirthDate')}
                  onChange={handleChange(`${index}.birthday`)}
                />

                <FormRadioGroupInput
                  error={getBabyError(errors, index, 'postBirthLocation')}
                  label={i18n.t('BabyFormPage.BirthLocation')}
                  options={[
                    i18n.t('Lodging'),
                    i18n.t('UCI'),
                    i18n.t('UCIN Kangaroo'),
                    i18n.t('UTI'),
                  ]}
                  onChange={fieldValues =>
                    setFieldValue(`${index}.postBirthLocation`, fieldValues[0])
                  }
                />
              </View>
            ))}

            <SubmitButtonContainer>
              <FirstSubOptionContainer>
                <SecondaryButton
                  text={i18n.t('GoBack')}
                  onPress={() => navigation.goBack()}
                />
              </FirstSubOptionContainer>
              <Center>
                <MainButton
                  disabled={!dirty}
                  text={i18n.t('Next')}
                  onPress={handleSubmit}
                />
              </Center>
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default BabyForm;
