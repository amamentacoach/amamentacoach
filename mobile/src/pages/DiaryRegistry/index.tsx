import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { ActivityIndicator } from 'react-native';
import {
  IExtractionEntry,
  listExtractionsEntries,
} from '../../services/diaryRegistry';
import dateFormatVerbose from '../../utils/date';
import MainButton from '../../components/MainButton';

import {
  DateText,
  Container,
  Registry,
  RegistryRow,
  RegistryText,
  RegistryTextContainer,
  RegistryContent,
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

  function RegistryItem({
    breast,
    date,
    duration,
    quantity,
  }: RegistryEntryProps) {
    return (
      <Registry>
        <RegistryRow>
          <RegistryTextContainer>
            <RegistryText>Horário: </RegistryText>
            <RegistryContent>{moment(date).format('kk:mm')}</RegistryContent>
          </RegistryTextContainer>
          <RegistryTextContainer>
            <RegistryText>Duração: </RegistryText>
            <RegistryContent>{duration} min</RegistryContent>
          </RegistryTextContainer>
        </RegistryRow>
        <RegistryRow>
          <RegistryTextContainer>
            <RegistryText>Mama: </RegistryText>
            <RegistryContent>
              {breast === 'E' ? 'Esquerda' : 'Direita'}
            </RegistryContent>
          </RegistryTextContainer>
          <RegistryTextContainer>
            <RegistryText>Quantidade: </RegistryText>
            <RegistryContent>{quantity} ml</RegistryContent>
          </RegistryTextContainer>
        </RegistryRow>
      </Registry>
    );
  }

  return (
    <Container>
      <DateText>{dateFormatVerbose(currentDate)}</DateText>
      <ListContainer>
        {!isLoading ? (
          registries.map(({ id, breast, date, duration, quantity }) => (
            <RegistryItem
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
