import React from 'react';
import { Text, View } from 'react-native';

import { useAuth } from '../../contexts/auth';
import MainButton from '../../components/MainButton';

import { Container, ScrollView } from './styles';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Placeholder Perfil</Text>
          <View
            style={{
              width: '100%',
            }}>
            <MainButton
              buttonText="Sair"
              onPress={() => {
                signOut();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Profile;
