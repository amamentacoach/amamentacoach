import React from 'react';

import {
  AdultTermsOfService,
  MinorTermsOfService,
} from '../../../components/TermsOfService';
import { useAuth } from '../../../contexts/auth';
import { differenceInYears } from '../../../lib/date-fns';

import ScrollView from './styles';

const AcceptTermsOfService: React.FC = () => {
  const { motherInfo } = useAuth();

  return (
    <ScrollView>
      {differenceInYears(new Date(), new Date(motherInfo.birthday)) >= 18 ? (
        <AdultTermsOfService name={motherInfo.name} />
      ) : (
        <MinorTermsOfService name={motherInfo.name} />
      )}
    </ScrollView>
  );
};

export default AcceptTermsOfService;
