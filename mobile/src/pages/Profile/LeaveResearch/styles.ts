import styled from 'styled-components/native';

interface ContainerProps {
  width: number;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))<ContainerProps>`
  flex: 1;
  padding: 24px;
  width: ${({ width }) => width}px;
`;

export const LeaveText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  color: ${props => props.theme.grey};
  text-align: center;
  margin: 25px 24px;
`;

export const MainText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
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

export const SecondSubOptionContainer = styled.View`
  flex: 1;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;
