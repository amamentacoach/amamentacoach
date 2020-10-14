import styled from 'styled-components/native';

interface RadioButtonProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const LabelText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: #161026;
  font-size: 14px;
`;

export const OptionsContainer = styled.View`
  flex: 1;
`;

export const OptionButton = styled.TouchableOpacity<RadioButtonProps>`
  border: 1.4px solid ${(props) => (props.selected ? '#7D5CD7' : '#C4C4C4')};
  flex-direction: row;
  padding: 13px;
  border-radius: 3.6px;
  align-items: center;
  margin-top: 5px;
`;

export const OuterCircle = styled.View<RadioButtonProps>`
  border: 1.4px solid ${(props) => (props.selected ? '#7D5CD7' : '#C4C4C4')};
  background-color: transparent;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  align-items: center;
  justify-content: center;
`;

export const InnerCircle = styled.View<RadioButtonProps>`
  background-color: ${(props) => (props.selected ? '#7D5CD7' : 'transparent')};
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

export const TextOption = styled.Text`
  font-family: 'OpenSans-Regular';
  margin-left: 15px;
  font-size: 16px;
`;

export const ErrorContainer = styled.View`
  flex: 1;
  min-height: 20px;
`;

export const ErrorText = styled.Text`
  font-family: 'OpenSans-Regular';
  color: #ea3c3c;
  font-size: 14px;
`;
