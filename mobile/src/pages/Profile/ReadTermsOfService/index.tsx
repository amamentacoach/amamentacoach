import { differenceInYears } from 'date-fns';

import {
  AdultTermsOfService,
  MinorTermsOfService,
} from 'components/TermsOfService';
import { useAuth } from 'contexts/auth';
import { ScrollView } from 'lib/SharedStyles';

import { Container } from './styles';

const AcceptTermsOfService: React.FC = () => {
  const { motherInfo } = useAuth();

  return (
    <ScrollView>
      <Container>
        {differenceInYears(new Date(), new Date(motherInfo.birthday)) >= 18 ? (
          <AdultTermsOfService name={motherInfo.name} />
        ) : (
          <MinorTermsOfService name={motherInfo.name} />
        )}
      </Container>
    </ScrollView>
  );
};

export default AcceptTermsOfService;
