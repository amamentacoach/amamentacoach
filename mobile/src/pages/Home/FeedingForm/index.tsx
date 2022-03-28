import { Action, AppScreen } from '@common/telemetria';
import { useRoute } from '@react-navigation/native';
import i18n from 'i18n-js';
import React, { useEffect, useState } from 'react';

import Modal from 'components/Modal';
import theme from 'config/theme';
import { ScrollView } from 'lib/sharedStyles';
import { StatusFormSituation } from 'services/survey';
import { getBestLocale } from 'utils/localize';
import { createTelemetryAction } from 'utils/telemetryAction';

import {
  ContentContainer,
  HeaderBackground,
  HeaderText,
} from '../StatusForm/StatusFormPage/styles';

import type { RootRouteProp } from 'routes/app';

import EnglishStatusForm from './EnglishForm';
import PortugueseStatusForm from './PortugueseForm';

export interface GenericFeedingFormProps {
  situation: StatusFormSituation;
  setIsErrorModalVisible: (isVisible: boolean) => void;
}

const FeedingForm: React.FC = () => {
  const { situation } = useRoute<RootRouteProp<'FeedingForm'>>().params;
  const { languageTag } = getBestLocale();
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.FeedingForm },
    });
  }, []);

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
        <HeaderBackground />
        <HeaderText>{i18n.t('StatusFormPage.Header')}</HeaderText>
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
