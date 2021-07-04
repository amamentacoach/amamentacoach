import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 24px;
`;

export const OptionButton = styled.TouchableOpacity`
  margin-bottom: 14px;
`;

export const OptionText = styled.Text`
  color: ${props => props.theme.grey};
  font-family: 'OpenSans-Regular';
  font-size: 18px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.grey};
  opacity: 0.25;
  margin-bottom: 14px;
`;
