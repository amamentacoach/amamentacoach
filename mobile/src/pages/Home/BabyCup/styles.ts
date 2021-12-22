import styled from 'styled-components/native';

import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

interface VideoContainerProps {
  display: boolean;
}

export const VideoLink = styled(OpenSansBold)`
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

export const Step = styled(OpenSansBold)`
  font-size: 18px;
  margin-right: 5px;
`;

export const Instruction = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  text-align: justify;
  flex-shrink: 1;
`;
