import i18n from 'i18n-js';
import { useContext, useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ThemeContext } from 'styled-components';

import {
  Instruction,
  InstructionContainer,
  LoadingContainer,
  ScrollView,
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

  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default BabyCup;
