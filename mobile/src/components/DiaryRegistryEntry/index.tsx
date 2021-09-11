import i18n from 'i18n-js';

import { format } from '../../lib/date-fns';
import { ExtractionEntry } from '../../services/diaryRegistry';

import { Content, Registry, Row, Text, TextContainer } from './styles';

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
          <Text>{i18n.t('Time')}: </Text>
          <Content>{format(new Date(date), 'kk:mm')}</Content>
        </TextContainer>
        <TextContainer>
          <Text>{i18n.t('Duration')}: </Text>
          <Content>{duration} min</Content>
        </TextContainer>
      </Row>
      <Row>
        <TextContainer>
          <Text>{i18n.t('Breast')}: </Text>
          <Content>{breast === 'E' ? i18n.t('Left') : i18n.t('Right')}</Content>
        </TextContainer>
        <TextContainer>
          <Text>{i18n.t('Quantity')}: </Text>
          <Content>{quantity} ml</Content>
        </TextContainer>
      </Row>
    </Registry>
  );
};

export default DiaryRegistryEntry;
