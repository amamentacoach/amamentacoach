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

interface UploadPhotoScreenProps {
  image: any;
  text: string;
  uploadFunction: (photo: ImagePickerResponse) => Promise<boolean>;
}

const UploadPhotoScreen: React.FC<UploadPhotoScreenProps> = ({
  image,
  text,
  uploadFunction,
}) => {
  const { width } = Dimensions.get('window');
  const [photo, setPhoto] = useState<ImagePickerResponse | null>(null);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

  async function handleSubmitNewPhoto() {
    if (photo) {
      setIsSendingForm(true);
      await uploadFunction(photo);
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
        {photo ? (
          <SelectedImage
            source={{ uri: photo.uri }}
            width={width}
            resizeMode="contain"
          />
        ) : (
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
