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
  // Conteúdo do modal.
  content?: string | undefined;
  // Imagem a ser exibida dentro do modal. A imagem precisa ter sido carregar utilizando require().
  image?: any | undefined;
  // Controla a visibilidade do modal.
  visible: boolean;
  // Botões exibidos na parte de baixo do modal.
  options: {
    // Texto da opção.
    text: string;
    // Controla se a opção deve ser escrita em negrito.
    isBold?: boolean | undefined;
    // Função executado ao pressionar o botão.
    onPress: () => void;
  }[];
}

const Modal: React.FC<IMainModalProps> = ({
  content,
  image,
  visible,
  options,
}) => {
  return (
    <ReactNativeModal animationType="fade" transparent visible={visible}>
      <Container>
        {content && <Content>{content}</Content>}
        {image && <Image source={image} resizeMode="contain" />}
        <Line />
        <OptionsContainer>
          {options.map(({ text, isBold = false, onPress }) => (
            <Option key={text} onPress={onPress} activeOpacity={0.7}>
              <OptionText isBold={isBold}>{text}</OptionText>
            </Option>
          ))}
        </OptionsContainer>
      </Container>
    </ReactNativeModal>
  );
};

export default Modal;
