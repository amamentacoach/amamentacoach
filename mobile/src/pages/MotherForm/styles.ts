import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))``;

export const Header = styled.View`
  padding: 20px;
`;

export const HeaderText = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 18px;
  color: #7d5cd7;
  text-align: center;
`;

export const HeaderSubText = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 14px;
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;
`;

export const FormContainer = styled.View`
  flex: 1;
  margin: 0 24px;
`;

export const MarriedSubOptionsContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const MarriedTimeContainer = styled.View`
  flex: 2;
  margin-right: 4px;
`;

export const MarriedMetricContainer = styled.View`
  flex: 1;
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
  padding: 15px 0px;
`;