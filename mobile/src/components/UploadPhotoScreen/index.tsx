import React, { useState } from 'react';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { Dimensions, Image } from 'react-native';

import MainButton from '../MainButton';

import {
  ScrollView,
  FormContainer,
  SubmitButtonContainer,
  Text,
  SelectedImage,
} from './styles';
import { useAuth } from '../../contexts/auth';

interface UploadPhotoScreenProps {
  target: 'mother' | 'baby' | 'father';
  image: any;
  text: string;
  uploadFunction: (photo: ImagePickerResponse) => Promise<string | null>;
}

const UploadPhotoScreen: React.FC<UploadPhotoScreenProps> = ({
  target,
  image,
  text,
  uploadFunction,
}) => {
  const { width } = Dimensions.get('window');
  const {
    motherInfo: { images },
  } = useAuth();
  const [photo, setPhoto] = useState<ImagePickerResponse | null>(null);

  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

  async function handleSubmitNewPhoto() {
    if (photo) {
      setIsSendingForm(true);
      const filename = await uploadFunction(photo);
      images[target] = filename;
      setIsSendingForm(false);
      setIsPhotoUploaded(true);
    }
  }

  async function handleSelectPhoto() {
    ImagePicker.launchImageLibrary({ noData: true }, response => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  }

  function getSubmitButtonText() {
    if (isPhotoUploaded && !isSendingForm) {
      return 'Reenviar foto';
    }
    return isSendingForm ? 'Enviando...' : 'Enviar';
  }

  return (
    <ScrollView>
      <FormContainer>
        {/* Usuário já fez o upload the uma foto */}
        {images[target] && (
          <SelectedImage
            source={{
              uri: `https://amamentacoach.herokuapp.com/uploads/${images[target]}`,
            }}
            width={width}
            resizeMode="contain"
          />
        )}
        {/* Usuário selecionou uma nova foto */}
        {photo && !images[target] && (
          <SelectedImage
            source={{ uri: photo.uri }}
            width={width}
            resizeMode="contain"
          />
        )}
        {/* Usuário ainda não enviou uma foto e não selecionou nenhuma para ser enviada */}
        {!photo && !images[target] && (
          <>
            <Image source={image} />
            <Text>{text}</Text>
          </>
        )}
      </FormContainer>
      <SubmitButtonContainer>
        <MainButton
          onPress={photo ? handleSubmitNewPhoto : handleSelectPhoto}
          disabled={isSendingForm}
          text={getSubmitButtonText()}
        />
      </SubmitButtonContainer>
    </ScrollView>
  );
};

export default UploadPhotoScreen;
