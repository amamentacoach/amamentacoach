import styled from 'styled-components/native';

import { OpenSansRegular } from 'lib/sharedStyles';

export const FormContainer = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

export const SubmitButtonContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  flex-direction: row;
  padding: 15px 0px;
`;

export const HeaderIconContainer = styled.View`
  margin-right: 10px;
`;

export const UserImage = styled.Image.attrs(() => ({
  resizeMode: 'cover',
}))`
  width: 200;
  height: 200;
  border-radius: 100px;
`;

export const UploadText = styled(OpenSansRegular)`
  font-size: 16px;
  color: #2ca3cf;
`;
