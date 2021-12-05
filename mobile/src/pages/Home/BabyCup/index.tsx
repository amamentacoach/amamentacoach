import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ThemeContext } from 'styled-components';

import { PaddedScrollView } from 'lib/SharedStyles';
import { createTelemetryAction } from 'utils/telemetryAction';

import {
  Instruction,
  InstructionContainer,
  LoadingContainer,
  Step,
  VideoContainer,
  VideoLink,
} from './styles';

const BabyCup: React.FC = () => {
  const { height } = Dimensions.get('window');
  const themeContext = useContext(ThemeContext);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  const steps = [
    i18n.t('BabyCupPage.Step1'),
    i18n.t('BabyCupPage.Step2'),
    i18n.t('BabyCupPage.Step3'),
    i18n.t('BabyCupPage.Step4'),
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.BabyCup },
    });
  }, []);

  return (
    <PaddedScrollView>
      <VideoLink>{i18n.t('BabyCupPage.Header')}</VideoLink>
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
          videoId="-VBk8v8TOrE"
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
      {steps.map((step, index) => (
        <InstructionContainer key={step}>
          <Step>{index + 1}.</Step>
          <Instruction>{step}</Instruction>
        </InstructionContainer>
      ))}
    </PaddedScrollView>
  );
};

export default BabyCup;
