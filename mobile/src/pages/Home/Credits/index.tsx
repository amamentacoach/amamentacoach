import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';

import { ScrollView, Text } from './styles';

const Credits: React.FC = () => {
  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://www.nice.org.uk/guidance/cg93')}
        activeOpacity={1}>
        <Text>
          [1] Donor milk banks: service operation{'\n'}Clinical guideline
          {'\n'}
          Published: 24 February 2010{'\n'}www.nice.org.uk/guidance/cg93
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Credits;
