import { Platform } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';

import api from './api';

// Envia a foto do bebê para a api.
async function uploadBabyPhoto(photo: ImagePickerResponse): Promise<boolean> {
  const formData = new FormData();
  formData.append('foto', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  try {
    await api.post('/upload/bebe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}

export default uploadBabyPhoto;
