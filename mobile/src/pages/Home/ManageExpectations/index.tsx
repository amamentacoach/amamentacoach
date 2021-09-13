import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';

import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import SecondaryButton from 'components/SecondaryButton';
import { isToday } from 'lib/date-fns';

import {
  Card,
  CardText,
  FirstButtonContainer,
  Footer,
  HeaderTitle,
  InnerBorder,
  ScrollView,
} from './styles';

interface Expectation {
  old: string;
  new: string;
}

interface History {
  correctSelected: boolean;
  expectation: Expectation;
}

interface SelectedInfo {
  lastRunDate: Date;
  alreadySelected: History[];
}

const ManageExpectations: React.FC = () => {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
  const [currentHistory, setCurrentHistory] = useState<History>({
    correctSelected: false,
    expectation: {
      old: '',
      new: '',
    },
  });

  const expectations: Expectation[] = [
    {
      old: i18n.t('ManageExpectationsPage.OldExpectation1'),
      new: i18n.t('ManageExpectationsPage.NewExpectation1'),
    },
    {
      old: i18n.t('ManageExpectationsPage.OldExpectation2'),
      new: i18n.t('ManageExpectationsPage.NewExpectation2'),
    },
    {
      old: i18n.t('ManageExpectationsPage.OldExpectation3'),
      new: i18n.t('ManageExpectationsPage.NewExpectation3'),
    },
    {
      old: i18n.t('ManageExpectationsPage.OldExpectation4'),
      new: i18n.t('ManageExpectationsPage.NewExpectation4'),
    },
    {
      old: i18n.t('ManageExpectationsPage.OldExpectation5'),
      new: i18n.t('ManageExpectationsPage.NewExpectation5'),
    },
    {
      old: i18n.t('ManageExpectationsPage.OldExpectation6'),
      new: i18n.t('ManageExpectationsPage.NewExpectation6'),
    },
  ];

  function selectRandomArrayElement<T>(array: T[]): T {
    const randomIndex = Math.round(Math.random() * (array.length - 1));
    return array[randomIndex];
  }

  // Adiciona o id da expectativa atual ao AsyncStorage, para que não possa ser utilizada na próxima
  // execução.
  async function updateExpectationsStorage(history?: History) {
    const selectedStorage = await AsyncStorage.getItem(
      '@AmamentaCoach:alreadySelectedExpectations',
    );
    let alreadySelected: History[] = [];
    if (selectedStorage) {
      alreadySelected = JSON.parse(selectedStorage).alreadySelected;
    }

    let selectedExpectations = [...alreadySelected];
    if (history) {
      selectedExpectations = [...alreadySelected, history];
    }

    await AsyncStorage.setItem(
      '@AmamentaCoach:alreadySelectedExpectations',
      JSON.stringify({
        lastRunDate: new Date(),
        alreadySelected: selectedExpectations,
      }),
    );
  }

  // Marca que a alternativa atual foi selecionada e não deve ser exibida na próxima execução.
  async function handleExpectationSelected(isCorrect: boolean) {
    const newHistoryEntry: History = {
      correctSelected: isCorrect,
      expectation: {
        old: currentHistory.expectation.old,
        new: currentHistory.expectation.new,
      },
    };
    await updateExpectationsStorage(newHistoryEntry);
    setCurrentHistory(newHistoryEntry);
    setIsSubmitButtonDisabled(true);
  }

  // Marca que uma expectativa correta foi selecionada.
  async function handleCorrectExpectationSelected() {
    await handleExpectationSelected(true);
    setIsSubmitModalVisible(true);
  }

  useEffect(() => {
    async function loadAlreadySelected() {
      const selectedStorage = await AsyncStorage.getItem(
        '@AmamentaCoach:alreadySelectedExpectations',
      );

      // Caso seja a primeira vez escolhe uma expectativa aleatória.
      if (!selectedStorage) {
        setCurrentHistory({
          expectation: selectRandomArrayElement(expectations),
          correctSelected: false,
        });
        return;
      }

      const { lastRunDate, alreadySelected }: SelectedInfo =
        JSON.parse(selectedStorage);

      // Desativa caso já tenha sido utilizado uma vez no dia e exibe a opção selecionada
      // anteriormente.
      if (alreadySelected.length > 0 && isToday(new Date(lastRunDate))) {
        const lastSelectedExpectation =
          alreadySelected[alreadySelected.length - 1];

        setCurrentHistory({
          correctSelected: lastSelectedExpectation.correctSelected,
          expectation: {
            old: lastSelectedExpectation.expectation.old,
            new: lastSelectedExpectation.expectation.new,
          },
        });
        setIsSubmitButtonDisabled(true);
        return;
      }

      // Caso todas as expectativas já tenham sido escolhidas limpa o registro e escolhe uma opção
      // aleatória.
      if (alreadySelected.length === expectations.length) {
        await AsyncStorage.removeItem(
          '@AmamentaCoach:alreadySelectedExpectations',
        );
        setCurrentHistory({
          expectation: selectRandomArrayElement(expectations),
          correctSelected: false,
        });
        return;
      }

      // Remove as expectativas já escolhidas anteriormente
      const availableExpectations = expectations.filter(
        expectation =>
          !alreadySelected
            .map(history => history.expectation)
            .includes(expectation),
      );
      if (availableExpectations) {
        setCurrentHistory({
          expectation: selectRandomArrayElement(availableExpectations),
          correctSelected: false,
        });
      }
    }

    loadAlreadySelected();
    updateExpectationsStorage();
  }, []);

  return (
    <ScrollView>
      <Modal
        content={i18n.t('ManageExpectationsPage.PopUp')}
        visible={isSubmitModalVisible}
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
      />
      <HeaderTitle>{i18n.t('ManageExpectationsPage.Header')}</HeaderTitle>
      <Card>
        <InnerBorder correctAnswer={currentHistory.correctSelected}>
          <CardText>
            {currentHistory.correctSelected
              ? currentHistory.expectation.new
              : currentHistory.expectation.old}
          </CardText>
        </InnerBorder>
      </Card>
      <Footer>
        <FirstButtonContainer>
          <MainButton
            text={i18n.t('ManageExpectationsPage.Switch')}
            disabled={isSubmitButtonDisabled}
            onPress={handleCorrectExpectationSelected}
          />
        </FirstButtonContainer>
        <SecondaryButton
          text={i18n.t('ManageExpectationsPage.Keep')}
          disabled={isSubmitButtonDisabled}
          onPress={() => handleExpectationSelected(false)}
        />
      </Footer>
    </ScrollView>
  );
};

export default ManageExpectations;
