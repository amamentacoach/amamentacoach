import React, { useState } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { uploadMotherPhoto } from '../../services/uploadPhoto';
import UploadPhotoScreen from '../../components/UploadPhotoScreen';
import Modal from '../../components/Modal';

import Mirror from '../../../assets/images/mirror.png';

const UploadMotherPhoto: React.FC = () => {
  const navigation = useNavigation();
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);

  // Faz com que o botão de retorno redirecione para a página do diário. Ao contrário do
  // comportamento padrão de voltar a tela anterior.
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#000000"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <Modal
        text="VOCÊ é a melhor mãe do mundo para o seu bebê! Isso simplesmente porque VOCÊ deu a vida a ele, o que ninguém mais poderia fazer! O SEU LEITE é o melhor alimento que ele pode receber! "
        visible={isSubmitModalVisible}
        closeModal={() => setIsSubmitModalVisible(false)}
      />
      <UploadPhotoScreen
        image={Mirror}
        text={
          'Espelho, espelho meu... existe alguém mais capaz de amamentar do que eu?”\nClique no botão abaixo e faça o upload de uma foto sua!'
        }
        uploadFunction={uploadMotherPhoto}
      />
    </>
  );
};

export default UploadMotherPhoto;
