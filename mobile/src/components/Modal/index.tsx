import * as React from 'react';
import { Modal as ReactNativeModal } from 'react-native';

import {
  Container,
  Content,
  Line,
  Image,
  OptionText,
  OptionsContainer,
  Option,
} from './styles';

interface IMainModalProps {
  // Controla a visibilidade do modal.
  visible: boolean;
  // Conteúdo do modal.
  content?: string;
  // Imagem a ser exibida dentro do modal. Precisa ser fornecida utilizando a função require().
  image?: any;
  // Botões exibidos na parte debaixo do modal.
  options: {
    // Texto da opção.
    text: string;
    // Controla se a opção deve ser escrita em negrito.
    isBold?: boolean;
    // Controla se a opção está desativada.
    disabled?: boolean;
    // Função executado ao pressionar o botão.
    onPress: () => void;
  }[];
  color?: string;
}

const Modal: React.FC<IMainModalProps> = ({
  content,
  image,
  visible,
  options,
  color,
  children,
}) => {
  return (
    <ReactNativeModal animationType="fade" transparent visible={visible}>
      <Container>
        {content && <Content>{content}</Content>}
        {image && <Image source={image} resizeMode="contain" />}
        {children}
        <Line />
        <OptionsContainer>
          {options.map(({ text, isBold, disabled, onPress }) => (
            <Option
              key={text}
              onPress={onPress}
              disabled={disabled}
              activeOpacity={0.7}>
              <OptionText color={color} isBold={isBold} disabled={disabled}>
                {text}
              </OptionText>
            </Option>
          ))}
        </OptionsContainer>
      </Container>
    </ReactNativeModal>
  );
};

export default Modal;
