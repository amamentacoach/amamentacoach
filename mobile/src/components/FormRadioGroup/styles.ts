import styled from 'styled-components/native';

interface RadioButtonProps {
  selected: boolean;
}

export const Container = styled.View`
  border-radius: 3.6px;
  margin-bottom: 15px;
`;

export const LabelText = styled.Text`
  height: 20px;
  color: #161026;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const OptionsContainer = styled.View`
  margin-bottom: 5px;
`;

export const Option = styled.TouchableOpacity<RadioButtonProps>`
  border: 1.4px solid ${(props) => (props.selected ? '#7D5CD7' : '#C4C4C4')};
  flex-direction: row;
  padding: 13px;
  border-radius: 3.6px;
  margin-bottom: 5px;
  align-items: center;
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
  margin-left: 15px;
  font-size: 16px;
`;
