import React, { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import dateFormatVerbose from '../../utils/date';
import {
  listDiaryRegistries,
  IListDiaryEntry,
} from '../../services/diaryRegistry';
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
  LoadingIndicator,
} from './styles';

const DiaryRegistry: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const currentDate = moment();
  const [registries, setRegistries] = useState<IListDiaryEntry[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistries() {
      setLoading(true);
      const oldRegistries = await listDiaryRegistries();
      setRegistries(oldRegistries);
      setLoading(false);
    }
    fetchRegistries();
  }, [isFocused]);

  function InfoPage({ date, breast, duration, quantity }: IListDiaryEntry) {
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
            <RegistryText>Quantidade: </RegistryText>
            <RegistryContent>{quantity} ml</RegistryContent>
          </RegistryTextContainer>
          <RegistryTextContainer>
            <RegistryText>Mama: </RegistryText>
            <RegistryContent>
              {breast === 'E' ? 'Esquerda' : 'Direita'}
            </RegistryContent>
          </RegistryTextContainer>
        </RegistryRow>
      </Registry>
    );
  }

  return (
    <Container>
      <DateText>{dateFormatVerbose(currentDate)}</DateText>
      <ListContainer>
        <FlatList
          data={registries}
          renderItem={({ item }) => <InfoPage {...item} />}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={() => (
            <LoadingIndicator
              size="large"
              color="#7d5cd7"
              animating={loading}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>
      <MainButton
        text="Registrar retirada"
        onPress={() => navigation.navigate('NewDiaryRegistry')}
      />
    </Container>
  );
};

export default DiaryRegistry;
