import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 24px;
`;

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const OptionButton = styled.TouchableOpacity`
  margin-bottom: 14px;
`;

export const OptionText = styled.Text`
  color: #545454;
  font-family: 'OpenSans-Regular';
  font-size: 18px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: #979797;
  opacity: 0.25;
  margin-bottom: 14px;
`;
