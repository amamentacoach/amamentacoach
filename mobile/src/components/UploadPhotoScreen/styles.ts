import styled from 'styled-components/native';

import {
  ScrollView as SharedScrollView,
  OpenSansRegular,
} from 'lib/sharedStyles';

interface SelectedImageProps {
  width: number;
  isVisible?: boolean;
}

export const ScrollView = styled(SharedScrollView)`
  padding: 0 24px;
`;

export const Text = styled(OpenSansRegular)`
  color: ${props => props.theme.grey};
  text-align: center;
  margin: 25px 0;
`;

export const SelectedImage = styled.Image<SelectedImageProps>`
  flex: 1;
  width: ${({ width }) => width}px;
  display: ${({ isVisible = true }) => (isVisible ? 'flex' : 'none')};
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
