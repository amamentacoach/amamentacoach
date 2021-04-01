import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import MainButton from '../../../components/MainButton';
import SecondaryButton from '../../../components/SecondaryButton';
import Modal from '../../../components/Modal';

import {
  ScrollView,
  HeaderTitle,
  Card,
  InnerBorder,
  Footer,
  FirstButtonContainer,
  CardText,
} from './styles';

interface ISelectedIdsInfo {
  lastRunDate: Date;
  alreadySelectedIds: number[];
}

const ManageExpectations: React.FC = () => {
  const [currentExpectation, setCurrentExpectation] = useState<{
    id: number;
    old: string;
    new: string;
  }>({ id: -1, old: '', new: '' });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCorrectAnswerSelected, setIsCorrectAnswerSelected] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);

  const expectations = [
    {
      id: 1,
      old: 'Dormir como antes',
      new: 'Aproveitar cada oportunidade de cochilo',
    },
    {
      id: 2,
      old: 'Dar conta de tudo',
      new: 'Fazer o que estiver ao meu alcance, com amor',
    },
    {
      id: 3,
      old: 'Ter um bebê saudável, gorduxo e corado',
      new: 'Amar meu prematurinho como ele é',
    },
    {
      id: 4,
      old: 'Suprir todas as necessidades do meu bebê sozinha',
      new: 'Fazer a minha parte para ajudar o meu bebê',
    },
    {
      id: 5,
      old: 'Suprir todas as necessidades da minha família como fazia antes',
      new: 'Mobilizar pessoas que também possam ajudar a minha família',
    },
    {
      id: 6,
      old: 'Me fechar para me preservar',
      new:
        'Me abrir com pessoas de confiança para preservar minha saúde mental',
    },
  ];

  function selectRandomArrayElement(array: any[]) {
    const randomIndex = Math.round(Math.random() * (array.length - 1));
    return array[randomIndex];
  }

  useEffect(() => {
    async function loadAlreadySelectedIds() {
      const selectedIdsStorage = await AsyncStorage.getItem(
        '@AmamentaCoach:alreadySelectedExpectations',
      );

      // Caso seja a primeira vez escolhe uma expectativa aleatória.
      if (!selectedIdsStorage) {
        setCurrentExpectation(selectRandomArrayElement(expectations));
        return;
      }

      const selectedIdsInfo: ISelectedIdsInfo = JSON.parse(selectedIdsStorage);

      const lastRunDate = moment(selectedIdsInfo.lastRunDate);
      // Desativa caso já tenha sido utilizado uma vez no dia.
      if (lastRunDate.isSame(new Date(), 'day')) {
        setIsButtonDisabled(true);
        return;
      }

      const { alreadySelectedIds } = selectedIdsInfo;
      // Caso todas as expectativas já tenham sido escolhidas limpa o registro e escolhe uma opção
      // aleatória.
      if (alreadySelectedIds.length === expectations.length) {
        await AsyncStorage.removeItem(
          '@AmamentaCoach:alreadySelectedExpectations',
        );
        setCurrentExpectation(selectRandomArrayElement(expectations));
        return;
      }

      // Remove as expectativas já escolhidas anteriormente
      const availableExpectations = expectations.filter(
        ({ id }) => !alreadySelectedIds.includes(id),
      );

      if (availableExpectations) {
        setCurrentExpectation(selectRandomArrayElement(availableExpectations));
      }
    }

    loadAlreadySelectedIds();
  }, []);

  // Adiciona o id da expectativa atual ao AsyncStorage, para que não possa ser utilizada na próxima
  // execução.
  async function saveSelectedExpectation() {
    const selectedIdsStorage = await AsyncStorage.getItem(
      '@AmamentaCoach:alreadySelectedExpectations',
    );
    let alreadySelectedIds: number[] = [];
    if (selectedIdsStorage) {
      alreadySelectedIds = JSON.parse(selectedIdsStorage);
    }
    const newAlreadySelected = [...alreadySelectedIds, currentExpectation.id];

    await AsyncStorage.setItem(
      '@AmamentaCoach:alreadySelectedExpectations',
      JSON.stringify({
        lastRunDate: new Date(),
        alreadySelectedIds: newAlreadySelected,
      }),
    );

    setIsButtonDisabled(true);
    setIsSubmitModalVisible(true);
  }

  async function handleChangeExpectation() {
    setIsCorrectAnswerSelected(!isCorrectAnswerSelected);
    await saveSelectedExpectation();
  }

  return (
    <ScrollView>
      <Modal
        content="Parabéns por trocar essa expectativa improvável pela expectativa realista! Volte amanhã para trocar outras expectativas."
        visible={isSubmitModalVisible}
        options={[
          {
            text: 'Fechar',
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
      />
      <HeaderTitle>
        Trocar expectativas improváveis por expectativas realistas ajuda na
        resiliência!{'\n'}Clique em “Trocar”, se desejar ou precisar. Caso não
        queira, clique em “Manter expectativa”.
      </HeaderTitle>
      <Card>
        <InnerBorder correctAnswer={isCorrectAnswerSelected}>
          <CardText>
            {isCorrectAnswerSelected
              ? currentExpectation.new
              : currentExpectation.old}
          </CardText>
        </InnerBorder>
      </Card>
      <Footer>
        <FirstButtonContainer>
          <MainButton
            text="Trocar"
            disabled={isButtonDisabled}
            onPress={handleChangeExpectation}
          />
        </FirstButtonContainer>
        <SecondaryButton
          text="Manter expectativa"
          disabled={isButtonDisabled}
          onPress={saveSelectedExpectation}
        />
      </Footer>
    </ScrollView>
  );
};

export default ManageExpectations;
