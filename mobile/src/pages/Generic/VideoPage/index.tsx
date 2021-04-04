import React, { useCallback, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { setUserVideoSeen } from '../../../services/telemetry';

import {
  ScrollView,
  VideoContainer,
  ContentContainer,
  LoadingContainer,
} from './styles';

type IScreenParams = {
  VideoPage: {
    videos: string[];
  };
};

const VideoPage: React.FC = () => {
  const { videos } = useRoute<RouteProp<IScreenParams, 'VideoPage'>>().params;
  const [isLoading, setIsLoading] = useState(true);

  // Ao final do vídeo é registrado que o usuário viu o vídeo inteiro.
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setUserVideoSeen();
    }
  }, []);

  return (
    <ScrollView>
      {isLoading && (
        <LoadingContainer>
          <ActivityIndicator
            size="large"
            color="#7d5cd7"
            animating={isLoading}
          />
        </LoadingContainer>
      )}
      <ContentContainer display={!isLoading}>
        {videos.map(id => (
          <VideoContainer key={id}>
            <YoutubePlayer
              height={300}
              videoId={id}
              initialPlayerParams={{ loop: false }}
              onReady={() => {
                setIsLoading(false);
              }}
              onChangeState={onStateChange}
            />
          </VideoContainer>
        ))}
      </ContentContainer>
    </ScrollView>
  );
};

export default VideoPage;
