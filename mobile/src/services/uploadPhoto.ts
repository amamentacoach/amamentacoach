import { Platform } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';

import api from './api';

// Retorna um objeto formdata contendo a image passada.
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

// Envia uma foto passada para um rota.
async function uploadPhoto(route: string, photo: ImagePickerResponse) {
  const formData = prepareImageFormData(photo);
  try {
    await api.post(`/upload/${route}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Envia a foto da mãe para a api.
export async function uploadMotherPhoto(
  photo: ImagePickerResponse,
): Promise<boolean> {
  return uploadPhoto('mae', photo);
}

// Envia a foto do pai para a api.
export async function uploadFatherPhoto(
  photo: ImagePickerResponse,
): Promise<boolean> {
  return uploadPhoto('pai', photo);
}

// Envia a foto do bebê para a api.
export async function uploadBabyPhoto(
  photo: ImagePickerResponse,
): Promise<boolean> {
  return uploadPhoto('bebe', photo);
}
