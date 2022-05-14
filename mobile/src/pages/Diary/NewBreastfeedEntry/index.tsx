import { Action, AppScreen } from '@common/telemetria';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormPickerInput from 'components/FormPickerInput';
import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import PaddedScrollView from 'components/PaddedScrollView';
import { useAuth } from 'contexts/auth';
import { Flex, ErrorText } from 'lib/sharedStyles';
import { createBreastfeedEntry } from 'services/diaryRegistry';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootRouteProp, RootStackProps } from 'routes/app';

import {
  ErrorContainer,
  FirstOption,
  FormContent,
  Header,
  MultipleOptionContainer,
  OptionHeader,
  OptionText,
  SecondOption,
  SubmitButtonContainer,
} from './styles';

import CheckedBox from '@assets/images/icons/checkbox_checked.svg';
import UncheckedBox from '@assets/images/icons/checkbox_unchecked.svg';

interface FormValues {
  babyName: string;
  time?: Date;
  duration: string;
  breastLeft: string;
  breastRight: string;
}

const NewBreastfeedEntry: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { params } = useRoute<RootRouteProp<'NewBreastfeedEntry'>>();
  const { motherInfo } = useAuth();
  const [isSendingForm, setIsSendingForm] = useState(false);
  const formInitialValues: FormValues = {
    babyName: '',
    time: undefined,
    duration: '',
    breastLeft: '',
    breastRight: '',
  };
  const formSchema = Yup.object()
    .shape(
      {
        babyName: Yup.string().required(i18n.t('Yup.Required')),
        time: Yup.date().required(i18n.t('Yup.Required')),
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

    setIsSendingForm(true);
    const status = await createBreastfeedEntry(
      selectedBaby.id,
      breast,
      parseInt(duration, 10),
      time!,
    );

    if (status) {
      createTelemetryAction({
        action: Action.Pressed,
        context: {
          screen: AppScreen.NewBreastfeedEntry,
          target: 'Actions.Save',
        },
      });
      navigation.navigate('DiaryBreastfeed', { date: params?.date });
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
    <PaddedScrollView>
      <Formik
        initialValues={formInitialValues}
        validateOnChange={false}
        validationSchema={formSchema}
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
            <Header>{i18n.t('NewBreastfeedEntryPage.Header')}</Header>
            <FormContent>
              <FormPickerInput
                error={errors.babyName}
                options={motherInfo.babies.map(baby => baby.name.toString())}
                placeholder={i18n.t('SelectBaby')}
                onChange={handleChange('babyName')}
              />

              <FormDateInput
                error={errors.time}
                label={i18n.t('Time')}
                mode="time"
                placeholder={i18n.t(
                  'NewBreastfeedEntryPage.BreastfeedTimePlaceholder',
                )}
                onChange={date => setFieldValue('time', date)}
              />

              <FormTextInput
                error={errors.duration}
                keyboardType="number-pad"
                label={i18n.t('Duration')}
                placeholder={i18n.t('Placeholder.Duration')}
                value={values.duration}
                onChangeText={handleChange('duration')}
              />

              <OptionHeader>{i18n.t('Breast')}</OptionHeader>
              <MultipleOptionContainer>
                <FirstOption
                  activeOpacity={1}
                  onPress={() =>
                    setFieldValue('breastLeft', values.breastLeft ? '' : 'E')
                  }>
                  {values.breastLeft ? <CheckedBox /> : <UncheckedBox />}
                  <OptionText>{i18n.t('Left')}</OptionText>
                </FirstOption>

                <SecondOption
                  activeOpacity={1}
                  onPress={() =>
                    setFieldValue('breastRight', values.breastRight ? '' : 'D')
                  }>
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
                disabled={!dirty || isSendingForm}
                text={
                  isSendingForm
                    ? i18n.t('Status.Saving')
                    : i18n.t('Actions.Save')
                }
                onPress={handleSubmit}
              />
            </SubmitButtonContainer>
          </Flex>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default NewBreastfeedEntry;
