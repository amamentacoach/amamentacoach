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
    <ReactNativeModal animationType="fade" visible={visible} transparent>
      <Container>
        {content && <Content>{content}</Content>}
        {image && (
          <MaxWidthImage
            height={300}
            resizeMode="contain"
            source={image}
            width="100%"
          />
        )}
        {children}
        <Line />
        <OptionsContainer>
          {options.map(({ text, isBold, disabled, onPress }) => (
            <Option
              activeOpacity={0.7}
              disabled={disabled}
              key={text}
              onPress={onPress}>
              <OptionText color={color} disabled={disabled} isBold={isBold}>
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
