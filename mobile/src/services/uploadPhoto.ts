import { Platform } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';

import api from 'services/api';

// Retorna um objeto FormData contendo a imagem passada.
function prepareImageFormData(photo: ImagePickerResponse) {
  const formData = new FormData();
  formData.append('foto', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });
  return formData;
}

// Envia uma foto do usuário para uma rota especificada.
async function uploadPhoto(
  route: string,
  photo: ImagePickerResponse,
): Promise<string | null> {
  const formData = prepareImageFormData(photo);
  try {
    const { data } = await api.post(`/upload/${route}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.filename;
  } catch (error) {
    return null;
  }
}

// Envia a foto da mãe para a api.
export async function uploadMotherPhoto(photo: ImagePickerResponse) {
  return uploadPhoto('mae', photo);
}

// Envia a foto do pai para a api.
export async function uploadFatherPhoto(photo: ImagePickerResponse) {
  return uploadPhoto('pai', photo);
}

// Envia a foto do bebê para a api.
export async function uploadBabyPhoto(photo: ImagePickerResponse) {
  return uploadPhoto('bebe', photo);
}
