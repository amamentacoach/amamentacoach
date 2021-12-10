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

const StyledText = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const Author = styled(StyledText)`
  font-family: 'OpenSans-Bold';
  color: ${props => props.theme.primary};
`;

export const DateText = styled(StyledText)`
  font-family: 'OpenSans-Regular';
  color: ${props => props.theme.grey};
`;

export const Content = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  color: ${props => props.theme.grey};
`;

// TODO Replace with shared style.
export const Line = styled.View`
  background-color: ${props => props.theme.grey};
  height: 1px;
  margin: 20px 0;
  opacity: 0.2;
  width: 100%;
`;

export const LoadingIndicator = styled.ActivityIndicator`
  margin-bottom: 20px;
`;
