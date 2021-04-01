import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../../contexts/auth';

import { ScrollView, OptionButton, OptionText, Line } from './styles';

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  return (
    <ScrollView>
      <OptionButton onPress={() => navigation.navigate('NewPassword')}>
        <OptionText>Alterar senha</OptionText>
      </OptionButton>
      <Line />
      <OptionButton onPress={signOut}>
        <OptionText>Sair</OptionText>
      </OptionButton>
      <Line />
    </ScrollView>
  );
};

export default Profile;
