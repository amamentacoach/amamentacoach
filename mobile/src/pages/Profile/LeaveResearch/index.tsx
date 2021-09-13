import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import i18n from 'i18n-js';
import { useRef, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import * as Yup from 'yup';

import FormTextInput from 'components/FormTextInput';
import MainButton from 'components/MainButton';
import Modal from 'components/Modal';
import SecondaryButton from 'components/SecondaryButton';
import { useAuth } from 'contexts/auth';
import leaveResearch from 'services/leaveResearch';

import type { RootStackProps } from 'routes/app';

import {
  BoldMainText,
  Container,
  FirstSubOptionContainer,
  LeaveText,
  MainText,
  ScrollView,
  SecondSubOptionContainer,
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

  function handleNextPage(currentPage: number) {
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
        <SecondSubOptionContainer>
          <MainButton
            text={i18n.t('Next')}
            onPress={() => handleNextPage(index)}
          />
        </SecondSubOptionContainer>
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

  async function handleFormSubmit() {
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
        validationSchema={newMessageSchema}
        validateOnChange={false}
        onSubmit={() => setIsConfirmModalVisible(true)}>
        {({ setFieldValue, handleSubmit, dirty, errors }) => (
          <>
            <FormTextInput
              onChangeText={(text: string) => {
                setFieldValue('message', text);
                setMessage(text);
              }}
              value={message}
              placeholder={i18n.t('Placeholder.Message')}
              error={errors.message}
              multiline
              numberOfLines={20}
              textAlignVertical="top"
            />

            <SubmitButtonContainer>
              <FirstSubOptionContainer>
                <SecondaryButton
                  text={i18n.t('Cancel')}
                  onPress={() => navigation.goBack()}
                />
              </FirstSubOptionContainer>
              <SecondSubOptionContainer>
                <MainButton
                  text={i18n.t('LeaveResearchPage.Leave')}
                  onPress={handleSubmit}
                  disabled={!dirty}
                />
              </SecondSubOptionContainer>
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

  return (
    <FlatList
      ref={flatListRef}
      data={pages}
      renderItem={({ item, index }) => (
        <ScrollView width={width}>
          <Container>
            <item.Component index={index} flatListRef={flatListRef} />
          </Container>
        </ScrollView>
      )}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default LeaveResearch;
