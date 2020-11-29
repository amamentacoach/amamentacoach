import styled from 'styled-components/native';

export const AddMessageButton = styled.TouchableOpacity`
  margin-right: 18px;
`;

export const FlatlistContainer = styled.View`
  flex: 1;
  margin: 24px 24px 0px 24px;
`;

export const MessageContainer = styled.View`
  flex: 1;
`;

export const Author = styled.Text`
  font-family: 'Open-Sans-Bold';
  font-size: 14px;
  color: #7d5cd7;
  margin-bottom: 5px;
`;

export const Content = styled.Text`
  font-family: 'Open-Sans-Regular';
  font-size: 16px;
  color: #545454;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  margin: 20px 0;
  background-color: #737373;
  opacity: 0.2;
`;

export const LoadingIndicator = styled.ActivityIndicator`
  margin-bottom: 20px;
`;
