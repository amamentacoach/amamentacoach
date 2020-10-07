import styled from 'styled-components/native';

interface CircleShapeProps {
  selected: boolean;
}

export const Container = styled.View`
  height: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CircleShape = styled.TouchableOpacity<CircleShapeProps>`
  background-color: ${(props) => (props.selected ? '#7D5CD7' : '#C4C4C4')};
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  margin: 0 12px;
`;
