import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useState } from 'react';

import MainButton from '../../../components/MainButton';
import Modal from '../../../components/Modal';
import {
  AdultTermsOfService,
  MinorTermsOfService,
} from '../../../components/TermsOfService';
import { differenceInYears } from '../../../lib/date-fns';
import { signUpBaby, signUpMother } from '../../../services/auth';

import type { AuthRouteProp, AuthStackProps } from '../../../routes/auth';

import {
  FormContainer,
  HeaderSubText,
  HeaderText,
  ScrollView,
  SubmitButtonContainer,
} from './styles';

const AcceptTermsOfService: React.FC = () => {
  const navigation = useNavigation<AuthStackProps>();
  const { motherInfo, babiesInfo } =
    useRoute<AuthRouteProp<'AcceptTermsOfService'>>().params;

  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

  async function handleSubmit() {
    setIsSendingForm(true);

    const token = await signUpMother(motherInfo);
    if (token === null) {
      setIsErrorModalVisible(true);
      return;
    }

    babiesInfo.forEach(async baby => {
      await signUpBaby(token, baby);
    });

    setIsSignUpModalVisible(true);
  }

  return (
    <ScrollView>
      <Modal
        content={i18n.t('AcceptTermsOfServicePage.AccountCreated')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => {
              setIsSignUpModalVisible(false);
              navigation.navigate('Login');
            },
          },
        ]}
        visible={isSignUpModalVisible}
      />
      <Modal
        content={i18n.t('AcceptTermsOfServicePage.ErrorPopUp')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => {
              setIsErrorModalVisible(false);
              setIsSendingForm(false);
            },
          },
        ]}
        visible={isErrorModalVisible}
      />
      <FormContainer>
        <HeaderText>
          {i18n.t('Auth.SignUpStep', { current: '4', max: '4' })}
        </HeaderText>
        <HeaderSubText>
          {i18n.t('AcceptTermsOfServicePage.HeaderSubText')}
        </HeaderSubText>

        {differenceInYears(new Date(), new Date(motherInfo.birthday)) >= 18 ? (
          <AdultTermsOfService name={motherInfo.name} />
        ) : (
          <MinorTermsOfService name={motherInfo.name} />
        )}

        <SubmitButtonContainer>
          <MainButton
            onPress={handleSubmit}
            disabled={isSendingForm}
            text={
              isSendingForm
                ? i18n.t('Status.Sending')
                : i18n.t('AcceptTermsOfServicePage.Agree')
            }
          />
        </SubmitButtonContainer>
      </FormContainer>
    </ScrollView>
  );
};

export default AcceptTermsOfService;
