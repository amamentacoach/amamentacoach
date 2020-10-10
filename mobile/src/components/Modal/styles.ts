import styled from 'styled-components/native';

export const Container = styled.View`
  margin: auto 50px;
  padding: 15px;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 3.6px;
`;

export const Message = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  text-align: center;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: #737373;
  opacity: 0.2;
`;

export const CloseButtonText = styled.Text`
  font-family: 'OpenSans-Bold';
  font-size: 16px;
  text-align: center;
  color: #7d5cd7;
`;
