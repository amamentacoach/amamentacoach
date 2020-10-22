import React from 'react';
import { Text, View } from 'react-native';

import { Container, ScrollView } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Placeholder tela principal</Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Home;
