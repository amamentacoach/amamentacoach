import React, { useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import MainButton from '../../../components/MainButton';
import Modal from '../../../components/Modal';
import {
  AdultTermsOfService,
  MinorTermsOfService,
} from '../../../components/TermsOfService';
import { differenceInYears } from '../../../lib/date-fns';
import {
  BabySignUpInfo,
  MotherSignUpInfo,
  signUpBaby,
  signUpMother,
} from '../../../services/auth';

import {
  FormContainer,
  HeaderSubText,
  HeaderText,
  ScrollView,
  SubmitButtonContainer,
} from './styles';

type ScreenParams = {
  AcceptTermsOfService: {
    motherInfo: MotherSignUpInfo;
    babiesInfo: BabySignUpInfo[];
  };
};

const AcceptTermsOfService: React.FC = () => {
  const navigation = useNavigation();
  const { motherInfo, babiesInfo } = useRoute<
    RouteProp<ScreenParams, 'AcceptTermsOfService'>
  >().params;

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
        content="Conta criada com sucesso! Seja muito bem-vinda ao AmamentaCoach!"
        options={[
          {
            text: 'Fechar',
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
        content={'Erro ao registrar.\nPor favor tente novamente mais tarde.'}
        options={[
          {
            text: 'Fechar',
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
        <HeaderText>Passo 4 de 4</HeaderText>
        <HeaderSubText>
          Você está quase lá! Por último, você deve aceitar o termo de
          compromisso:
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
                ? 'Enviando...'
                : 'Eu concordo com os Termos de Compromisso'
            }
          />
        </SubmitButtonContainer>
      </FormContainer>
    </ScrollView>
  );
};

export default AcceptTermsOfService;
