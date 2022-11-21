import { Action, AppScreen } from '@common/telemetria';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import UploadPhotoScreen from 'components/UploadPhotoScreen';
import { uploadMotherPhoto } from 'services/uploadPhoto';
import { createTelemetryAction } from 'utils/telemetryAction';

import Mirror from '@assets/images/mirror.webp';

const UploadMotherPhoto: React.FC = () => {
  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.UploadMotherPhoto },
    });
  }, []);

  return (
    <UploadPhotoScreen
      imagePlaceholder={Mirror}
      modalSuccessText={i18n.t('UploadMotherPhotoPage.BestMother')}
      target="mother"
      textPlaceholder={i18n.t('UploadMotherPhotoPage.Mirror')}
      uploadFunction={uploadMotherPhoto}
    />
  );
};

export default UploadMotherPhoto;
