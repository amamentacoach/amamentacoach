import React from 'react';
import { Text, View } from 'react-native';

import { ScrollView } from './styles';

const Diary: React.FC = () => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Placeholder Diário</Text>
      </View>
    </ScrollView>
  );
};

export default Diary;
