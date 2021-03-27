import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image } from 'react-native';

import { IFAQ, listQuestions } from '../../services/questions';

import {
  AddQuestionButton,
  Answer,
  FlatlistContainer,
  Line,
  QuestionContainer,
  LoadingIndicator,
  Question,
} from './styles';

import AddIcon from '../../../assets/images/icons/ic_add.png';

interface MessageEntryProps {
  question: string;
  answer: string;
  index: number;
}

const Questions: React.FC = () => {
  const navigation = useNavigation();

  const [questions, setQuestions] = useState<IFAQ[]>([]);
  const [loading, setLoading] = useState(true);

  // Adiciona um botão na parte superior direita da tela, permitindo registrar uma nova pergunta.
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddQuestionButton onPress={() => navigation.navigate('NewQuestion')}>
          <Image source={AddIcon} />
        </AddQuestionButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      const oldQuestions = await listQuestions();
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
          <LoadingIndicator size="large" color="#7d5cd7" animating={loading} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </FlatlistContainer>
  );
};

export default Questions;
