import React from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import { ExtractionEntry } from '../../services/diaryRegistry';

import { Registry, Row, Text, TextContainer, Content } from './styles';

const DiaryRegistryEntry: React.FC<ExtractionEntry> = ({
  breast,
  date,
  duration,
  quantity,
}) => {
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
};

export default DiaryRegistryEntry;
