import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { ActivityIndicator } from 'react-native';
import {
  IExtractionEntry,
  listExtractionsEntries,
} from '../../../services/diaryRegistry';
import dateFormatVerbose from '../../../utils/date';
import MainButton from '../../../components/MainButton';

import {
  DateText,
  Container,
  Registry,
  Row,
  Text,
  TextContainer,
  Content,
  ListContainer,
} from './styles';

interface RegistryEntryProps {
  date: string;
  breast: 'E' | 'D';
  duration: number;
  quantity: number;
}

const DiaryRegistry: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const currentDate = moment();
  const [registries, setRegistries] = useState<IExtractionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistries() {
      setIsLoading(true);
      const oldRegistries = await listExtractionsEntries();
      setRegistries(oldRegistries);
      setIsLoading(false);
    }
    if (isFocused) {
      fetchRegistries();
    }
  }, [isFocused]);

  function RegistryEntry({
    breast,
    date,
    duration,
    quantity,
  }: RegistryEntryProps) {
    return (
      <Registry>
        <Row>
          <TextContainer>
            <Text>Horário: </Text>
            <Content>{moment(date).format('kk:mm')}</Content>
          </TextContainer>
          <TextContainer>
            <Text>Duração: </Text>
            <Content>{duration} min</Content>
          </TextContainer>
        </Row>
        <Row>
          <TextContainer>
            <Text>Mama: </Text>
            <Content>{breast === 'E' ? 'Esquerda' : 'Direita'}</Content>
          </TextContainer>
          <TextContainer>
            <Text>Quantidade: </Text>
            <Content>{quantity} ml</Content>
          </TextContainer>
        </Row>
      </Registry>
    );
  }

  return (
    <Container>
      <DateText>{dateFormatVerbose(currentDate)}</DateText>
      <ListContainer>
        {!isLoading ? (
          registries.map(({ id, breast, date, duration, quantity }) => (
            <RegistryEntry
              key={id}
              breast={breast}
              date={date}
              duration={duration}
              quantity={quantity}
            />
          ))
        ) : (
          <ActivityIndicator
            size="large"
            color="#7d5cd7"
            animating={isLoading}
          />
        )}
      </ListContainer>
      <MainButton
        text="Registrar retirada"
        onPress={() => navigation.navigate('NewDiaryRegistry')}
      />
    </Container>
  );
};

export default DiaryRegistry;
