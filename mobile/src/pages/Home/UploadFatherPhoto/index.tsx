import React from 'react';

import UploadPhotoScreen from '../../../components/UploadPhotoScreen';
import { uploadFatherPhoto } from '../../../services/uploadPhoto';

import Family from '../../../../assets/images/family.svg';

const UploadFatherPhoto: React.FC = () => {
  return (
    <UploadPhotoScreen
      target="father"
      Image={Family}
      text={`Envolver o pai do bebê nessa jornada faz toda a diferença! Clique no botão abaixo e envie uma foto de um momento legal do papai com o bebê.
\nCaso não seja possível envolver o pai, você pode escolher outra pessoa importante pra ser esse apoio fundamental a você e seu bebê!`}
      uploadFunction={uploadFatherPhoto}
    />
  );
};

export default UploadFatherPhoto;
