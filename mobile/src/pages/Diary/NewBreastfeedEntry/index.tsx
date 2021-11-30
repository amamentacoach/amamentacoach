import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormPickerInput from 'components/FormPickerInput';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import { useAuth } from 'contexts/auth';
import { createBreastfeedEntry } from 'services/diaryRegistry';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import {
  ErrorContainer,
  ErrorText,
  FirstOption,
  FormContainer,
  FormContent,
  Header,
  MultipleOptionContainer,
  OptionHeader,
  OptionText,
  ScrollView,
  SecondOption,
  SubmitButtonContainer,
} from './styles';

import CheckedBox from '@assets/images/icons/checkbox_checked.svg';
import UncheckedBox from '@assets/images/icons/checkbox_unchecked.svg';

interface FormValues {
  babyName: string;
  time: string;
  duration: string;
  breastLeft: string;
  breastRight: string;
}

const NewBreastfeedEntry: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { motherInfo } = useAuth();
  const [isSendingForm, setIsSendingForm] = useState(false);

  const formInitialValues = {
    babyName: '',
    time: '',
    duration: '',
    breastLeft: '',
    breastRight: '',
  };
  const newDiaryRegistrySchema = Yup.object()
    .shape(
      {
        babyName: Yup.string().required(i18n.t('Yup.Required')),
        time: Yup.string().required(i18n.t('Yup.Required')),
        duration: Yup.number()
          .integer(i18n.t('Yup.MustBeIntegerError'))
          .typeError(i18n.t('Yup.MustBeIntegerError'))
          .positive(i18n.t('Yup.MinError', { num: 0 }))
          .required(i18n.t('Yup.Required')),
        breastLeft: Yup.string().when('breastRight', {
          is: undefined,
          then: Yup.string().required(i18n.t('Yup.NoOptionSelectedError')),
          otherwise: Yup.string(),
        }),
        breastRight: Yup.string().when('breastLeft', {
          is: undefined,
          then: Yup.string().required(i18n.t('Yup.NoOptionSelectedError')),
          otherwise: Yup.string(),
        }),
      },
      [['breastLeft', 'breastRight']],
    )
    .required();

  // Cria um novo registro no sistema.
  async function handleFormSubmit({
    babyName,
    breastRight,
    breastLeft,
    duration,
    time,
  }: FormValues): Promise<void> {
    const selectedBaby = motherInfo.babies.find(baby => baby.name === babyName);
    if (!selectedBaby) {
      return;
    }
    let breast = breastRight;
    if (breastLeft && breastRight) {
      breast += ',';
    }
    if (breastLeft) {
      breast += breastLeft;
    }

    const [minutes, seconds] = time
      .split(':')
      .map(value => parseInt(value, 10));
    const now = new Date();
    now.setHours(minutes, seconds);

    setIsSendingForm(true);
    const status = await createBreastfeedEntry(
      selectedBaby.id,
      breast,
      parseInt(duration, 10),
      now,
    );

    if (status) {
      await createTelemetryAction({
        action: Action.Pressed,
        context: {
          screen: AppScreen.NewBreastfeedEntry,
          target: 'Actions.Save',
        },
      });
      navigation.navigate('DiaryBreastfeed');
    } else {
      setIsSendingForm(false);
    }
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.NewBreastfeedEntry },
    });
  }, []);

  return (
    <ScrollView>
      <Formik
        initialValues={formInitialValues}
        validationSchema={newDiaryRegistrySchema}
        validateOnChange={false}
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
            <Header>{i18n.t('NewBreastfeedEntryPage.Header')}</Header>
            <FormContent>
              <FormPickerInput
                fieldName="babyName"
                options={motherInfo.babies.map(baby => baby.name.toString())}
                placeholder={i18n.t('NewBreastfeedEntryPage.BabyPlaceholder')}
                onChange={setFieldValue}
                error={errors.babyName}
              />

              <FormDateInput
                label={i18n.t('Time')}
                fieldName="time"
                placeholder={i18n.t(
                  'NewBreastfeedEntryPage.BreastfeedTimePlaceholder',
                )}
                mode="time"
                onChange={setFieldValue}
                error={errors.time}
              />

              <FormTextInput
                label={i18n.t('Duration')}
                value={values.duration}
                placeholder={i18n.t('Placeholder.Duration')}
                keyboardType="number-pad"
                onChangeText={handleChange('duration')}
                error={errors.duration}
              />

              <OptionHeader>{i18n.t('Breast')}</OptionHeader>
              <MultipleOptionContainer>
                <FirstOption
                  activeOpacity={1}
                  onPress={() => {
                    if (values.breastLeft) {
                      setFieldValue('breastLeft', '');
                    } else {
                      setFieldValue('breastLeft', 'E');
                    }
                  }}>
                  {values.breastLeft ? <CheckedBox /> : <UncheckedBox />}
                  <OptionText>{i18n.t('Left')}</OptionText>
                </FirstOption>
                <SecondOption
                  activeOpacity={1}
                  onPress={() => {
                    if (values.breastRight) {
                      setFieldValue('breastRight', '');
                    } else {
                      setFieldValue('breastRight', 'D');
                    }
                  }}>
                  {values.breastRight ? <CheckedBox /> : <UncheckedBox />}
                  <OptionText>{i18n.t('Right')}</OptionText>
                </SecondOption>
              </MultipleOptionContainer>
              <ErrorContainer>
                {(errors.breastLeft || errors.breastRight) && (
                  <ErrorText>
                    {errors.breastLeft ? errors.breastLeft : errors.breastRight}
                  </ErrorText>
                )}
              </ErrorContainer>
            </FormContent>

            <SubmitButtonContainer>
              <MainButton
                onPress={handleSubmit}
                disabled={!dirty || isSendingForm}
                text={
                  isSendingForm
                    ? i18n.t('Status.Saving')
                    : i18n.t('Actions.Save')
                }
              />
            </SubmitButtonContainer>
          </FormContainer>
        )}
      </Formik>
    </ScrollView>
  );
};

export default NewBreastfeedEntry;
