import * as React from 'react';
import { Modal as ReactNativeModal } from 'react-native';

import {
  Container,
  Content,
  Line,
  MaxWidthImage,
  Option,
  OptionsContainer,
  OptionText,
} from './styles';

interface MainModalProps {
  // Controla a visibilidade do modal.
  visible: boolean;
  // Conteúdo do modal.
  content?: string;
  image?: number;
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

const Modal: React.FC<MainModalProps> = ({
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
        {image && (
          <MaxWidthImage
            source={image}
            resizeMode="contain"
            width="100%"
            height={300}
          />
        )}
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
