import React from 'react';
import { Text, View } from 'react-native';

import { Container, ScrollView } from './styles';

const Survey: React.FC = () => {
  return (
    <Container>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Placeholder Enquetes</Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Survey;
