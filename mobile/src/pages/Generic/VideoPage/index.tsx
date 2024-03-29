import { useRoute } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import theme from 'config/theme';
import { ScrollView } from 'lib/sharedStyles';
import { setUserVideoSeen, setUserVideoStarted } from 'services/telemetry';

import type { RootRouteProp } from 'routes/app';

import { ContentContainer, LoadingContainer, VideoContainer } from './styles';

const VideoPage: React.FC = () => {
  const { videos } = useRoute<RootRouteProp<'VideoPage'>>().params;
  const { height } = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(true);
  const playedOnce = useRef(false);
  const endedOnce = useRef(false);

  // Ao final do vídeo é registrado que o usuário viu o vídeo inteiro.
  const onStateChange = useCallback(state => {
    if (state === 'playing' && !playedOnce.current) {
      playedOnce.current = true;
      setUserVideoStarted();
    } else if (state === 'ended' && !endedOnce.current) {
      endedOnce.current = true;
      setUserVideoSeen();
    }
  }, []);

  return (
    <ScrollView>
      {isLoading && (
        <LoadingContainer>
          <ActivityIndicator
            animating={isLoading}
            color={theme.primary}
            size="large"
          />
        </LoadingContainer>
      )}
      <ContentContainer display={!isLoading}>
        {videos.map(id => (
          <VideoContainer key={id}>
            <YoutubePlayer
              height={height / 3}
              initialPlayerParams={{ loop: false }}
              videoId={id}
              onChangeState={onStateChange}
              onReady={() => setIsLoading(false)}
            />
          </VideoContainer>
        ))}
      </ContentContainer>
    </ScrollView>
  );
};

export default VideoPage;
