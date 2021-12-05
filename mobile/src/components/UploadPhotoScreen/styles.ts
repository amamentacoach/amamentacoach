import styled from 'styled-components/native';

import { ScrollView as SharedScrollView } from 'lib/SharedStyles';

interface SelectedImageProps {
  width: number;
  isVisible?: boolean;
}

export const ScrollView = styled(SharedScrollView)`
  padding: 0 24px;
`;

export const Text = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  color: ${props => props.theme.grey};
  text-align: center;
  margin: 25px 0;
`;

export const SelectedImage = styled.Image<SelectedImageProps>`
  flex: 1;
  width: ${({ width }) => width}px;
  display: ${({ isVisible = true }) => (isVisible ? 'flex' : 'none')};
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonContainer = styled.View`
  margin-bottom: 15px;
  justify-content: flex-end;
  flex-direction: row;
`;

export const SelectButtonContainer = styled.View`
  margin-right: 5px;
  flex: 1;
`;

export const SendButtonContainer = styled.View`
  flex: 1;
`;
