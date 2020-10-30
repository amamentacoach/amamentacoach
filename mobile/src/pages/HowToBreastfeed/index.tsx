import React from 'react';

import {
  Container,
  ContentContainer,
  ContentImage,
  ContentOptionButton,
  ContentSeparator,
  ContentTextContainer,
  ContentTitle,
  HeaderText,
  Option,
  ScrollView,
} from './styles';

const HowToBreastFeed: React.FC = () => {
  const options = [
    {
      image: require('../../../assets/images/withdrawal_question.png'),
      title: 'Por que fazer?',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_breastfeed.png'),
      title: 'Como fazer?',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/withdrawal_calendar.png'),
      title: 'Quando fazer?',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/withdrawal_clock.png'),
      title: 'Por quanto tempo fazer?',
      onPress: () => {},
    },
  ];

  return (
    <Container>
      <ScrollView>
        <HeaderText>
          Tudo o que você precisa saber sobre retirada do leite
        </HeaderText>
        <ContentContainer>
          {options.map(({ image, title, onPress }, index) => (
            <Option key={title}>
              <ContentOptionButton activeOpacity={0.7} onPress={onPress}>
                <ContentImage source={image} />
                <ContentTextContainer>
                  <ContentTitle>{title}</ContentTitle>
                </ContentTextContainer>
              </ContentOptionButton>
              {index < options.length - 1 && <ContentSeparator />}
            </Option>
          ))}
        </ContentContainer>
      </ScrollView>
    </Container>
  );
};

export default HowToBreastFeed;
