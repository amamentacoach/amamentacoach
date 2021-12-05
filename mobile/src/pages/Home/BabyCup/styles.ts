import styled from 'styled-components/native';

interface VideoContainerProps {
  display: boolean;
}

export const VideoLink = styled.Text`
  color: ${props => props.theme.primary};
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  align-self: center;
`;

export const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 60px 0;
`;

export const VideoContainer = styled.View<VideoContainerProps>`
  justify-content: center;
  display: ${({ display }) => (display ? 'flex' : 'none')};
  margin: 30px 0;
`;

export const InstructionContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-bottom: 24px;
`;

export const Step = styled.Text`
  color: ${props => props.theme.primary};
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  margin-right: 5px;
`;

export const Instruction = styled.Text`
  color: ${props => props.theme.grey};
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  text-align: justify;
  flex-shrink: 1;
`;
