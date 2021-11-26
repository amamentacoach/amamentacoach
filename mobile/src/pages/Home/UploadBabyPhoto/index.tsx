import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import UploadPhotoScreen from 'components/UploadPhotoScreen';
import { uploadBabyPhoto } from 'services/uploadPhoto';
import { createTelemetryAction } from 'utils/telemetryAction';

import HeartArrow from '@assets/images/heart_arrow.svg';

const UploadBabyPhoto: React.FC = () => {
  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.UploadBabyPhoto },
    });
  }, []);

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
