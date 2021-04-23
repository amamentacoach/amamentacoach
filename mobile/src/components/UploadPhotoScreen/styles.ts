import styled from 'styled-components/native';

interface ISelectedImageProps {
  width: number;
}

export const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
  padding: 0 24px;
`;

export const Text = styled.Text`
  font-family: 'OpenSans-Regular';
  font-size: 16px;
  color: ${props => props.theme.grey};
  text-align: center;
  margin: 25px 0;
`;

export const SelectedImage = styled.Image<ISelectedImageProps>`
  width: ${({ width }) => width}px;
  flex: 1;
`;

export const FormContainer = styled.View`
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
