import React from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import {
  AdultTermsOfService,
  MinorTermsOfService,
} from '../../../components/TermsOfService';
import { useAuth } from '../../../contexts/auth';

import ScrollView from './styles';

const AcceptTermsOfService: React.FC = () => {
  const { motherInfo } = useAuth();

  return (
    <ScrollView>
      {moment().diff(motherInfo.birthday, 'years') >= 18 ? (
        <AdultTermsOfService name={motherInfo.name} />
      ) : (
        <MinorTermsOfService name={motherInfo.name} />
      )}
    </ScrollView>
  );
};

export default AcceptTermsOfService;
