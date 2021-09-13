import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useContext, useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ThemeContext } from 'styled-components';

import OptionsList from 'components/OptionList';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import {
  Header,
  LoadingContainer,
  PageHeader,
  ScrollView,
  Text,
  VideoContainer,
} from './styles';

import ErlenmeyerGreen from '@assets/images/erlenmeyer_green.svg';
import ErlenmeyerPink from '@assets/images/erlenmeyer_pink.svg';
import ErlenmeyerPrimary from '@assets/images/erlenmeyer_primary.svg';
import ErlenmeyerYellow from '@assets/images/erlenmeyer_yellow.svg';

const Resilience: React.FC = () => {
  const { height } = Dimensions.get('window');
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation<RootStackProps>();
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  const options: OptionListEntry[] = [
    {
      image: ErlenmeyerPrimary,
      title: i18n.t('ResiliencePage.Option1'),
      onPress: () => navigation.navigate('ManageExpectations'),
    },
    {
      image: ErlenmeyerYellow,
      title: i18n.t('ResiliencePage.Option2'),
      onPress: () => navigation.navigate('Messages'),
    },
    {
      image: ErlenmeyerGreen,
      title: i18n.t('ResiliencePage.Option3'),
      onPress: () => navigation.navigate('Diary'),
    },
    {
      image: ErlenmeyerPink,
      title: i18n.t('ResiliencePage.Option4'),
      onPress: () => navigation.navigate('UploadMotherPhoto'),
    },
  ];

  return (
    <ScrollView>
      <PageHeader>{i18n.t('ResiliencePage.Header')}</PageHeader>
      {isLoadingVideo && (
        <LoadingContainer>
          <ActivityIndicator
            size="large"
            color={themeContext.primary}
            animating={isLoadingVideo}
          />
        </LoadingContainer>
      )}
      <VideoContainer display={!isLoadingVideo}>
        <YoutubePlayer
          height={height / 3}
          videoId="KGedLLSN0FU"
          initialPlayerParams={{ loop: false }}
          onReady={() => setIsLoadingVideo(false)}
          webViewProps={{
            injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            true;
          `,
          }}
        />
      </VideoContainer>
      <Header>{i18n.t('ResiliencePage.TextHeader')}</Header>
      <Text>{i18n.t('ResiliencePage.Text')}</Text>
      <OptionsList options={options} displayArrows />
    </ScrollView>
  );
};

export default Resilience;
