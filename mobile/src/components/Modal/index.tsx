import * as React from 'react';
import { Modal as ReactNativeModal, TouchableOpacity } from 'react-native';

import { Container, Message, CloseButtonText, Line, Image } from './styles';

interface IMainModalProps {
  text?: string | undefined;
  image?: any | undefined;
  visible: boolean;
  closeModal: () => void;
}

const Modal: React.FC<IMainModalProps> = ({
  text,
  image,
  visible,
  closeModal,
}) => {
  return (
    <ReactNativeModal animationType="fade" transparent visible={visible}>
      <Container>
        {text ? <Message>{text}</Message> : null}
        {image ? <Image source={image} resizeMode="contain" /> : null}
        <Line />
        <TouchableOpacity onPress={() => closeModal()} activeOpacity={0.7}>
          <CloseButtonText>Fechar</CloseButtonText>
        </TouchableOpacity>
      </Container>
    </ReactNativeModal>
  );
};

export default Modal;
