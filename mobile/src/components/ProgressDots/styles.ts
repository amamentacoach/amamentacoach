import styled from 'styled-components/native';

interface CircleShapeProps {
  selected: boolean;
}

export const Container = styled.View`
  height: 50px;
  flex-direction: row;
  margin: auto;
`;

export const CircleShape = styled.TouchableOpacity<CircleShapeProps>`
  background-color: ${(props) => (props.selected ? '#979797' : '#C4C4C4')};
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  margin: 12px;
`;
