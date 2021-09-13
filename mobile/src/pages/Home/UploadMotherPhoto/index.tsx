import i18n from 'i18n-js';
import { useState } from 'react';

import Modal from 'components/Modal';
import UploadPhotoScreen from 'components/UploadPhotoScreen';
import { uploadMotherPhoto } from 'services/uploadPhoto';

import Mirror from '@assets/images/mirror.png';

const UploadMotherPhoto: React.FC = () => {
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);

  return (
    <>
      <Modal
        content={i18n.t('UploadMotherPhotoPage.BestMother')}
        visible={isSubmitModalVisible}
        options={[
          {
            text: i18n.t('Close'),
            onPress: () => setIsSubmitModalVisible(false),
          },
        ]}
      />
      <UploadPhotoScreen
        target="mother"
        image={Mirror}
        text={i18n.t('UploadMotherPhotoPage.Mirror')}
        uploadFunction={uploadMotherPhoto}
      />
    </>
  );
};

export default UploadMotherPhoto;
