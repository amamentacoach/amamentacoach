import i18n from 'i18n-js';

import UploadPhotoScreen from '../../../components/UploadPhotoScreen';
import { uploadBabyPhoto } from '../../../services/uploadPhoto';

import HeartArrow from '../../../../assets/images/heart_arrow.svg';

const UploadBabyPhoto: React.FC = () => {
  return (
    <UploadPhotoScreen
      target="baby"
      image={HeartArrow}
      text={i18n.t('UploadBabyPhotoPage.SelectPhoto')}
      uploadFunction={uploadBabyPhoto}
    />
  );
};

export default UploadBabyPhoto;
