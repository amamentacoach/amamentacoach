import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect } from 'react';
import { View } from 'react-native';
import { hide } from 'react-native-bootsplash';
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
import type { MotherInfo } from 'services/user';

import {
  ExtraOptionsContainer,
  InnerCircle,
  OptionButton,
  OuterCircle,
  TextModal,
} from './styles';

type Baby = MotherInfo['babies'][number];

type BabyOption = Baby & {
  date?: Date;
  newLocation: string;
  isSelected?: boolean;
  doesntApplyReason: string;
};

const BabyLocationUpdate: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { motherInfo } = useAuth();
  const options: BabyOption[] = motherInfo.babies.map(baby => ({
    ...baby,
    isSelected: false,
    newLocation: '',
    date: undefined,
    doesntApplyReason: '',
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
        doesntApplyReason: Yup.string().when('newLocation', {
          is: i18n.t('BabyLocationUpdate.Options.Other'),
          then: Yup.string().required(i18n.t('Yup.Required')),
          otherwise: Yup.string(),
        }),
      }),
    )
    .required();

  // TODO Remove
  useEffect(() => {
    hide({ duration: 250 });
  }, []);

  async function handleFormSubmit(
    values: BabyOption[],
    { setSubmitting }: FormikHelpers<BabyOption[]>,
  ): Promise<void> {
    const selected = values.filter(value => value.isSelected);
    if (selected.length > 0) {
      setSubmitting(true);
      const updates = selected.map(
        async ({ id, newLocation, date, doesntApplyReason }) =>
          updateBabyLocation(id, newLocation, date!, doesntApplyReason),
      );
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
                          value={baby.date}
                          onChange={date =>
                            setFieldValue(`${index}.date`, date)
                          }
                        />
                      )}
                      {baby.newLocation ===
                        i18n.t('BabyLocationUpdate.Options.Other') && (
                        <FormTextInput
                          error={errors[index]?.doesntApplyReason}
                          label={i18n.t('Reason')}
                          value={baby.doesntApplyReason}
                          onChangeText={handleChange(
                            `${index}.doesntApplyReason`,
                          )}
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
