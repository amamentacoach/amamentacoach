import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';
import Modal from '../../../components/Modal';

import { ModalContainer } from './styles';

const Goals: React.FC = () => {
  const navigation = useNavigation();

  const [isIntroModalVisible, setIsIntroModalVisible] = useState(true);
  const [isFinishedModalVisible, setIsFinishedModalVisible] = useState(false);
  const onFormEnd = () => setIsFinishedModalVisible(true);

  // Retorna uma imagem aleatória para ser exibida no modal.
  function getRandomMotivationImage() {
    const images = [
      require('../../../../assets/images/motivation-1.jpeg'),
      require('../../../../assets/images/motivation-2.jpeg'),
      require('../../../../assets/images/motivation-3.png'),
      require('../../../../assets/images/motivation-4.png'),
      require('../../../../assets/images/motivation-5.jpeg'),
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
          content="Suas metas foram traçadas!"
          options={[
            {
              text: 'Fechar',
              isBold: true,
              onPress: () => {
                setIsFinishedModalVisible(false);
                navigation.navigate('Diary');
              },
            },
          ]}
          visible={isFinishedModalVisible}
        />
      </ModalContainer>
      <DiaryForm
        title="Minhas metas de hoje"
        category={3}
        Page={createGenericDiaryFormPage(onFormEnd)}
      />
    </>
  );
};

export default Goals;
