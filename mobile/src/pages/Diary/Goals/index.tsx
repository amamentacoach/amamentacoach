import { Action, AppScreen } from '@common/Telemetria';
import { StackActions, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';

import createGenericSurveyPage from 'components/GenericSurveyPage';
import Modal from 'components/Modal';
import Survey from 'components/Survey';
import theme from 'config/theme';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import { ModalContainer } from './styles';

import Motivation1 from '@assets/images/motivation-1.png';
import Motivation2 from '@assets/images/motivation-2.png';
import Motivation3 from '@assets/images/motivation-3.png';
import Motivation4 from '@assets/images/motivation-4.png';
import Motivation5 from '@assets/images/motivation-5.png';

const Goals: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  const [isIntroModalVisible, setIsIntroModalVisible] = useState(true);
  const [isFinishedModalVisible, setIsFinishedModalVisible] = useState(false);

  async function onFormEnd(): Promise<void> {
    await createTelemetryAction({
      action: Action.Pressed,
      context: { screen: AppScreen.Goals, target: 'Actions.End' },
    });
    setIsFinishedModalVisible(true);
  }

  // Retorna uma imagem aleatória para ser exibida no modal.
  function getRandomMotivationImage(): typeof Motivation1 {
    const images = [
      Motivation1,
      Motivation2,
      Motivation3,
      Motivation4,
      Motivation5,
    ];
    const randomIndex = Math.round(Math.random() * (images.length - 1));
    return images[randomIndex];
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.Goals },
    });
  }, []);

  return (
    <>
      <ModalContainer
        modalVisible={isIntroModalVisible || isFinishedModalVisible}>
        <Modal
          image={getRandomMotivationImage()}
          options={[
            {
              text: i18n.t('Close'),
              isBold: true,
              onPress: () => setIsIntroModalVisible(false),
            },
          ]}
          visible={isIntroModalVisible}
        />
        <Modal
          content={i18n.t('GoalsPage.PopupContent')}
          options={[
            {
              text: i18n.t('Later'),
              onPress: () => {
                setIsFinishedModalVisible(false);
                navigation.navigate('Diary');
              },
            },
            {
              text: i18n.t('GoalsPage.OpenReport'),
              isBold: true,
              onPress: () => {
                setIsFinishedModalVisible(false);
                // Reinicia a stack de navegação.
                navigation.dispatch(StackActions.replace('Report'));
              },
            },
          ]}
          visible={isFinishedModalVisible}
        />
      </ModalContainer>
      <Survey
        title={i18n.t('GoalsPage.Title')}
        color={theme.babyPurple}
        category={3}
        Page={createGenericSurveyPage(onFormEnd)}
      />
    </>
  );
};

export default Goals;
