import { Platform } from 'react-native';

import api from 'services/api';

import type { ImagePickerResponse } from 'react-native-image-picker';

type UploadResponse = string | null;

// Retorna um objeto FormData contendo a imagem passada.
function prepareImageFormData(
  fieldName: string,
  photo: ImagePickerResponse,
): FormData {
  const formData = new FormData();
  formData.append(fieldName, {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });
  return formData;
}

// Envia uma foto do usuário para uma rota especificada.
async function uploadPhoto(
  route: 'bebe' | 'mae' | 'pai',
  photo: ImagePickerResponse,
): Promise<UploadResponse> {
  const formData = prepareImageFormData('foto', photo);
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
export async function uploadMotherPhoto(
  photo: ImagePickerResponse,
): Promise<UploadResponse> {
  return uploadPhoto('mae', photo);
}

// Envia a foto do pai para a api.
export async function uploadFatherPhoto(
  photo: ImagePickerResponse,
): Promise<UploadResponse> {
  return uploadPhoto('pai', photo);
}

// Envia a foto do bebê para a api.
export async function uploadBabyPhoto(
  photo: ImagePickerResponse,
): Promise<UploadResponse> {
  return uploadPhoto('bebe', photo);
}
