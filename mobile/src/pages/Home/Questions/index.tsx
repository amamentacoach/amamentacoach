import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';

import theme from 'config/theme';
import { Flex, Line } from 'lib/sharedStyles';
import { listUserQuestions } from 'services/questions';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';
import type { FAQ } from 'services/questions';

import {
  AddQuestionButton,
  Answer,
  FlatlistContainer,
  LoadingIndicator,
  Question,
} from './styles';

import AddIcon from '@assets/images/icons/ic_add.svg';

interface MessageEntryProps {
  question: string;
  answer: string;
  index: number;
}

const Questions: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  const [questions, setQuestions] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  // Adiciona um botão na parte superior direita da tela, permitindo registrar uma nova pergunta.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddQuestionButton
          activeOpacity={0.7}
          onPress={() => navigation.navigate('NewQuestion')}>
          <AddIcon />
        </AddQuestionButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchQuestions(): Promise<void> {
      setLoading(true);
      const oldQuestions = await listUserQuestions();
      if (oldQuestions) {
        setQuestions(oldQuestions);
        setLoading(false);
      }
    }

    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.Questions },
    });
    fetchQuestions();
  }, []);

  const Entry: React.FC<MessageEntryProps> = ({ question, answer, index }) => {
    return (
      <Flex>
        <Question>{question}</Question>
        <Answer>{answer}</Answer>
        {index < questions.length - 1 && <Line />}
      </Flex>
    );
  };

  return (
    <FlatlistContainer>
      <FlatList
        ListFooterComponent={() => (
          <LoadingIndicator
            animating={loading}
            color={theme.primary}
            size="large"
          />
        )}
        data={questions}
        keyExtractor={item => item.question}
        renderItem={({ item, index }) => (
          <Entry answer={item.answer} index={index} question={item.question} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </FlatlistContainer>
  );
};

export default Questions;
