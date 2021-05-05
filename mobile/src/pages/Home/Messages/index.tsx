import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';

import { useIsFirstRun } from '../../../contexts/firstRun';
import { setMessagesPageOpened } from '../../../services/telemetry';
import { IMessage, listMessages } from '../../../services/messages';

import {
  AddMessageButton,
  Author,
  Content,
  FlatlistContainer,
  Line,
  MessageContainer,
  LoadingIndicator,
} from './styles';

import AddIcon from '../../../../assets/images/icons/ic_add.svg';

const Messages: React.FC = () => {
  const navigation = useNavigation();
  const { isFirstRun, setTemporaryNotFirstRun } = useIsFirstRun();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [noMoreMessages, setNoMoreMessages] = useState(false);

  // Adiciona um botão na parte superior direita da tela, permitindo registrar uma nova mensagem
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddMessageButton
          onPress={() => navigation.navigate('NewMessage')}
          activeOpacity={0.7}>
          <AddIcon />
        </AddMessageButton>
      ),
    });
  }, [navigation]);

  async function fetchMessages(currentPage: number) {
    setLoading(true);
    const newMessages = await listMessages(currentPage);
    if (newMessages) {
      if (newMessages.length === 0) {
        setNoMoreMessages(true);
      }
      setMessages([...messages, ...newMessages]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMessages(1);
    if (isFirstRun.temporary.diary) {
      setMessagesPageOpened();
      setTemporaryNotFirstRun('diary');
    }
  }, []);

  async function fetchOlderMessages() {
    if (loading || noMoreMessages) {
      return;
    }
    await fetchMessages(page + 1);
    setPage(page + 1);
  }

  const Message: React.FC<IMessage> = ({ name, content }) => (
    <MessageContainer>
      <Author>{name}</Author>
      <Content>{content}</Content>
      <Line />
    </MessageContainer>
  );

  return (
    <FlatlistContainer>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message {...item} />}
        keyExtractor={item => item.id}
        onEndReached={fetchOlderMessages}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <LoadingIndicator size="large" color="#7d5cd7" animating={loading} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </FlatlistContainer>
  );
};

export default Messages;
