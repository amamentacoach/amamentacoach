import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

interface ContainerProps {
  width: number;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))<ContainerProps>`
  flex: 1;
  width: ${({ width }) => width}px;
`;

export const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

export const LeaveText = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  text-align: center;
`;

export const MainText = styled(OpenSansRegular)`
  text-align: center;
  line-height: 22px;
  margin-top: 8px;
`;

export const BoldMainText = styled(MainText)`
  font-family: 'OpenSans-Bold';
`;

export const FirstSubOptionContainer = styled.View`
  flex: 1;
  margin-right: 4px;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;
