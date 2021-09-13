import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components';

import { listUserQuestions } from 'services/questions';

import type { RootStackProps } from 'routes/app';
import type { FAQ } from 'services/questions';

import {
  AddQuestionButton,
  Answer,
  FlatlistContainer,
  Line,
  LoadingIndicator,
  Question,
  QuestionContainer,
} from './styles';

import AddIcon from '@assets/images/icons/ic_add.svg';

interface MessageEntryProps {
  question: string;
  answer: string;
  index: number;
}

const Questions: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const themeContext = useContext(ThemeContext);

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
    async function fetchQuestions() {
      setLoading(true);
      const oldQuestions = await listUserQuestions();
      if (oldQuestions) {
        setQuestions(oldQuestions);
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const Entry: React.FC<MessageEntryProps> = ({ question, answer, index }) => {
    return (
      <QuestionContainer>
        <Question>{question}</Question>
        <Answer>{answer}</Answer>
        {index < questions.length - 1 && <Line />}
      </QuestionContainer>
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
            color={themeContext.primary}
            animating={loading}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </FlatlistContainer>
  );
};

export default Questions;
