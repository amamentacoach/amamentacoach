import { differenceInYears } from 'date-fns';

import {
  AdultTermsOfService,
  MinorTermsOfService,
} from 'components/TermsOfService';
import { useAuth } from 'contexts/auth';
import { ScrollView } from 'lib/sharedStyles';

import { Container } from './styles';

const AcceptTermsOfService: React.FC = () => {
  const { userInfo } = useAuth();

  return (
    <ScrollView>
      <Container>
        {differenceInYears(new Date(), new Date(userInfo.birthday)) >= 18 ? (
          <AdultTermsOfService name={userInfo.name} />
        ) : (
          <MinorTermsOfService name={userInfo.name} />
        )}
      </Container>
    </ScrollView>
  );
};

export default AcceptTermsOfService;
