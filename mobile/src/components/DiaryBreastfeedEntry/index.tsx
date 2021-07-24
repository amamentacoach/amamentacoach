import React from 'react';

import { View } from 'react-native';

import { format } from '../../lib/date-fns';
import { BreastfeedEntry } from '../../services/diaryRegistry';

import {
  BabyName,
  Breastfeed,
  Content,
  Row,
  Text,
  TextContainer,
} from './styles';

const DiaryBreastfeedEntry: React.FC<BreastfeedEntry> = ({ name, entries }) => {
  if (entries.length <= 0) {
    return <></>;
  }

  return (
    <View>
      <BabyName>{name}</BabyName>
      {entries.map(({ id, breast, date, duration }) => (
        <Breastfeed key={id}>
          <Row>
            <TextContainer>
              <Text>Horário: </Text>
              <Content>{format(new Date(date), 'kk:mm')}</Content>
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
          </Row>
        </Breastfeed>
      ))}
    </View>
  );
};

export default DiaryBreastfeedEntry;
