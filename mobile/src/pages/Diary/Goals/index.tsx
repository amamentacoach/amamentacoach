import React, { useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';

import theme from '../../../config/theme';
import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';
import Modal from '../../../components/Modal';

import { ModalContainer } from './styles';

import Motivation1 from '../../../../assets/images/motivation-1.png';
import Motivation2 from '../../../../assets/images/motivation-2.png';
import Motivation3 from '../../../../assets/images/motivation-3.png';
import Motivation4 from '../../../../assets/images/motivation-4.png';
import Motivation5 from '../../../../assets/images/motivation-5.png';

const Goals: React.FC = () => {
  const navigation = useNavigation();

  const [isIntroModalVisible, setIsIntroModalVisible] = useState(true);
  const [isFinishedModalVisible, setIsFinishedModalVisible] = useState(false);

  function onFormEnd() {
    setIsFinishedModalVisible(true);
  }

  // Retorna uma imagem aleatória para ser exibida no modal.
  function getRandomMotivationImage() {
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

  return (
    <>
      <ModalContainer
        modalVisible={isIntroModalVisible || isFinishedModalVisible}>
        <Modal
          image={getRandomMotivationImage()}
          options={[
            {
              text: 'Fechar',
              isBold: true,
              onPress: () => setIsIntroModalVisible(false),
            },
          ]}
          visible={isIntroModalVisible}
        />
        <Modal
          content={`Suas metas foram traçadas!\nGostaria de ver o seu desempenho?`}
          options={[
            {
              text: 'Mais Tarde',
              onPress: () => {
                setIsFinishedModalVisible(false);
                navigation.navigate('Diary');
              },
            },
            {
              text: 'Ver desempenho',
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
      <DiaryForm
        title="Minhas metas de hoje"
        color={theme.babyPurple}
        category={3}
        Page={createGenericDiaryFormPage(theme.babyPurple, onFormEnd)}
      />
    </>
  );
};

export default Goals;
