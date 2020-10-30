import React from 'react';

import {
  Container,
  ScrollView,
  ContentContainer,
  ContentOptionButton,
  ContentImage,
  ContentTitle,
  ContentSubtitle,
  ContentSeparator,
  Option,
  ContentTextContainer,
} from './styles';

const Premature: React.FC = () => {
  const options = [
    {
      image: require('../../../assets/images/premature_birth.png'),
      title: 'Parto prematuro: não era isso que eu esperava',
      subtitle: 'Subtítulo 1',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_baby.png'),
      title: 'Muito prazer, eu sou o Prematuro',
      subtitle: 'Subtítulo 2',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_heart.png'),
      title: 'Minha maior motivação para amamentar',
      subtitle: 'Subtítulo 3',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/premature_survey.png'),
      title: 'Um período de luta, toda uma vida de resultados',
      subtitle: 'Benefícios da amamentação',
      onPress: () => {},
    },
  ];

  return (
    <Container>
      <ScrollView>
        <ContentContainer>
          {options.map(({ image, title, subtitle, onPress }, index) => (
            <Option key={title}>
              <ContentOptionButton activeOpacity={0.7} onPress={onPress}>
                <ContentImage source={image} />
                <ContentTextContainer>
                  <ContentTitle>{title}</ContentTitle>
                  <ContentSubtitle>{subtitle}</ContentSubtitle>
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

export default Premature;
