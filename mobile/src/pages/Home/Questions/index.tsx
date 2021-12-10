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
          onPress={() => navigation.navigate('NewQuestion')}
          activeOpacity={0.7}>
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
        data={questions}
        renderItem={({ item, index }) => (
          <Entry question={item.question} answer={item.answer} index={index} />
        )}
        keyExtractor={item => item.question}
        ListFooterComponent={() => (
          <LoadingIndicator
            size="large"
            color={theme.primary}
            animating={loading}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </FlatlistContainer>
  );
};

export default Questions;
