import styled from 'styled-components/native';

export const ContentContainer = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

export const ContentHeader = styled.Text`
  font-family: 'Manjari-Bold';
  font-size: 20px;
  margin-bottom: 12px;
`;

export const Option = styled.View`
  margin-bottom: 20px;
`;

export const ContentOptionButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const ContentImage = styled.Image`
  height: 70px;
  width: 70px;
`;

export const ContentTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 15px;
  margin-right: 10px;
`;

export const ContentTitle = styled.Text`
  color: #000000;
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  flex-wrap: wrap;
  margin-bottom: 3px;
`;

export const ContentSubtitle = styled.Text`
  color: #545454;
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  flex-wrap: wrap;
`;

export const ContentSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #979797;
  opacity: 0.25;
  margin-top: 20px;
`;

export const OpenIconImage = styled.Image`
  height: 15px;
  width: 20px;
`;
