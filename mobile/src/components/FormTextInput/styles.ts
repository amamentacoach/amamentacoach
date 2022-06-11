import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

import type { ColorValue } from 'react-native';

export const LabelText = styled(OpenSansRegular)`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const TextInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: '#acaab2' as ColorValue,
}))`
  font-family: 'OpenSans-Regular';
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.black};
  border-radius: 3.6px;
  border: 1px ${props => props.theme.brightGrey} solid;
  padding-left: 16px;
`;
