import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { Linking, View } from 'react-native';
import * as Yup from 'yup';

import FormRadioGroupInput from 'components/FormRadioGroup';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import PaddedScrollView from 'components/PaddedScrollView';
import SecondaryButton from 'components/SecondaryButton';
import {
  Flex,
  OpenSansBold,
  OpenSansRegular,
  Row,
  Spacer,
} from 'lib/sharedStyles';

import type { FormikErrors } from 'formik';
import type { AuthRouteProp, AuthStackProps } from 'routes/auth';
import type { BabySignUpInfo } from 'services/signUp';

import { ExternalFormContainer, HeaderSubText, HeaderText } from './styles';

const BabyForm: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { motherInfo } = useRoute<AuthRouteProp<'BabyForm'>>().params;

  const formInitialValues: BabySignUpInfo[] = [
    ...Array(motherInfo.currentGestationCount),
  ].map(_ => ({
    birthLocation: '',
    institution: '',
    currentLocation: '',
    name: '',
  }));

  const babyFormSchema = Yup.array()
    .of(
      Yup.object().shape({
        birthLocation: Yup.string().required(i18n.t('Yup.Required')),
        institution: Yup.string().required(i18n.t('Yup.Required')),
        currentLocation: Yup.string().required(i18n.t('Yup.Required')),
        name: Yup.string().required(i18n.t('Yup.Required')),
      }),
    )
    .required();

  function getBabyError(
    errors: FormikErrors<BabySignUpInfo[]>,
    index: number,
    field: string,
  ): string {
    if (errors && errors[index]) {
      return (errors[index] as { [key: string]: any })[field];
    }
    return '';
  }

  function handleFormSubmit(formValues: BabySignUpInfo[]): void {
    navigation.navigate('AcceptTermsOfService', {
      motherInfo,
      babiesInfo: formValues as unknown as BabySignUpInfo[],
    });
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
          <Flex>
            {values.map((_, index) => (
              <View key={index}>
                <FormTextInput
                  error={getBabyError(errors, index, 'name')}
                  label={i18n.t('BabyFormPage.Name')}
                  placeholder={i18n.t('Name')}
                  value={values[index].name}
                  onChangeText={handleChange(`${index}.name`)}
                />

                <FormRadioGroupInput
                  error={getBabyError(errors, index, 'institution')}
                  label={i18n.t('BabyFormPage.Institution.Description')}
                  options={[
                    i18n.t('BabyFormPage.Institution.Options.1'),
                    i18n.t('BabyFormPage.Institution.Options.2'),
                  ]}
                  displayOtherField
                  onChange={fieldValues =>
                    setFieldValue(`${index}.institution`, fieldValues[0])
                  }
                />

                {values[index].institution !== undefined &&
                  values[index].institution !== '' &&
                  values[index].institution !==
                    i18n.t('BabyFormPage.Institution.Options.1') &&
                  values[index].institution !==
                    i18n.t('BabyFormPage.Institution.Options.2') && (
                    <ExternalFormContainer>
                      <OpenSansRegular>
                        {i18n.t('BabyFormPage.ExternalForm.Message')}
                      </OpenSansRegular>
                      {/* TODO Adicionar link */}
                      <OpenSansBold onPress={() => Linking.openURL('TODO')}>
                        {i18n.t('BabyFormPage.ExternalForm.LinkWarning')}
                      </OpenSansBold>
                    </ExternalFormContainer>
                  )}

                <FormRadioGroupInput
                  error={getBabyError(errors, index, 'birthLocation')}
                  label={i18n.t('BabyFormPage.BirthPlace')}
                  options={[
                    i18n.t('Lodging'),
                    i18n.t('UCI'),
                    i18n.t('UCIN Kangaroo'),
                    i18n.t('UTI'),
                  ]}
                  onChange={fieldValues =>
                    setFieldValue(`${index}.birthLocation`, fieldValues[0])
                  }
                />

                <FormRadioGroupInput
                  error={getBabyError(errors, index, 'currentLocation')}
                  label={i18n.t('BabyFormPage.CurrentLocation.Description')}
                  options={[
                    i18n.t('Lodging'),
                    i18n.t('UCI'),
                    i18n.t('UCIN Kangaroo'),
                    i18n.t('UTI'),
                    i18n.t('BabyFormPage.CurrentLocation.Options.Home'),
                  ]}
                  onChange={fieldValues =>
                    setFieldValue(`${index}.currentLocation`, fieldValues[0])
                  }
                />
              </View>
            ))}

            <Row>
              <Flex>
                <SecondaryButton
                  text={i18n.t('GoBack')}
                  onPress={() => navigation.goBack()}
                />
              </Flex>
              <Spacer width={4} />
              <Flex>
                <MainButton
                  disabled={!dirty}
                  text={i18n.t('Next')}
                  onPress={handleSubmit}
                />
              </Flex>
            </Row>
          </Flex>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default BabyForm;
