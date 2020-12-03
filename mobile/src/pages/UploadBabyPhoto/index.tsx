import React, { useState } from 'react';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { Dimensions, Image } from 'react-native';

import MainButton from '../../components/MainButton';

import {
  ScrollView,
  FormContainer,
  SubmitButtonContainer,
  Text,
  SelectedImage,
} from './styles';

import HeartArrow from '../../../assets/images/heart_arrow.png';
import uploadBabyPhoto from '../../services/uploadBabyPhoto';

const UploadBabyPhoto: React.FC = () => {
  const { width } = Dimensions.get('window');
  const [photo, setPhoto] = useState<ImagePickerResponse | null>(null);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

  async function handleSubmitNewPhoto() {
    if (photo) {
      setIsSendingForm(true);
      await uploadBabyPhoto(photo);
      setIsSendingForm(false);
      setIsPhotoUploaded(true);
    }
  }

  async function handleSelectPhoto() {
    ImagePicker.launchImageLibrary({ noData: true }, (response) => {
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
            <Image source={HeartArrow} />
            <Text>
              Escolha uma foto de seu(s) bebê(s) na galeria e deixe aqui para
              lembrar qual a sua grande motivação para amamentar.
            </Text>
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

export default UploadBabyPhoto;
