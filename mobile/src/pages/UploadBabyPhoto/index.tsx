import React from 'react';

import { uploadBabyPhoto } from '../../services/uploadPhoto';
import UploadPhotoScreen from '../../components/UploadPhotoScreen';

import HeartArrow from '../../../assets/images/heart_arrow.png';

const UploadBabyPhoto: React.FC = () => {
  return (
    <UploadPhotoScreen
      image={HeartArrow}
      text="Escolha uma foto de seu(s) bebê(s) na galeria e deixe aqui
      para lembrar qual a sua grande motivação para amamentar."
      uploadFunction={uploadBabyPhoto}
    />
  );
};

export default UploadBabyPhoto;
