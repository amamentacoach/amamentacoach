import styled from 'styled-components/native';

import { ManjariBold, OpenSansRegular } from 'lib/sharedStyles';

interface InnerBorderProps {
  correctAnswer: boolean;
}

export const HeaderTitle = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  text-align: center;
  margin-bottom: 20px;
`;

export const Card = styled.View`
  flex: 1;
  background-color: ${props => props.theme.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const InnerBorder = styled.View<InnerBorderProps>`
  flex: 1;
  border: 4px solid
    ${({ theme, correctAnswer }) =>
      correctAnswer ? theme.success : theme.error};
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 20px;
`;

export const CardText = styled(ManjariBold)`
  font-size: 24px;
  text-align: center;
`;

export const Footer = styled.View`
  justify-content: flex-end;
  margin-top: 20px;
`;

export const FirstButtonContainer = styled.View`
  margin-bottom: 10px;
`;
