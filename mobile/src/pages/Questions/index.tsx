import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image } from 'react-native';

import { IFAQ, listQuestions } from '../../services/questions';

import {
  AddMessageButton,
  Author,
  Content,
  FlatlistContainer,
  Line,
  MessageContainer,
  LoadingIndicator,
} from './styles';

import AddIcon from '../../../assets/images/icons/ic_add.png';

const Questions: React.FC = () => {
  const navigation = useNavigation();

  const [questions, setQuestions] = useState<IFAQ[]>([]);
  const [loading, setLoading] = useState(true);

  // Adiciona um botão na parte superior direita da tela, permitindo registrar uma nova pergunta.
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddMessageButton onPress={() => navigation.navigate('NewQuestion')}>
          <Image source={AddIcon} />
        </AddMessageButton>
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

  const InfoPage: React.FC<IFAQ> = ({ description, answer }) => {
    return (
      <MessageContainer>
        <Author>{description}</Author>
        <Content>{answer}</Content>
        <Line />
      </MessageContainer>
    );
  };

  return (
    <FlatlistContainer>
      <FlatList
        data={questions}
        renderItem={({ item }) => (
          <InfoPage
            id={item.id}
            description={item.description}
            answer={item.answer}
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={() => (
          <LoadingIndicator size="large" color="#7d5cd7" animating={loading} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </FlatlistContainer>
  );
};

export default Questions;
