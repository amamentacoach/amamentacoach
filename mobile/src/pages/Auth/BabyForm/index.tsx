import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useRef } from 'react';
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

import {
  ExternalFormContainer,
  HeaderSubText,
  HeaderText,
  QuestionContainer,
} from './styles';

const BabyForm: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { userInfo } = useRoute<AuthRouteProp<'BabyForm'>>().params;
  const wasExternalFormOpened = useRef(false);

  const formInitialValues: BabySignUpInfo[] = [
    ...Array(userInfo.currentGestationCount),
  ].map(_ => ({
    birthLocation: '',
    birthInstitution: '',
    currentLocation: '',
    name: '',
  }));

  // Verifica se um bebê nasceu em uma instituição que não faz parte do estudo.
  function checkBabyBirthInstitution(
    birthInstitution: string | undefined,
  ): boolean {
    return (
      birthInstitution !== undefined &&
      birthInstitution !== '' &&
      birthInstitution !== i18n.t('BabyFormPage.Institution.Options.1') &&
      birthInstitution !== i18n.t('BabyFormPage.Institution.Options.2')
    );
  }

  const babyFormSchema = Yup.array()
    .of(
      Yup.object().shape({
        birthLocation: Yup.string().required(i18n.t('Yup.Required')),
        birthInstitution: Yup.string()
          // Caso o bebê tenha nascido em uma instituição que não faz parte do estudo é necessário
          // abrir o formulário externo.
          .test(
            'user-opened-form',
            // TODO Tradução
            'O formulário externo precisa ser respondido',
            (value, _) =>
              checkBabyBirthInstitution(value)
                ? wasExternalFormOpened.current
                : true,
          )
          .required(i18n.t('Yup.Required')),
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

  function handleFormSubmit(values: BabySignUpInfo[]): void {
    userInfo.babies = values;
    navigation.navigate('AcceptTermsOfService', { userInfo });
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
                <QuestionContainer>
                  <FormTextInput
                    error={getBabyError(errors, index, 'name')}
                    label={i18n.t('BabyFormPage.Name')}
                    placeholder={i18n.t('Name')}
                    value={values[index].name}
                    onChangeText={handleChange(`${index}.name`)}
                  />
                </QuestionContainer>

                <QuestionContainer>
                  <FormRadioGroupInput
                    error={getBabyError(errors, index, 'birthInstitution')}
                    label={i18n.t('BabyFormPage.Institution.Description')}
                    options={[
                      i18n.t('BabyFormPage.Institution.Options.1'),
                      i18n.t('BabyFormPage.Institution.Options.2'),
                    ]}
                    displayOtherField
                    onChange={fieldValues =>
                      setFieldValue(`${index}.birthInstitution`, fieldValues[0])
                    }
                  />
                </QuestionContainer>

                {checkBabyBirthInstitution(values[index].birthInstitution) && (
                  <ExternalFormContainer>
                    <OpenSansRegular>
                      {i18n.t('BabyFormPage.ExternalForm.Message')}
                    </OpenSansRegular>
                    {/* TODO Adicionar link */}
                    <OpenSansBold
                      onPress={() => {
                        wasExternalFormOpened.current = true;
                        Linking.openURL('TODO');
                      }}>
                      {i18n.t('BabyFormPage.ExternalForm.LinkWarning')}
                    </OpenSansBold>
                  </ExternalFormContainer>
                )}

                <QuestionContainer>
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
                </QuestionContainer>

                <QuestionContainer>
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
                </QuestionContainer>
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
