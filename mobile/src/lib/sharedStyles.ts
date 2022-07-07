import styled from 'styled-components/native';

import type { ScrollViewProps } from 'react-native';

interface SpacerProps {
  width: number;
}

interface TextProps {
  color?: string;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))<ScrollViewProps>`
  flex: 1;
`;

export const Flex = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  flex: 1;
  justify-content: flex-end;
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

export const OpenSansBold = styled.Text<TextProps>`
  color: ${({ theme, color }) => color ?? theme.primary};
  font-family: 'OpenSans-Bold';
  font-size: 16px;
`;

export const OpenSansRegular = styled.Text<TextProps>`
  color: ${({ theme, color }) => color ?? theme.black};
  font-family: 'OpenSans-Regular';
  font-size: 16px;
`;

export const ManjariBold = styled.Text<TextProps>`
  color: ${({ theme, color }) => color ?? theme.black};
  font-family: 'Manjari-Bold';
  font-size: 18px;
`;

export const ManjariRegular = styled.Text<TextProps>`
  color: ${({ theme, color }) => color ?? theme.black};
  font-family: 'Manjari-Regular';
  font-size: 18px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  margin-top: 5px;
`;

export const ErrorText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: ${({ theme }) => theme.error};
  font-size: 14px;
`;
