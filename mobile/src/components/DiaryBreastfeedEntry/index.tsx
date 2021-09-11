import i18n from 'i18n-js';
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
              <Content>
                {breast === 'E' ? i18n.t('Left') : i18n.t('Right')}
              </Content>
            </TextContainer>
          </Row>
        </Breastfeed>
      ))}
    </View>
  );
};

export default DiaryBreastfeedEntry;
