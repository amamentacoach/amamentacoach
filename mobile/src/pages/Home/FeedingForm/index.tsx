import { Action, AppScreen } from '@common/telemetria';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from 'i18n-js';
import React, { useEffect, useState } from 'react';

import Modal from 'components/Modal';
import theme from 'config/theme';
import { ScrollView } from 'lib/sharedStyles';
import { StatusFormSituation } from 'services/survey';
import { getBestLocale } from 'utils/localize';
import { createTelemetryAction } from 'utils/telemetryAction';

import { ContentContainer } from '../StatusForm/StatusFormPage/styles';

import type { RootRouteProp, RootStackProps } from 'routes/app';

import EnglishStatusForm from './EnglishForm';
import PortugueseStatusForm from './PortugueseForm';

export interface GenericFeedingFormProps {
  situation: StatusFormSituation;
  setIsErrorModalVisible: (isVisible: boolean) => void;
}

const FeedingForm: React.FC = () => {
  const { situation } = useRoute<RootRouteProp<'FeedingForm'>>().params;
  const navigation = useNavigation<RootStackProps>();
  const { languageTag } = getBestLocale();
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.FeedingForm },
    });
  }, []);

  React.useEffect(() => {
    // Quando o usuário tenta retornar a tela anterior ele é levado a tela inicial.
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      navigation.navigate('Home');
    });
  }, [navigation]);

  return (
    <>
      <Modal
        color={theme.babyBlue}
        content={i18n.t('SurveyComponent.SubmitError')}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsErrorModalVisible(false),
          },
        ]}
        visible={isErrorModalVisible}
      />
      <ScrollView>
        <ContentContainer>
          {languageTag === 'pt' ? (
            <PortugueseStatusForm
              setIsErrorModalVisible={setIsErrorModalVisible}
              situation={situation}
            />
          ) : (
            <EnglishStatusForm
              setIsErrorModalVisible={setIsErrorModalVisible}
              situation={situation}
            />
          )}
        </ContentContainer>
      </ScrollView>
    </>
  );
};

export default FeedingForm;
