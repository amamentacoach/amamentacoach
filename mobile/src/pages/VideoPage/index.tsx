import React from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { ScrollView, VideoContainer, ContentContainer } from './styles';

type IScreenParams = {
  VideoPage: {
    videos: string[];
  };
};

const VideoPage: React.FC = () => {
  const { videos } = useRoute<RouteProp<IScreenParams, 'VideoPage'>>().params;

  return (
    <ScrollView>
      <ContentContainer>
        {videos.map((id) => (
          <VideoContainer key={id}>
            <YoutubePlayer
              height={300}
              videoId={id}
              initialPlayerParams={{ loop: false }}
            />
          </VideoContainer>
        ))}
      </ContentContainer>
    </ScrollView>
  );
};

export default VideoPage;
