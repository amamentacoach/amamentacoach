import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import Modal from 'components/Modal';
import OptionsList from 'components/OptionList';
import PaddedScrollView from 'components/PaddedScrollView';
import theme from 'config/theme';
import { OpenSansRegular } from 'lib/sharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { OptionListEntry } from 'components/OptionList';
import type { RootStackProps } from 'routes/app';

import {
  Header,
  LoadingContainer,
  PageHeader,
  Text,
  VideoContainer,
  MoreInfoContainer,
} from './styles';

import ErlenmeyerGreen from '@assets/images/erlenmeyer_green.svg';
import ErlenmeyerPink from '@assets/images/erlenmeyer_pink.svg';
import ErlenmeyerYellow from '@assets/images/erlenmeyer_yellow.svg';
import IcQuestion from '@assets/images/icons/ic_question.svg';

const Resilience: React.FC = () => {
  const { height } = Dimensions.get('window');
  const navigation = useNavigation<RootStackProps>();
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MoreInfoContainer>
          <IcQuestion
            title="About"
            onPress={() => setIsInfoModalVisible(true)}
          />
        </MoreInfoContainer>
      ),
    });
  }, []);

  const options: OptionListEntry[] = [
    {
      image: { source: ErlenmeyerYellow },
      title: i18n.t('ResiliencePage.Option2'),
      onPress: () => navigation.navigate('Messages'),
    },
    {
      image: { source: ErlenmeyerGreen },
      title: i18n.t('ResiliencePage.Option3'),
      onPress: () => navigation.navigate('Diary'),
    },
    {
      image: { source: ErlenmeyerPink },
      title: i18n.t('ResiliencePage.Option4'),
      onPress: () => navigation.navigate('UploadMotherPhoto'),
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.Resilience },
    });
  }, []);

  return (
    <PaddedScrollView>
      <Modal
        options={[
          {
            text: i18n.t('Close'),
            isBold: true,
            onPress: () => setIsInfoModalVisible(false),
          },
        ]}
        visible={isInfoModalVisible}>
        <OpenSansRegular>{i18n.t('ResiliencePage.InfoModal')}</OpenSansRegular>
      </Modal>
      <PageHeader>{i18n.t('ResiliencePage.Header')}</PageHeader>
      {isLoadingVideo && (
        <LoadingContainer>
          <ActivityIndicator
            animating={isLoadingVideo}
            color={theme.primary}
            size="large"
          />
        </LoadingContainer>
      )}
      <VideoContainer display={!isLoadingVideo}>
        <YoutubePlayer
          height={height / 3}
          initialPlayerParams={{ loop: false }}
          videoId="KGedLLSN0FU"
          webViewProps={{
            injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            true;
          `,
          }}
          onReady={() => setIsLoadingVideo(false)}
        />
      </VideoContainer>
      <Header>{i18n.t('ResiliencePage.TextHeader')}</Header>
      <Text>{i18n.t('ResiliencePage.Text')}</Text>
      <OptionsList options={options} displayArrows />
    </PaddedScrollView>
  );
};

export default Resilience;
