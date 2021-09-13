import i18n from 'i18n-js';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import ImageWrapper from 'components/ImageWrapper';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import { useAuth } from 'contexts/auth';

import type { ImageWrapperSourcePropType } from 'components/ImageWrapper';
import type { ImagePickerResponse } from 'react-native-image-picker';

import {
  Container,
  ScrollView,
  SelectButtonContainer,
  SelectedImage,
  SendButtonContainer,
  SubmitButtonContainer,
  Text,
} from './styles';

interface UploadPhotoScreenProps {
  target: 'mother' | 'baby' | 'father';
  image: ImageWrapperSourcePropType;
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
      <Container>
        {/* Usuário já fez o upload de uma foto */}
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
            <ImageWrapper
              source={image}
              resizeMode="contain"
              height={250}
              width={250}
            />
            <Text>{text}</Text>
          </>
        )}
      </Container>
      <SubmitButtonContainer>
        <SelectButtonContainer>
          <SecondaryButton
            onPress={handleSelectPhoto}
            disabled={isSendingForm}
            text={i18n.t('Actions.SelectPicture')}
          />
        </SelectButtonContainer>
        <SendButtonContainer>
          <MainButton
            onPress={handleSubmitNewPhoto}
            disabled={!photo || formSent || isSendingForm}
            text={
              isSendingForm ? i18n.t('Status.Sending') : i18n.t('Actions.Send')
            }
          />
        </SendButtonContainer>
      </SubmitButtonContainer>
    </ScrollView>
  );
};

export default UploadPhotoScreen;
