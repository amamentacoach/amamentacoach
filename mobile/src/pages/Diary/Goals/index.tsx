import { Action, AppScreen } from '@common/telemetria';
import { StackActions, useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';

import createGenericSurveyPage from 'components/GenericSurveyPage';
import Modal from 'components/Modal';
import Survey from 'components/Survey';
import theme from 'config/theme';
import { getBestLocale } from 'utils/localize';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import { ModalContainer } from './styles';

import ENMotivation1 from '@assets/images/motivation_1_en.webp';
import PTMotivation1 from '@assets/images/motivation_1_pt.webp';
import ENMotivation2 from '@assets/images/motivation_2_en.webp';
import PTMotivation2 from '@assets/images/motivation_2_pt.webp';
import ENMotivation3 from '@assets/images/motivation_3_en.webp';
import PTMotivation3 from '@assets/images/motivation_3_pt.webp';
import ENMotivation4 from '@assets/images/motivation_4_en.webp';
import PTMotivation4 from '@assets/images/motivation_4_pt.webp';
import ENMotivation5 from '@assets/images/motivation_5_en.webp';
import PTMotivation5 from '@assets/images/motivation_5_pt.webp';
import ENMotivation6 from '@assets/images/motivation_6_en.webp';
import ENMotivation7 from '@assets/images/motivation_7_en.webp';

const Goals: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const { languageTag } = getBestLocale();
  const [isIntroModalVisible, setIsIntroModalVisible] = useState(true);
  const [isFinishedModalVisible, setIsFinishedModalVisible] = useState(false);

  function onFormEnd(): void {
    createTelemetryAction({
      action: Action.Pressed,
      context: { screen: AppScreen.Goals, target: 'Actions.End' },
    });
    setIsFinishedModalVisible(true);
  }

  // Retorna uma imagem aleatória para ser exibida no modal.
  function getRandomMotivationImage(): typeof PTMotivation1 {
    const imagesPT = [
      PTMotivation1,
      PTMotivation2,
      PTMotivation3,
      PTMotivation4,
      PTMotivation5,
    ];
    const imagesEN = [
      ENMotivation1,
      ENMotivation2,
      ENMotivation3,
      ENMotivation4,
      ENMotivation5,
      ENMotivation6,
      ENMotivation7,
    ];
    const images = languageTag === 'pt' ? imagesPT : imagesEN;
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
        Page={createGenericSurveyPage(onFormEnd)}
        category={3}
        color={theme.babyPurple}
        title={i18n.t('GoalsPage.Title')}
      />
    </>
  );
};

export default Goals;
