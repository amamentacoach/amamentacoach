import { ScrollView } from 'lib/sharedStyles';

import { Container } from './styles';

const PaddedScrollView: React.FC = ({ children }) => {
  return (
    <ScrollView>
      <Container>{children}</Container>
    </ScrollView>
  );
};

export default PaddedScrollView;
