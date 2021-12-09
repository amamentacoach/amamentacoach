import { Action, AppScreen } from '@common/telemetria';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components';

import { listMessages } from 'services/messages';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';
import type { Message as IMessage } from 'services/messages';

import {
  AddMessageButton,
  Author,
  Content,
  FlatlistContainer,
  Line,
  LoadingIndicator,
  MessageContainer,
} from './styles';

import AddIcon from '@assets/images/icons/ic_add.svg';

const Messages: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const themeContext = useContext(ThemeContext);
  const isFocused = useIsFocused();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [noMoreMessages, setNoMoreMessages] = useState(false);

  // Adiciona um botão na parte superior direita da tela, permitindo registrar uma nova mensagem
  useLayoutEffect(() => {
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

  async function fetchMessages(currentPage: number): Promise<IMessage[]> {
    const newMessages = await listMessages(currentPage);
    if (!newMessages) {
      setNoMoreMessages(true);
      return [];
    }
    return newMessages;
  }

  async function fetchOlderMessages(): Promise<void> {
    if (loading || noMoreMessages) {
      return;
    }
    setLoading(true);
    const newMessages = await fetchMessages(page + 1);
    setPage(page + 1);
    setMessages([...messages, ...newMessages]);
    setLoading(false);
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.Messages },
    });
  }, []);

  useEffect(() => {
    async function loadMessages(): Promise<void> {
      setLoading(true);
      const updatedMessages = await fetchMessages(1);
      setPage(1);
      setMessages(updatedMessages);
      setLoading(false);
    }

    if (isFocused) {
      loadMessages();
    }
  }, [isFocused]);

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

export default Messages;
