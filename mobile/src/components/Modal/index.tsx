import * as React from 'react';
import { Modal as ReactNativeModal, TouchableOpacity } from 'react-native';

import { Container, Message, CloseButtonText, Line } from './styles';

interface IMainModalProps {
  text?: string | undefined;
  visible: boolean;
  closeModal: () => void;
}

const Modal: React.FC<IMainModalProps> = ({
  text,
  visible,
  closeModal,
  children,
}) => {
  return (
    <ReactNativeModal animationType="fade" transparent visible={visible}>
      <Container>
        {text ? <Message>{text}</Message> : null}
        {children}
        <Line />
        <TouchableOpacity onPress={() => closeModal()} activeOpacity={0.7}>
          <CloseButtonText>Fechar</CloseButtonText>
        </TouchableOpacity>
      </Container>
    </ReactNativeModal>
  );
};

export default Modal;
