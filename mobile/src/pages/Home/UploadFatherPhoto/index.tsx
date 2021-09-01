import React from 'react';

import i18n from 'i18n-js';

import UploadPhotoScreen from '../../../components/UploadPhotoScreen';
import { uploadFatherPhoto } from '../../../services/uploadPhoto';

import Family from '../../../../assets/images/family.png';

const UploadFatherPhoto: React.FC = () => {
  return (
    <UploadPhotoScreen
      target="father"
      image={Family}
      text={i18n.t('UploadFatherPhotoPage.Text')}
      uploadFunction={uploadFatherPhoto}
    />
  );
};

export default UploadFatherPhoto;
