import styled from 'styled-components/native';

interface SpacerProps {
  width: number;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const PaddedScrollView = styled(ScrollView)`
  padding: 24px;
`;

export const Flex = styled.View`
  flex: 1;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Spacer = styled.View<SpacerProps>`
  width: ${({ width }) => width}px;
`;

export const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Line = styled.View`
  background-color: ${props => props.theme.grey};
  height: 1px;
  margin: 20px 0;
  opacity: 0.25;
  width: 100%;
`;

export const OpenSansBold = styled.Text`
  color: ${({ theme }) => theme.primary};
  font-family: 'OpenSans-Bold';
  font-size: 16px;
`;

export const OpenSansRegular = styled.Text`
  color: ${({ theme }) => theme.black};
  font-family: 'OpenSans-Regular';
  font-size: 16px;
`;

export const ManjariBold = styled.Text`
  color: ${({ theme }) => theme.black};
  font-family: 'Manjari-Bold';
  font-size: 18px;
`;

export const ManjariRegular = styled.Text`
  color: ${({ theme }) => theme.black};
  font-family: 'Manjari-Regular';
  font-size: 18px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  min-height: 20px;
  margin-top: 5px;
`;

export const ErrorText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: ${({ theme }) => theme.error};
  font-size: 14px;
`;
