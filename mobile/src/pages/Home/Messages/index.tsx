import { Action, AppScreen } from '@common/telemetria';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';

import theme from 'config/theme';
import { formatWithLocale } from 'lib/date-fns';
import { Flex, Line } from 'lib/sharedStyles';
import { listMessages } from 'services/messages';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';
import type { Message as IMessage } from 'services/messages';

import {
  AddMessageButton,
  Author,
  DateText,
  Content,
  FlatlistContainer,
  LoadingIndicator,
} from './styles';

import AddIcon from '@assets/images/icons/ic_add.svg';

const Messages: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
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
          activeOpacity={0.7}
          onPress={() => navigation.navigate('NewMessage')}>
          <AddIcon />
        </AddMessageButton>
      ),
    });
  }, [navigation]);

  async function fetchMessages(currentPage: number): Promise<IMessage[]> {
    const newMessages = await listMessages(currentPage);
    if (!newMessages) {
      return [];
    }
    if (newMessages.length === 0) {
      setNoMoreMessages(true);
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

  const Message: React.FC<IMessage> = ({ name, content, date }) => (
    <Flex>
      <Author>{name}</Author>
      <DateText>{formatWithLocale(new Date(date), 'P')}</DateText>
      <Content>{content}</Content>
      <Line />
    </Flex>
  );

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
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Message {...item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchOlderMessages}
        onEndReachedThreshold={0.1}
      />
    </FlatlistContainer>
  );
};

export default Messages;
