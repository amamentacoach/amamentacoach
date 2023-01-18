import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { View } from 'react-native';
import * as Yup from 'yup';

import FormDateInput from 'components/FormDateInput';
import FormPickerInput from 'components/FormPickerInput';
import FormTextInput from 'components/FormTextInput';
import { Button } from 'components/MainButton/styles';
import PaddedScrollView from 'components/PaddedScrollView';
import { useAuth } from 'contexts/auth';
import { Footer, OpenSansRegular } from 'lib/sharedStyles';
import { updateBabyLocation } from 'services/babyLocation';

import type { FormikHelpers } from 'formik';
import type { RootStackProps } from 'routes/app';
import type { BabyLocationUpdate as IBabyLocationUpdate } from 'services/babyLocation';
import type { UserInfo } from 'services/user';

import {
  ExtraOptionsContainer,
  InnerCircle,
  OptionButton,
  OuterCircle,
  TextModal,
} from './styles';

type Baby = UserInfo['babies'][number];

type BabyOption = Baby &
  IBabyLocationUpdate & {
    isSelected?: boolean;
  };

const BabyLocationUpdate: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { userInfo } = useAuth();
  const options: BabyOption[] = userInfo.babies.map(baby => ({
    ...baby,
    isSelected: false,
    newLocation: '',
    date: undefined,
    reason: '',
  }));

  const formValidationSchema = Yup.array()
    .of(
      Yup.object().shape({
        isSelected: Yup.boolean(),
        newLocation: Yup.string().when('isSelected', {
          is: true,
          then: Yup.string().required(i18n.t('Yup.Required')),
          otherwise: Yup.string(),
        }),
        date: Yup.date().when('newLocation', {
          is: i18n.t('BabyLocationUpdate.Options.Home'),
          then: Yup.date().required(i18n.t('Yup.Required')),
          otherwise: Yup.date(),
        }),
        reason: Yup.string().when('newLocation', {
          is: i18n.t('BabyLocationUpdate.Options.Other'),
          then: Yup.string().required(i18n.t('Yup.Required')),
          otherwise: Yup.string(),
        }),
      }),
    )
    .required();

  async function handleFormSubmit(
    options: BabyOption[],
    { setSubmitting }: FormikHelpers<BabyOption[]>,
  ): Promise<void> {
    const selected = options.filter(option => option.isSelected);
    if (selected.length > 0) {
      setSubmitting(true);
      const updates = selected.map(baby => updateBabyLocation(baby));
      await Promise.all(updates);
      setSubmitting(false);
    }
    navigation.navigate('StatusForm', {
      situation: 'ALTA',
    });
  }

  return (
    <PaddedScrollView>
      <TextModal>{i18n.t('BabyLocationUpdate.BabyStatusPopUp')}</TextModal>
      <Formik
        initialValues={options}
        validateOnChange={false}
        validationSchema={formValidationSchema}
        onSubmit={handleFormSubmit}>
        {({ handleChange, handleSubmit, setFieldValue, errors, values }) => (
          <>
            {values.map((baby, index) => (
              <View key={baby.id}>
                <OptionButton
                  activeOpacity={0.7}
                  onPress={() =>
                    setFieldValue(`${index}.isSelected`, !baby.isSelected)
                  }>
                  <OuterCircle isSelected={!!baby.isSelected}>
                    <InnerCircle isSelected={!!baby.isSelected} />
                  </OuterCircle>
                  <TextModal key={baby.id}>{baby.name}</TextModal>
                </OptionButton>

                {baby.isSelected && (
                  <ExtraOptionsContainer>
                    <FormPickerInput
                      error={errors[index]?.newLocation}
                      options={[
                        i18n.t('Lodging'),
                        i18n.t('UCI'),
                        i18n.t('UCIN Kangaroo'),
                        i18n.t('UTI'),
                        i18n.t('BabyLocationUpdate.Options.Home'),
                        i18n.t('BabyLocationUpdate.Options.Other'),
                      ]}
                      placeholder={i18n.t('BabyLocationUpdate.BabyLocation')}
                      value={baby.newLocation}
                      onChange={handleChange(`${index}.newLocation`)}
                    />
                    <View>
                      {baby.newLocation ===
                        i18n.t('BabyLocationUpdate.Options.Home') && (
                        <FormDateInput
                          error={errors[index]?.date}
                          label={i18n.t('BabyLocationUpdate.DischargeDate')}
                          maxDate={new Date()}
                          value={baby.date}
                          onChange={date =>
                            setFieldValue(`${index}.date`, date)
                          }
                        />
                      )}
                      {baby.newLocation ===
                        i18n.t('BabyLocationUpdate.Options.Other') && (
                        <FormTextInput
                          error={errors[index]?.reason}
                          label={i18n.t('Reason')}
                          value={baby.reason}
                          onChangeText={handleChange(`${index}.reason`)}
                        />
                      )}
                    </View>
                  </ExtraOptionsContainer>
                )}
              </View>
            ))}
            <Footer>
              <Button onPress={handleSubmit}>
                <OpenSansRegular color="white">
                  {values.some(value => value.isSelected)
                    ? i18n.t('Actions.Submit')
                    : i18n.t('No')}
                </OpenSansRegular>
              </Button>
            </Footer>
          </>
        )}
      </Formik>
    </PaddedScrollView>
  );
};

export default BabyLocationUpdate;
