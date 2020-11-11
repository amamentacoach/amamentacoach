import React from 'react';
import { Text, View } from 'react-native';

import { ScrollView } from './styles';

const Survey: React.FC = () => {
  return (
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
  );
};

export default Survey;
