import { Action, AppScreen } from '@common/telemetria';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import SecondaryButton from 'components/SecondaryButton';
import { useAuth } from 'contexts/auth';
import { Flex } from 'lib/sharedStyles';
import leaveResearch from 'services/leaveResearch';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import {
  BoldMainText,
  Container,
  FirstSubOptionContainer,
  LeaveText,
  MainText,
  ScrollView,
  SubmitButtonContainer,
} from './styles';

interface Page {
  index: number;
  flatListRef: React.RefObject<FlatList<any>>;
}

interface FormValues {
  message: string;
}

const Confirm: React.FC<Page> = ({ index, flatListRef }) => {
  const navigation = useNavigation<RootStackProps>();

  function handleNextPage(currentPage: number): void {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: currentPage + 1,
    });
  }

  return (
    <>
      <BoldMainText>{i18n.t('LeaveResearchPage.Introduction')},</BoldMainText>
      <MainText>{i18n.t('LeaveResearchPage.Header')}</MainText>
      <MainText>{i18n.t('LeaveResearchPage.Content')}</MainText>
      <SubmitButtonContainer>
        <FirstSubOptionContainer>
          <SecondaryButton
            text={i18n.t('Cancel')}
            onPress={() => navigation.goBack()}
          />
        </FirstSubOptionContainer>
        <Flex>
          <MainButton
            text={i18n.t('Next')}
            onPress={() => handleNextPage(index)}
          />
        </Flex>
      </SubmitButtonContainer>
    </>
  );
};

const Leave: React.FC<Page> = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<RootStackProps>();

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [message, setMessage] = useState<string>('');

  const formInitialValues: FormValues = {
    message: '',
  };
  const newMessageSchema: Yup.SchemaOf<FormValues> = Yup.object({
    message: Yup.string().required(i18n.t('Yup.Required')),
  }).required();

  async function handleFormSubmit(): Promise<void> {
    setIsSendingForm(true);
    const success = await leaveResearch(message);
    setIsConfirmModalVisible(false);
    if (success) {
      await signOut();
    } else {
      setIsSendingForm(false);
      setIsErrorModalVisible(true);
    }
  }

  return (
    <>
      <Modal
        content={i18n.t('LeaveResearchPage.PopUp')}
        options={[
          {
            text: i18n.t('Cancel'),
            isBold: false,
            onPress: () => {
              setIsConfirmModalVisible(false);
              setIsSendingForm(false);
            },
          },
          {
            text: isSendingForm
              ? i18n.t('Status.Sending')
              : i18n.t('LeaveResearchPage.Confirm'),
            isBold: true,
            disabled: isSendingForm,
            onPress: () => handleFormSubmit(),
          },
        ]}
        visible={isConfirmModalVisible}
      />
      <Modal
        content={i18n.t('LeaveResearchPage.Error')}
        options={[
          {
            text: i18n.t('Close'),
            onPress: () => setIsErrorModalVisible(false),
          },
        ]}
        visible={isErrorModalVisible}
      />
      <LeaveText>{i18n.t('LeaveResearchPage.Reason')}</LeaveText>
      <Formik
        initialValues={formInitialValues}
        validateOnChange={false}
        validationSchema={newMessageSchema}
        onSubmit={() => setIsConfirmModalVisible(true)}>
        {({ setFieldValue, handleSubmit, dirty, errors }) => (
          <>
            <FormTextInput
              error={errors.message}
              numberOfLines={20}
              placeholder={i18n.t('Placeholder.Message')}
              textAlignVertical="top"
              value={message}
              multiline
              onChangeText={(text: string) => {
                setFieldValue('message', text);
                setMessage(text);
              }}
            />

            <SubmitButtonContainer>
              <FirstSubOptionContainer>
                <SecondaryButton
                  text={i18n.t('Cancel')}
                  onPress={() => navigation.goBack()}
                />
              </FirstSubOptionContainer>
              <Flex>
                <MainButton
                  disabled={!dirty}
                  text={i18n.t('LeaveResearchPage.Leave')}
                  onPress={handleSubmit}
                />
              </Flex>
            </SubmitButtonContainer>
          </>
        )}
      </Formik>
    </>
  );
};

const LeaveResearch: React.FC = () => {
  const { width } = Dimensions.get('window');
  const flatListRef = useRef<FlatList>(null);

  const pages = [
    {
      id: '0',
      Component: Confirm,
    },
    {
      id: '1',
      Component: Leave,
    },
  ];

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.LeaveResearch },
    });
  }, []);

  return (
    <FlatList
      data={pages}
      keyExtractor={item => item.id}
      keyboardShouldPersistTaps="handled"
      ref={flatListRef}
      renderItem={({ item, index }) => (
        <ScrollView width={width}>
          <Container>
            <item.Component flatListRef={flatListRef} index={index} />
          </Container>
        </ScrollView>
      )}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      horizontal
      pagingEnabled
    />
  );
};

export default LeaveResearch;
