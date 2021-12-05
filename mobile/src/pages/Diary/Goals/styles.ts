import styled from 'styled-components/native';

interface ContainerProps {
  modalVisible: boolean;
}

export const ModalContainer = styled.View<ContainerProps>`
  position: absolute;
  z-index: 1;
  height: ${({ modalVisible }) => (modalVisible ? '100%' : '0')};
  width: ${({ modalVisible }) => (modalVisible ? '100%' : '0')};
  background-color: ${({ modalVisible }) =>
    modalVisible ? '#000000' : 'transparent'};
  opacity: ${({ modalVisible }) => (modalVisible ? 0.4 : 1)};
`;
