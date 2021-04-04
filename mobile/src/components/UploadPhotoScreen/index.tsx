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
  SendButtonContainer,
  SelectButtonContainer,
} from './styles';
import { useAuth } from '../../contexts/auth';
import SecondaryButton from '../SecondaryButton';

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
  const { motherInfo, updateMotherInfo } = useAuth();
  const [photo, setPhoto] = useState<ImagePickerResponse | null>(null);

  const [isSendingForm, setIsSendingForm] = useState(false);
  const [formSent, setFormSent] = useState(false);

  async function handleSubmitNewPhoto() {
    if (photo) {
      setIsSendingForm(true);
      const filename = await uploadFunction(photo);
      motherInfo.images[target] = filename;
      await updateMotherInfo();
      setIsSendingForm(false);
      setFormSent(true);
    }
  }

  async function handleSelectPhoto() {
    ImagePicker.launchImageLibrary({ noData: true }, response => {
      if (response.uri) {
        setPhoto(response);
        setFormSent(false);
      }
    });
  }

  return (
    <ScrollView>
      <FormContainer>
        {/* Usuário já fez o upload the uma foto */}
        {!photo && !formSent && motherInfo.images[target] && (
          <SelectedImage
            source={{
              uri: `https://amamentacoach.herokuapp.com/uploads/${motherInfo.images[target]}`,
            }}
            width={width}
            resizeMode="contain"
          />
        )}
        {/* Usuário selecionou uma nova foto */}
        {photo && (
          <SelectedImage
            source={{ uri: photo.uri }}
            width={width}
            resizeMode="contain"
          />
        )}
        {/* Usuário ainda não enviou uma foto e não selecionou nenhuma para ser enviada */}
        {!photo && !motherInfo.images[target] && (
          <>
            <Image source={image} />
            <Text>{text}</Text>
          </>
        )}
      </FormContainer>
      <SubmitButtonContainer>
        <SelectButtonContainer>
          <SecondaryButton
            onPress={handleSelectPhoto}
            disabled={isSendingForm}
            text="Selecionar foto"
          />
        </SelectButtonContainer>
        <SendButtonContainer>
          <MainButton
            onPress={handleSubmitNewPhoto}
            disabled={formSent || isSendingForm}
            text={isSendingForm ? 'Enviando...' : 'Enviar'}
          />
        </SendButtonContainer>
      </SubmitButtonContainer>
    </ScrollView>
  );
};

export default UploadPhotoScreen;
