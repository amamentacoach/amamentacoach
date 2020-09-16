import styled from 'styled-components/native';

interface ContainerProps {
  width: number;
  height: number;
}

export const Container = styled.View<ContainerProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const Header = styled.View`
  flex-direction: row;
  min-height: 100px;
`;

export const SkipButton = styled.TouchableOpacity`
  margin-left: auto;
  margin-top: 30px;
  margin-right: 30px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
`;

export const ContentWrapper = styled.View`
  margin-top: 30px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ContentParagraph = styled.Text`
  font-size: 16px;
  margin: 0 24px;
  text-align: center;
`;

export const Footer = styled.View`
  flex-direction: row;
  height: 50px;
  flex: 1;
`;
