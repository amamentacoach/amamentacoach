import React from 'react';

import {
  Container,
  ScrollView,
  Header,
  ContentContainer,
  ContentHeader,
  ContentOptionButton,
  BannerImage,
  ContentImage,
  ContentTitle,
  ContentSubtitle,
  ContentSeparator,
  Option,
  ContentTextContainer,
  OpenIconImage,
} from './styles';

import HUBanner from '../../../assets/images/banner_hu.png';
import NextIcon from '../../../assets/images/icons/ic_next.png';

const HU: React.FC = () => {
  const options = [
    {
      image: require('../../../assets/images/ic_video.png'),
      title: 'Vídeo AmamentaCoach',
      subtitle: 'Conheça o AmamentaCoach',
      onPress: () => {},
    },
    {
      image: require('../../../assets/images/ic_video.png'),
      title: 'Video HU Londrina',
      subtitle: 'Conheça o HU',
      onPress: () => {},
    },
  ];

  return (
    <Container>
      <ScrollView>
        <Header>
          <BannerImage source={HUBanner} />
        </Header>
        <ContentContainer>
          <ContentHeader>Vídeos</ContentHeader>
          {options.map(({ image, title, subtitle, onPress }, index) => (
            <Option key={title}>
              <ContentOptionButton activeOpacity={0.7} onPress={onPress}>
                <ContentImage source={image} />
                <ContentTextContainer>
                  <ContentTitle>{title}</ContentTitle>
                  <ContentSubtitle>{subtitle}</ContentSubtitle>
                </ContentTextContainer>
                <OpenIconImage source={NextIcon} resizeMode="contain" />
              </ContentOptionButton>
              {index < options.length - 1 && <ContentSeparator />}
            </Option>
          ))}
        </ContentContainer>
      </ScrollView>
    </Container>
  );
};

export default HU;
