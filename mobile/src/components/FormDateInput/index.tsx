import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Container,
  LabelText,
  TextInput,
  ErrorContainer,
  ErrorText,
} from './styles';

interface FormDateProps {
  fieldName: string;
  label: string;
  error?: string | undefined;
  placeholder: string;
  maxDate?: Date | undefined;
  onChange: (fieldName: string, fieldValue: string) => void;
}

const FormDateInput: React.FC<FormDateProps> = ({
  fieldName,
  label,
  error,
  placeholder,
  maxDate = new Date(),
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState('');

  function showDatePicker() {
    setShow(true);
  }

  function handleDateSelected(selectedDate?: Date | undefined) {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(
        `${selectedDate.getDate()}/${
          selectedDate.getMonth() + 1
        }/${selectedDate.getFullYear()}`,
      );
      onChange(fieldName, selectedDate.toISOString().split('T')[0]);
    }
  }

  return (
    <Container>
      <LabelText>{label}</LabelText>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          value={date}
          placeholder={placeholder}
          placeholderTextColor="#acaab2"
          editable={false}
        />
      </TouchableOpacity>
      <ErrorContainer>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </ErrorContainer>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={maxDate}
          mode="date"
          display="calendar"
          maximumDate={maxDate}
          onChange={(_: Event, selectedDate?: Date | undefined) =>
            handleDateSelected(selectedDate)
          }
        />
      )}
    </Container>
  );
};

export default FormDateInput;
