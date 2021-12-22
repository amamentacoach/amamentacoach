import styled from 'styled-components/native';

import ImageWrapper from 'components/ImageWrapper';
import { OpenSansBold, OpenSansRegular } from 'lib/sharedStyles';

interface CurrentPageContainerProps {
  color: string;
}

export const CurrentPageContainer = styled.View<CurrentPageContainerProps>`
  background-color: ${({ color }) => color};
  border-radius: 3.6px;
  padding: 10px;
  margin-top: 6px;
  align-self: center;
`;

export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 15px 0 0 0;
`;

export const FullWidthImage = styled(ImageWrapper)`
  max-height: 180px;
`;

export const CurrentPageText = styled(OpenSansBold)`
  text-align: center;
  color: ${props => props.theme.black};
`;

export const QuestionText = styled(OpenSansRegular)`
  text-align: center;
  margin: 15px 0;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 20px;
`;
