import React from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { Container, ScrollView, VideoContainer } from './styles';

type IScreenParams = {
  VideoPage: {
    videos: string[];
  };
};

const VideoPage: React.FC = () => {
  const { videos } = useRoute<RouteProp<IScreenParams, 'VideoPage'>>().params;

  return (
    <Container>
      <ScrollView>
        {videos.map((id) => (
          <VideoContainer key={id}>
            <YoutubePlayer
              height={400}
              videoId={id}
              initialPlayerParams={{ loop: false }}
            />
          </VideoContainer>
        ))}
      </ScrollView>
    </Container>
  );
};

export default VideoPage;
