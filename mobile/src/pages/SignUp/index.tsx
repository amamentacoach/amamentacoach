import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Oi</Text>
      <Button title="oi" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SignUp;
