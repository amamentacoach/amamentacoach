import { differenceInYears } from 'date-fns';

import PaddedScrollView from 'components/PaddedScrollView';
import {
  AdultTermsOfService,
  MinorTermsOfService,
} from 'components/TermsOfService';
import { useAuth } from 'contexts/auth';

const AcceptTermsOfService: React.FC = () => {
  const { userInfo } = useAuth();

  return (
    <PaddedScrollView>
      {differenceInYears(new Date(), userInfo.birthday) >= 18 ? (
        <AdultTermsOfService />
      ) : (
        <MinorTermsOfService />
      )}
    </PaddedScrollView>
  );
};

export default AcceptTermsOfService;
