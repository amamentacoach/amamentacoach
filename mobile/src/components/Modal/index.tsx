import * as React from 'react';
import { Modal as ReactNativeModal } from 'react-native';

import {
  CloseButton,
  Container,
  Message,
  CloseButtonText,
  Line,
} from './styles';

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
        <CloseButton onPress={() => closeModal()}>
          <CloseButtonText>Fechar</CloseButtonText>
        </CloseButton>
      </Container>
    </ReactNativeModal>
  );
};

export default Modal;
