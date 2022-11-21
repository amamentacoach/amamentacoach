import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import UploadPhotoScreen from 'components/UploadPhotoScreen';
import { uploadFatherPhoto } from 'services/uploadPhoto';
import { createTelemetryAction } from 'utils/telemetryAction';

import Family from '@assets/images/family.webp';

const UploadFatherPhoto: React.FC = () => {
  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.UploadFatherPhoto },
    });
  }, []);

  return (
    <UploadPhotoScreen
      imagePlaceholder={Family}
      target="father"
      textPlaceholder={i18n.t('UploadFatherPhotoPage.Text')}
      uploadFunction={uploadFatherPhoto}
    />
  );
};

export default UploadFatherPhoto;
