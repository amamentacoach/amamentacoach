import * as React from 'react';
import { Modal as ReactNativeModal, TouchableOpacity } from 'react-native';

import { Container, Message, CloseButtonText, Line } from './styles';

interface IMainModalProps {
  text: string;
  visible: boolean;
  closeModal: () => void;
}

const Modal = ({ text, visible, closeModal }: IMainModalProps) => {
  return (
    <ReactNativeModal animationType="fade" transparent visible={visible}>
      <Container>
        <Message>{text}</Message>
        <Line />
        <TouchableOpacity onPress={() => closeModal()} activeOpacity={0.7}>
          <CloseButtonText>Fechar</CloseButtonText>
        </TouchableOpacity>
      </Container>
    </ReactNativeModal>
  );
};

export default Modal;
